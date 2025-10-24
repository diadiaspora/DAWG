const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const plansCtrl = require("../controllers/plans");

router.post("/", plansCtrl.create);

router.get("/", plansCtrl.index);

router.get("/:id", plansCtrl.show);

router.put(
  "/:id",
  upload.fields([
    { name: "receipt", maxCount: 1 },
    { name: "ticket", maxCount: 1 },
  ]),
  plansCtrl.update
);



router.delete("/:id", plansCtrl.deletePlan);

module.exports = router;
