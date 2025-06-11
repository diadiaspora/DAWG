const express = require("express");
const router = express.Router();
const blogsCtrl = require("../controllers/blogs");


// All paths start with '/api/posts'

// Protect all defined routes


// GET /api/posts (INDEX action)
router.get("/", blogsCtrl.index);
// POST /api/posts (CREATE action)
router.post("/", blogsCtrl.create);

router.get("/:id", blogsCtrl.show);

router.put("/:id", blogsCtrl.update);

router.delete("/:id", blogsCtrl.deleteBlog);

module.exports = router;
