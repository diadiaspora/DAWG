const express = require("express");
const router = express.Router();
const blogsCtrl = require("../controllers/blogs");



router.get("/", blogsCtrl.index);

router.post("/", blogsCtrl.create);

router.get("/:id", blogsCtrl.show);

router.put("/:id", blogsCtrl.update);

router.delete("/:id", blogsCtrl.deleteBlog);

module.exports = router;
