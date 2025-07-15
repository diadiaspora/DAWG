const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    photoGallery: {
      type: [String], // Array of S3 URLs
      default: [],
    },

    profile: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
