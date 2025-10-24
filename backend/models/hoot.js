const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
  },
  { timestamps: true }
);

const hootSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
      enum: [
        "General",
        "Airlines",
        "Argentina",
        "Australia",
        "Bali",
        "Berlin",
        "Brazil",
        "Canada",
        "Chile",
        "Colombia",
        "Costa Rica",
        "Egypt",
        "France",
        "Greece",
        "Guatemala",
        "India",
        "Italy",
        "Mexico",
        "New Zealand",
        "Peru",
        "Philippines",
        "South Africa",
        "Spain",
        "Thailand",
        "United Kingdom",
        "USA",
        "LGBTQ",
        "BIPOC",
      ],
    },
    gifUrl: {
      type: String,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    comments: [commentSchema],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
  },

  { timestamps: true }
);

const Hoot = mongoose.model("Hoot", hootSchema);

module.exports = Hoot;
