const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formBasicSchema = new Schema(
  {
    month: { type: String, required: true },
    day: { type: String, required: true },
    year: { type: String, required: true },
    destination: { type: String, required: true },
    notes: { type: String, required: true },
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

module.exports = mongoose.model("FormBasic", formBasicSchema);