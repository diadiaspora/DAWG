const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    contentOne: { type: String, required: true },
    contentTwo: { type: String, required: true },
    contentThree: { type: String, required: true },
    contentFour: { type: String, required: true },
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
