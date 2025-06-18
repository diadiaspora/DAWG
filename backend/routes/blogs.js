const express = require("express");
const router = express.Router();
const multer = require("multer"); // Import multer
const upload = multer({ storage: multer.memoryStorage() }); // Configure multer to store files in memory
const blogsCtrl = require("../controllers/blogs"); // Corrected controller import name

// All paths start with '/api/blogs';

// GET /api/blogs
router.get("/", blogsCtrl.index);

// POST /api/blogs (CREATE action with file uploads)
// Use upload.fields() to handle multiple named file inputs for content images
router.post(
  "/",
  upload.fields([
    { name: "contentOneImage", maxCount: 1 },
    { name: "contentTwoImage", maxCount: 1 },
    { name: "contentThreeImage", maxCount: 1 },
    { name: "contentFourImage", maxCount: 1 },
  ]),
  blogsCtrl.create
);

// GET /api/blogs/:id
router.get("/:id", blogsCtrl.show);

// PUT /api/blogs/:id (UPDATE action with file uploads)
// Use upload.fields() to handle multiple named file inputs for content images
router.put(
  "/:id",
  upload.fields([
    { name: "contentOneImage", maxCount: 1 },
    { name: "contentTwoImage", maxCount: 1 },
    { name: "contentThreeImage", maxCount: 1 },
    { name: "contentFourImage", maxCount: 1 },
  ]),
  blogsCtrl.update
);

// DELETE /api/blogs/:id
router.delete("/:id", blogsCtrl.deleteBlog);

module.exports = router;
