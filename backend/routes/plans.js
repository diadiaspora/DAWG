const express = require("express");
const router = express.Router();
const upload = require("multer")();
const plansCtrl = require("../controllers/plans");

// All paths start with '/api/plans';

// POST /api/plans (CREATE action)
router.post("/", plansCtrl.create);

router.get("/", plansCtrl.index);

router.get("/:id", plansCtrl.show);

router.put("/:id", upload.single("image"), plansCtrl.update);

router.delete("/:id", plansCtrl.deletePlan);

module.exports = router;
