const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const petSchema = new mongoose.Schema({
  petName: {
    type: String,
  },

  bio: {
    type: String,
  },
  breed: {
    type: String,
  },
  age: {
    type: Number,
  },
  weight: {
    type: String,
  },
  microchip: {
    type: String,
    default: "",
  },
  vaccine: {
    type: String,
    default: "",
  },
  healthCertificate: {
    type: String,
    default: "",
  },

  petPhoto: {
    type: String,
    default: "https://i.imgur.com/KTEjbsw.png",
  },
  petOwner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});



const Pet = mongoose.model("Pet", petSchema);
  
module.exports = Pet;


