const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or "Profile", depending on your use
      required: true,
    },
    replies: [this], // Recursive embedding of replies
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
      type: String, // ✅ Add this field to support storing a Giphy link
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    comments: [commentSchema],
  },

  { timestamps: true }
);

// models/hoot.js

const Hoot = mongoose.model("Hoot", hootSchema);

// models/hoot.js

module.exports = Hoot;
