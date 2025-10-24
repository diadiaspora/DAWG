const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const profilesCtrl = require("../controllers/profiles");
const petsCtrl = require("../controllers/pets");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");

router.use(ensureLoggedIn);

router.post(
  "/",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    { name: "importantDocs", maxCount: 1 },
  ]),
  profilesCtrl.create
);

router.get("/", profilesCtrl.index);

router.get("/:id", profilesCtrl.show);

router.put(
  "/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    { name: "importantDocs", maxCount: 1 },
  ]),
  profilesCtrl.update
);

router.delete("/:id", profilesCtrl.deleteProfile);

module.exports = router;
