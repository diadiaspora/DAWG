const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const galleryCtrl = require("../controllers/gallerys");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

router.get("/all", galleryCtrl.getAllGalleryImages);
router.get("/:profileId", galleryCtrl.getGalleryByProfile);

router.use(ensureLoggedIn);

router.post(
  "/upload/:profileId",
  upload.single("image"),
  galleryCtrl.uploadGalleryImage
);

router.delete("/delete/:profileId", galleryCtrl.deleteGalleryImage);

module.exports = router;
