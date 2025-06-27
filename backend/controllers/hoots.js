const Hoot = require("../models/hoot.js");

module.exports = {
  create,
  index,
  show,
  update,
  comment,
  deleteHoot,
};

async function create(req, res) {
  try {
    req.body.user = req.user._id;

    if (req.file) {
      req.body.imageUrl = await uploadFile(req.file);
    }
    const hoot = await Hoot.create(req.body);

    res.json(hoot);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Create Hoot Failed" });
  }
}

async function index(req, res) {
  try {
    const hoots = await Hoot.find({});
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(hoots);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch hoots" });
  }
}

async function show(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.id).populate([
      "author",
      "comments.author",
    ]);

    res.json(hoot);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to show hoot" });
  }
}

async function update(req, res) {
  try {


    const hoot = await Hoot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hoot) {
      return res.status(404).json({ message: "Hoot not found for update" });
    }

    res.json(hoot);
  } catch (err) {
    console.error("Failed to update hoot:", err);
    res.status(500).json({ message: "Failed to update hoot." });
  }
}

async function comment(req, res) {
  try {
    req.body.author = req.user._id;
    console.log(req.body);
    const hoot = await Hoot.findById(req.params.id);
    console.log(hoot);
    hoot.comments.push(req.body);
    await hoot.save();

    const newComment = hoot.comments[hoot.comments.length - 1];

    newComment._doc.author = req.user;

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function deleteHoot(req, res) {
  try {
    const hoot = await Hoot.findByIdAndDelete(req.params.id);
    if (!hoot) {
      return res.status(404).json({ message: "Hoot not found for deletion" });
    }
    res.json(hoot);
  } catch (err) {
    console.error("Error in hoot delete:", err);
    res
      .status(500)
      .json({ message: "Failed to delete hoot", error: err.message });
  }
}