const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const Gallery = require("../models/gallery");
const Profile = require("../models/profile");

const { S3_REGION, S3_BUCKET } = process.env;

const s3Client = new S3Client({ region: S3_REGION });

module.exports = {
  uploadGalleryImage,
  deleteGalleryImage,
  getGalleryByProfile,
  getAllGalleryImages,
};

// 📤 Upload a new image to gallery (limit 100)
async function uploadGalleryImage(req, res) {
  try {
    const profileId = req.params.profileId;
    const profile = await Profile.findById(profileId).populate("gallery");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    // Create new gallery if none exists
    let gallery = profile.gallery;
    if (!gallery) {
      gallery = await Gallery.create({ profile: profile._id });
      profile.gallery = gallery._id;
      await profile.save();
    }

    // Check image count
    if (gallery.photoGallery.length >= 100) {
      return res
        .status(400)
        .json({ message: "Gallery photo limit reached (100)." });
    }

    // Check file
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Upload to S3
    const imageUrl = await uploadFileToS3(req.file, "user-gallery");

    // Add image to gallery
    gallery.photoGallery.push(imageUrl);
    await gallery.save();

    res.status(201).json({ message: "Image added to gallery.", gallery });
  } catch (err) {
    console.error("Failed to upload gallery image:", err);
    res
      .status(500)
      .json({ message: "Failed to upload gallery image.", error: err.message });
  }
}

// 🗑️ Delete image by index or URL
async function deleteGalleryImage(req, res) {
  try {
    const { profileId } = req.params;
    const { imageUrl } = req.body;

    const profile = await Profile.findById(profileId).populate("gallery");
    if (!profile || !profile.gallery) {
      return res.status(404).json({ message: "Gallery not found." });
    }

    const gallery = profile.gallery;
    const index = gallery.photoGallery.indexOf(imageUrl);
    if (index === -1) {
      return res.status(404).json({ message: "Image not found in gallery." });
    }

    gallery.photoGallery.splice(index, 1);
    await gallery.save();

    res.json({ message: "Image removed from gallery.", gallery });
  } catch (err) {
    console.error("Failed to delete gallery image:", err);
    res
      .status(500)
      .json({ message: "Failed to delete image.", error: err.message });
  }
}

// 📂 Get gallery by profile ID
async function getGalleryByProfile(req, res) {
  try {
    const profile = await Profile.findById(req.params.profileId).populate(
      "gallery"
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    // If profile has no gallery, create an empty one
    if (!profile.gallery) {
      const gallery = await Gallery.create({
        profile: profile._id,
        photoGallery: [],
      });
      profile.gallery = gallery._id;
      await profile.save();
      return res.json(gallery); // return the new gallery
    }

    res.json(profile.gallery);
  } catch (err) {
    console.error("Failed to fetch gallery:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch gallery.", error: err.message });
  }
}

async function getAllGalleryImages(req, res) {
  try {
    // Populate profile and profile.pets fields
    const galleries = await Gallery.find({}).populate({
      path: "profile",
      select: "avatar username pets",
      populate: {
        path: "pets",
        select: "petName",
      },
    });
   

    // Map each gallery's photoGallery images along with profile info and pet names
    const allImages = [];

    galleries.forEach((gallery) => {
      const profile = gallery.profile;
      if (!profile) return;

      console.log({ profile });
      // Get first petName if exists (or empty string)
      const petName =
        profile.pets && profile.pets.length > 0 ? profile.pets[0].petName : "";
      
        // console.log({ galleriesProfile: galleries.profile });
      // Push all photos with user info
      gallery.photoGallery.forEach((imageUrl) => {
        allImages.push({
          imageUrl,
          avatarUrl: profile.avatar,
          username: profile.username,
          petName,
        });
      });
    });

    res.json({ images: allImages });
  } catch (err) {
    console.error("Error fetching all gallery images:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}


// 📤 Reusable S3 uploader
async function uploadFileToS3(file, folderName) {
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: `${folderName}/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3Client.send(new PutObjectCommand(s3Params));
    return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${s3Params.Key}`;
  } catch (uploadErr) {
    console.error(`Error uploading to S3 in folder ${folderName}:`, uploadErr);
    throw new Error(`Failed to upload file to S3 in folder ${folderName}.`);
  }
}
