const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const petSchema = new mongoose.Schema({
    dogName: {
        type: String,
       
      },
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
  name: {
    type: String,
  },
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
  bio: {
    type: String,
  },
    pet: [petSchema], 
  
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Profile = mongoose.model("Profile", profileSchema);
  
module.exports = Profile;


