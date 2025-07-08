const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { S3_REGION, S3_BUCKET, S3_BASE_URL } = process.env; // Ensure these are in your .env
const Blog = require("../models/blog"); // Path to your blog model


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
  deleteBlog,
  getUserBlogs,
};

async function index(req, res) {
  try {

    const Profile = require("../models/profile");
    const blogs = await Blog.find({}).populate('author')
.sort({ createdAt: -1 });
        
    console.log(blogs);
    // const blogs = await Blog.find({}).populate("author", "name");
     res.json(blogs);


  } catch (err) {
    console.error("Error in blog index:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch blogs", error: err.message });
  }
}

async function create(req, res) {
  
  try {
    const Profile = require("../models/profile");
    const profile = await Profile.findOne({ author: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    req.body.author = profile._id; 

    console.log("REQ.USER IN BLOG CREATE:", req.user);
    // Process image uploads
    if (req.files) {
      if (req.files.contentOneImage && req.files.contentOneImage.length > 0) {
        req.body.contentOneImage = await uploadFileToS3(
          req.files.contentOneImage[0],
          "blog-images"
        );
      }
      // These images are now optional, so the `if` check for `length > 0` is crucial
      if (req.files.contentTwoImage && req.files.contentTwoImage.length > 0) {
        req.body.contentTwoImage = await uploadFileToS3(
          req.files.contentTwoImage[0],
          "blog-images"
        );
      } else {
        // If an optional file input is present but no new file is uploaded,
        // delete the field from req.body to allow Mongoose default.
        delete req.body.contentTwoImage;
      }
      if (
        req.files.contentThreeImage &&
        req.files.contentThreeImage.length > 0
      ) {
        req.body.contentThreeImage = await uploadFileToS3(
          req.files.contentThreeImage[0],
          "blog-images"
        );
      } else {
        delete req.body.contentThreeImage;
      }
      if (req.files.contentFourImage && req.files.contentFourImage.length > 0) {
        req.body.contentFourImage = await uploadFileToS3(
          req.files.contentFourImage[0],
          "blog-images"
        );
      } else {
        delete req.body.contentFourImage;
      }
    }

    const blog = await Blog.create(req.body);
    res.status(201).json(blog); // 201 Created status
  } catch (err) {
    console.error("Error creating blog:", err);
    // Ensure a JSON response is always sent, even on error
    if (err.name === "ValidationError") {
      res
        .status(400)
        .json({
          message: "Validation Error",
          error: err.message,
          details: err.errors,
        });
    } else if (err.message.startsWith("S3 Upload Failed")) {
      res
        .status(500)
        .json({ message: "Image Upload Failed", error: err.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to create blog", error: err.message });
    }
  }
}

async function show(req, res) {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username avatar"
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    
    console.log(blog);
    res.json(blog);
  } catch (err) {
    console.error("Error in blog show:", err);
    res
      .status(500)
      .json({ message: "Failed to show blog", error: err.message });
  }
}

async function update(req, res) {
  try {
    // Process image uploads
    if (req.files) {
      if (req.files.contentOneImage && req.files.contentOneImage.length > 0) {
        req.body.contentOneImage = await uploadFileToS3(
          req.files.contentOneImage[0],
          "blog-images"
        );
      }
      // These images are now optional
      if (req.files.contentTwoImage && req.files.contentTwoImage.length > 0) {
        req.body.contentTwoImage = await uploadFileToS3(
          req.files.contentTwoImage[0],
          "blog-images"
        );
      }
      if (
        req.files.contentThreeImage &&
        req.files.contentThreeImage.length > 0
      ) {
        req.body.contentThreeImage = await uploadFileToS3(
          req.files.contentThreeImage[0],
          "blog-images"
        );
      }
      if (req.files.contentFourImage && req.files.contentFourImage.length > 0) {
        req.body.contentFourImage = await uploadFileToS3(
          req.files.contentFourImage[0],
          "blog-images"
        );
      }
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the modified document
      runValidators: true, // Run Mongoose validators
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found for update" });
    }

    res.json(blog);
   } catch (err) {
    console.error("Error updating blog:", err);
    if (err.name === "ValidationError") {
      res
        .status(400)
        .json({
          message: "Validation Error",
          error: err.message,
          details: err.errors,
        });
    } else if (err.message.startsWith("S3 Upload Failed")) {
      res
        .status(500)
        .json({ message: "Image Upload Failed", error: err.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to update blog", error: err.message });
    }
  }
}

async function deleteBlog(req, res) {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found for deletion" });
    }
    res.json(blog);
  } catch (err) {
    console.error("Error in blog delete:", err);
    res
      .status(500)
      .json({ message: "Failed to delete blog", error: err.message });
  }
}

async function getUserBlogs(req, res) {
  try {
    const Profile = require("../models/profile");

    // Get the user's profile
    const profile = await Profile.findOne({ author: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Get blogs that belong to this profile
    const blogs = await Blog.find({ author: profile._id }).populate("author");
    res.json(blogs);
  } catch (err) {
    console.error("Error in getUserBlogs:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch user blogs", error: err.message });
  }
}