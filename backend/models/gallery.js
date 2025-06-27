const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const gallerySchema = new Schema(
  {
    photoGallery: {
      type: [String], // array of S3 image URLs
      default: [],
    },

    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
