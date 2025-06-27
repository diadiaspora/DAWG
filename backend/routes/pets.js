const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const petsCtrl = require("../controllers/pets");


router.post("/", petsCtrl.create);

router.get("/", petsCtrl.index);

router.get("/:id", petsCtrl.show);

router.put(
  "/:id",
  upload.fields([
    { name: "petPhoto", maxCount: 1 },
    { name: "vaccine", maxCount: 1 },
    { name: "healthCertificate", maxCount: 1 },
    { name: "microchip", maxCount: 1 },
  ]),
  petsCtrl.update
);



router.delete("/:id", petsCtrl.deletePet);

module.exports = router;
