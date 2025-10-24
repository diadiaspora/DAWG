const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { S3_REGION, S3_BUCKET, S3_BASE_URL } = process.env;
const Plan = require("../models/plan");

module.exports = {
  index,
  create,
  show,
  update,
  deletePlan,
  uploadFileToS3,
};

async function index(req, res) {
  try {
    const userId = req.user._id;
    const plans = await Plan.find({ author: userId });
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
    res.json(plan);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to show plan" });
  }
}

async function update(req, res) {
  try {
    if (req.files) {
      if (req.files.receipt && req.files.receipt.length > 0) {
        req.body.receipt = await uploadFileToS3(
          req.files.receipt[0],
          "receipts"
        );
      }
      if (req.files.ticket && req.files.ticket.length > 0) {
        req.body.ticket = await uploadFileToS3(req.files.ticket[0], "tickets");
      }
    }

    console.log("Request Body before update:", req.body);
    console.log("Request Files before update:", req.files);

    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found for update" });
    }

    res.json(plan);
  } catch (err) {
    console.error("Failed to update plan:", err);
    res.status(500).json({ message: "Failed to update plan." });
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

async function uploadFileToS3(file, folderName) {
  const s3Client = new S3Client({ region: S3_REGION });

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
    console.error(
      `Error uploading file to S3 in folder ${folderName}:`,
      uploadErr
    );
    throw new Error(`Failed to upload file to S3 in folder ${folderName}.`);
  }
}
