const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new mongoose.Schema({
  avatar: {
    type: String,
    default: "https://i.ibb.co/bgQM3cM2/Vector.png",
  },
  username: {
    type: String,
  },
  bio: {
    type: String,
  },

  posts: {
    type: String,
  },
  blogs: {
    type: String,
  },
  passport: {
    type: String,
    default: "",
  },

  importantDocs: {
    type: String,
    default: "",
  },

  gallery: {
    type: Schema.Types.ObjectId,
    ref: "Gallery",
  },

  pets: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Pet",
    },
  ],

  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
