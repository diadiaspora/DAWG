const express = require("express");
const router = express.Router();
const multer = require("multer"); // Import multer
const upload = multer({ storage: multer.memoryStorage() }); // Configure multer to store files in memory
const blogsCtrl = require("../controllers/blogs"); // Corrected controller import name
const ensureLoggedIn = require("../middleware/ensureLoggedIn");



router.get("/", blogsCtrl.index);

router.get("/:id", blogsCtrl.show);

router.use(ensureLoggedIn);

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

router.delete("/:id", blogsCtrl.deleteBlog);

module.exports = router;
