const Profile = require("../models/profile");

module.exports = {
  index,
  create,
  show,
  update,
  deleteProfile,
};

async function index(req, res) {
  try {
    const profiles = await Profile.find({});
 
    res.json(profiles);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

async function create(req, res) {
  try {
    req.body.author = "6848b5ecd9f9f34b7103a733";
    const profile = await Profile.create(req.body);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create post" });
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.id);
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to show profile" });
  }
}

async function update(req, res) {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body);

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update profile" });
  }
}

async function deleteProfile(req, res) {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete profile" });
  }
}
