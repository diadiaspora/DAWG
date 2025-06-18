const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    contentOneImage: {
      type: String,
      default: "https://i.imgur.com/KTEjbsw.png",
    },
    contentOne: { type: String, required: true },
    // Removed 'required: true' for contentTwo, contentThree, and contentFour
    contentTwoImage: {
      type: String,
      default: "https://i.imgur.com/KTEjbsw.png",
    },
    contentTwo: { type: String }, // Now optional
    contentThreeImage: {
      type: String,
      default: "https://i.imgur.com/KTEjbsw.png",
    },
    contentThree: { type: String }, // Now optional
    contentFourImage: {
      type: String,
      default: "https://i.imgur.com/KTEjbsw.png",
    },
    contentFour: { type: String }, // Now optional
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

module.exports = mongoose.model("Blog", blogSchema);
