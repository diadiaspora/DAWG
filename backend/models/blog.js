const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const blogSchema = mongoose.Schema({
  title: { type: String },

  content: { type: String },

});




const Blog = mongoose.model("Blog", blogSchema);
  
module.exports = Blog;


