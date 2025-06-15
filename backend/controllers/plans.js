const Plan = require("../models/plan");

module.exports = {
  index,
  create,
  show,
  update,
  deletePlan,
};

async function index(req, res) {
  try {
    const plans = await Plan.find({});
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(plans);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to index plan" });
  }
}

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const plan = await Plan.create(req.body);
    await plan.save()
    res.json(plan);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create plan" });
  }
}

async function show(req, res) {
  try {
    
    const plan = await Plan.findById(req.params.id);
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(plan);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to show plan" });
  }
}


async function update(req, res) {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body);


    res.json(plan);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update" });
  }
}

async function deletePlan(req, res) {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    res.json(plan);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete" });
  }
}

