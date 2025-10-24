const Post = require("../models/post");

module.exports = {
  create,
  index,
  show,
  update,
  likePost,
};

async function create(req, res) {
  try {
    req.body.author = req.user._id;

    if (req.file) {
      req.body.imageUrl = await uploadFile(req.file);
    }
    const post = await Post.create(req.body);

    res.json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(400).json({ message: "Failed to create post" });
  }
}

async function index(req, res) {
  try {
    const posts = await Post.find({})
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Failed to index posts" });
  }
}

async function show(req, res) {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name")
      .populate("comments.author", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Failed to show post" });
  }
}

async function update(req, res) {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
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

async function likePost(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(500).json({ message: "Failed to like post" });
  }
}
