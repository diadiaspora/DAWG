const Blog = require("../models/blog");

module.exports = {
  index,
    create,
    show,
    update,
  deleteBlog,
};

async function index(req, res) {
  try {
    const blogs = await Blog.find({});
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

async function create(req, res) {
  try {
    req.body.author = "6848b5ecd9f9f34b7103a733";
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create post" });
  }
}

async function show(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);

    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}
  


async function update(req, res) {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
}

async function deleteBlog(req, res) {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch blos" });
  }
}


