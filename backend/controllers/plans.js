const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// Ensure that the .env contains the following keys
const { S3_REGION, S3_BUCKET, S3_BASE_URL } = process.env;

const Plan = require("../models/plan");

module.exports = {
  index,
  create,
  show,
  update,
  deletePlan,
  uploadFile
};

async function index(req, res) {
  try {
    const plans = await Plan.find({});
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(plans);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to index plan" });
  }
}

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const plan = await Plan.create(req.body);
    await plan.save();
    res.json(plan);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create plan" });
  }
}

async function show(req, res) {
  try {
    const plan = await Plan.findById(req.params.id);
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(plan);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to show plan" });
  }
}

async function update(req, res) {
  try {
    if (req.file) {
      req.body.receipt = await uploadFile(req.file);
    }
    console.log(req.body);
    console.log(req.file);
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(plan);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update" });
  }
}

async function deletePlan(req, res) {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    res.json(plan);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete" });
  }
}

async function uploadFile(file) {
  // Create an instance of the S3 client
  const s3Client = new S3Client({ region: S3_REGION });
  // s3's PutObjectCommand will expect an object with the following properties
  const s3Params = {
    Bucket: S3_BUCKET,
    // Create a unique filename to use as the S3 Key
    Key: `${Date.now()}-${file.originalname}`,
    // The uploaded file's binary content is held in the buffer property
    Body: file.buffer,
  };
  // Send the file to s3
  await s3Client.send(new PutObjectCommand(s3Params));
  // Return the endpoint to download the file
  return `${S3_BASE_URL}${S3_BUCKET}/${s3Params.Key}`;
}