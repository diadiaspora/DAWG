
const Post = require("../models/post");

// GET all posts
async function index(req, res) {
  try {
    
    const posts = await Post.find({})
      .populate("author", "name") 
      .sort({ createdAt: -1 }); 

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

// GET a single post by ID
async function show(req, res) {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name")
      .populate("comments.author", "name"); // Ensure comments.author is populated if applicable
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Failed to fetch post" });
  }
}

// POST create new post
async function create(req, res) {
  try {
    // Assuming req.user._id is set by your authentication middleware
    req.body.author = req.user._id;
    const post = await Post.create(req.body);
    // Populate the author for the response to the client
    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "name"
    );
    res.status(201).json(populatedPost); // Use 201 for resource creation
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(400).json({ message: "Failed to create post" });
  }
}

// PUT update post
async function update(req, res) {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id }, // Ensure only the author can update
      req.body,
      { new: true }
    );
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found or not authorized to update" });
    res.json(post);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(400).json({ message: "Failed to update post" });
  }
}

// PUT like a post
async function likePost(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } }, // Increment the 'likes' field
      { new: true } // Return the updated document
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(500).json({ message: "Failed to like post" });
  }
}

// Export all the functions so your router can access them
module.exports = {
  index,
  show,
  create,
  update,
  likePost,
};
