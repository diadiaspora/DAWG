const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

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
           
          },
        vaccineNumber: {
            type: String,
        },
        document: {
            type: String,
           
          },
    
});
  
const profileSchema = new mongoose.Schema({

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

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    petName: { type: String },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    profile: [profileSchema],
  },
  {
    timestamps: true,
    // Remove password when doc is sent across network
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  // 'this' is the user document
  if (!this.isModified("password")) return next();
  // Replace the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

module.exports = mongoose.model("User", userSchema);
