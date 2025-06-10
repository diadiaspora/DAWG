const PlanBasicForm = require("../models/planBasicForm"); // Corrected model name variable

module.exports = {
  index,
  create,
};

async function index(req, res) {
  try {
    // Corrected variable name: 'PlanBasicForm' (your model) instead of 'forBasic'
    const formBasics = await PlanBasicForm.find({});
    // Below would return all posts for just the logged in user
    // If you uncomment this, ensure 'req.user._id' is available (e.g., via authentication middleware)
    // const formBasics = await PlanBasicForm.find({ author: req.user._id });
    res.json(formBasics);
  } catch (err) {
    console.error("Error in index function:", err); // Use console.error for errors
    res.status(500).json({ message: "Failed to fetch plans" }); // More specific message
  }
}

async function create(req, res) {
  try {
    // If 'author' is a field in your PlanBasicForm model and you want to associate
    // the plan with the logged-in user, ensure 'req.user._id' is available.
    // Otherwise, remove this line if 'author' is not part of your model or
    // if you don't require user association for basic plan creation.
    if (req.user && req.user._id) {
      req.body.author = req.user._id;
    }

    // Corrected variable name: 'PlanBasicForm' (your model) instead of 'formBasic'
    const formBasic = await PlanBasicForm.create(req.body);
    res.status(201).json(formBasic); // Use 201 for successful creation
  } catch (err) {
    console.error("Error in create function:", err); // Use console.error for errors
    // A more specific error message, and consider logging `err.message` for client
    res
      .status(400)
      .json({ message: "Failed to create plan", error: err.message });
  }
}
