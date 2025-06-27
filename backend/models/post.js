const mongoose = require("mongoose");





const commentSchema = new mongoose.Schema(
  {
  
    content: {
      type: String,
      required: true
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: false,
      enum: [
        "Mexico",
        "Chile",
        "Berlin",
        "Costa Rica",
        "Delta",
        "American Airlines",
        "Avianca",
        "AeroMexico",
        "LATAM",
      ],
    },

    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    likes: {
      type: Number,
      default: 0,
    },

    comments: [commentSchema],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);


const Post = mongoose.model("Post", postSchema);

module.exports = Post;

