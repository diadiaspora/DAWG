
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const { S3_REGION, S3_BUCKET, S3_BASE_URL } = process.env;

const Pet = require("../models/pet");
const Profile = require("../models/profile");

module.exports = {
  index,
  create,
  show,
  update,
  deletePet,
  uploadFileToS3,
};

async function index(req, res) {
  try {
    const userId = req.user._id;
    const pets = await Pet.find({ petOwner: userId });
   
    res.json(pets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to index pet" });
  }
}

async function create(req, res) {
  try {

    req.body.petOwner = req.user._id;

  
    if (req.files) {
      if (req.files.petPhoto && req.files.petPhoto.length > 0) {
        req.body.petPhoto = await uploadFileToS3(
          req.files.petPhoto[0],
          "pet-photos" // Folder for pet photos
        );
      }
      if (req.files.vaccine && req.files.vaccine.length > 0) {
        req.body.vaccine = await uploadFileToS3(
          req.files.vaccine[0],
          "vaccine-records" // Folder for vaccine records
        );
      }
      if (req.files.microchip && req.files.microchip.length > 0) {
        req.body.microchip = await uploadFileToS3(
          req.files.microchip[0],
          "microchip-info" // Folder for microchip info
        );
      }
      if (
        req.files.healthCertificate &&
        req.files.healthCertificate.length > 0
      ) {
        req.body.healthCertificate = await uploadFileToS3(
          req.files.healthCertificate[0],
          "health-certificates" // Folder for health certificates
        );
      }
    }

    const pet = await Pet.create(req.body);

    const profile = await Profile.findOne({ author: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    profile.pets.push(pet._id);
    await profile.save();
    
    res.status(201).json(pet); // Respond with 201 Created and the new pet
  } catch (err) {
    console.error("Failed to create pet:", err);
    res
      .status(400)
      .json({ message: "Failed to create pet.", error: err.message });
  }
}

async function show(req, res) {
  try {
    const pet = await Pet.findById(req.params.id);
   
    res.json(pet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to show pet" });
  }
}


async function update(req, res) {
  try {
    // Handle file uploads if they exist in req.files
    if (req.files) {
      if (req.files.petPhoto && req.files.petPhoto.length > 0) {
        req.body.petPhoto = await uploadFileToS3(
          req.files.petPhoto[0],
          "pet-photos"
        );
      }
      if (req.files.vaccine && req.files.vaccine.length > 0) {
        req.body.vaccine = await uploadFileToS3(
          req.files.vaccine[0],
          "vaccine-records"
        );
      }
      if (req.files.microchip && req.files.microchip.length > 0) {
        req.body.microchip = await uploadFileToS3(
          req.files.microchip[0],
          "microchip-info"
        );
      }
      if (
        req.files.healthCertificate &&
        req.files.healthCertificate.length > 0
      ) {
        req.body.healthCertificate = await uploadFileToS3(
          req.files.healthCertificate[0],
          "health-certificates"
        );
      }
    }


    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log({pet});

    if (!pet) {
      return res.status(404).json({ message: "Pet not found for update" });
    }

    res.json(pet); 
  } catch (err) {
    console.error("Failed to update pet:", err);
    res
      .status(500)
      .json({ message: "Failed to update pet.", error: err.message });
  }
}

async function deletePet(req, res) {
  try {
    // Find and delete the pet by ID
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found for deletion." });
    }
    res.json({ message: "Pet deleted successfully.", pet }); // Respond with success message and deleted pet
  } catch (err) {
    console.error("Failed to delete pet:", err);
    res
      .status(500)
      .json({ message: "Failed to delete pet.", error: err.message });
  }
}

async function uploadFileToS3(file, folderName) {
  const s3Client = new S3Client({ region: S3_REGION });

  const s3Params = {
    Bucket: S3_BUCKET,
    // Use the folderName parameter to create 'receipts/' or 'tickets/' prefixes
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










