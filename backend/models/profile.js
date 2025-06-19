const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const petSchema = new mongoose.Schema({
  breed: {
    type: String,
  },
  age: {
    type: Number,
  },
  weight: {
    type: String,
  },
  microchipNumber: {
    type: String,
    default: "https://i.imgur.com/KTEjbsw.png",
  },
  vaccineNumber: {
    type: String,
    default: "https://i.imgur.com/KTEjbsw.png",
  },
  document: {
    type: String,
    default: "https://i.imgur.com/KTEjbsw.png",
  },
});

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  pets: {
    type: String,
  },
  posts: {
    type: String,
  },
  blogs: {
    type: String,
  },
  passportNumber: {
    type: String,
    default: "https://i.imgur.com/KTEjbsw.png",
  },
  gallery: {
    type: String,
  },

  pet: [petSchema],

  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Profile = mongoose.model("Profile", profileSchema);
  
module.exports = Profile;


