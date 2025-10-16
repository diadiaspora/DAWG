const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { S3_REGION, S3_BUCKET, S3_BASE_URL } = process.env;
const Profile = require("../models/profile");

async function uploadFileToS3(file, folderName) {
  const s3Client = new S3Client({ region: S3_REGION });

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: `${folderName}/${Date.now()}-${file.originalname}`, // Use folderName for organization
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3Client.send(new PutObjectCommand(s3Params));
    return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${s3Params.Key}`;
  } catch (uploadErr) {
    console.error(
      `Error uploading file to S3 in folder ${folderName}:`,
      uploadErr
    );
    // Rethrow a more specific error to be caught by the calling function
    throw new Error(
      `S3 Upload Failed for ${file.originalname}: ${uploadErr.message}`
    );
  }
}




module.exports = {
  index,
  create,
  show,
  update,
  deleteProfile,
};

async function index(req, res) {
  try {
    const profiles = await Profile.find({});
 
    res.json(profiles);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

async function create(req, res) {

    try {
      
      req.body.author = req.user._id;
  
      // Handle file uploads if they exist in req.files
      if (req.files) {
        if (req.files.avatar && req.files.avatar.length > 0) {
          req.body.avatar = await uploadFileToS3(
            req.files.avatar[0],
            "avatar" // Folder for pet photos
          );
        }
        if (req.files.importantDocs && req.files.importantDocs.length > 0) {
          req.body.importantDocs = await uploadFileToS3(
            req.files.importantDocs[0],
            "importantDocs" 
          );
        }
        if (req.files.passport && req.files.passport.length > 0) {
          req.body.passport = await uploadFileToS3(
            req.files.passport[0],
            "passport" // Folder for microchip info
          );
        }
      }

    const profile = await Profile.create(req.body);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create post" });
  }

}

async function show(req, res) {
  try {
    const profile = await Profile.findOne({ author: req.user._id }).populate(
      "pets"
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to show profile" });
  }
}

async function update(req, res) {

  const profileId = req.params.id; // Get the profile ID from the URL params
  const updateData = { ...req.body };

  if (req.files) {
    if (req.files.avatar && req.files.avatar.length > 0) {
      req.body.avatar = await uploadFileToS3(
        req.files.avatar[0],
        "avatar"
      );
    }
    if (req.files.passport && req.files.passport.length > 0) {
      req.body.passport = await uploadFileToS3(
        req.files.passport[0],
        "passport"
      );
    }

    if (req.files.importantDocs && req.files.importantDocs.length > 0) {
      req.body.importantDocs = await uploadFileToS3(
        req.files.importantDocs[0],
        "importantDocs"
      );
    }


  }

  console.log('this is req.body', req.body);
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {new:true});

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update profile" });
  }
}

async function deleteProfile(req, res) {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete profile" });
  }
}
