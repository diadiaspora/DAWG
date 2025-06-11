const express = require("express");
const router = express.Router();
const profilesCtrl = require("../controllers/profiles");

// All paths start with '/api/plans';

// POST /api/plans (CREATE action)
router.post("/", profilesCtrl.create);

router.get("/", profilesCtrl.index);

router.get("/:id", profilesCtrl.show);

router.put("/:id", profilesCtrl.update);

router.delete("/:id", profilesCtrl.deleteProfile);

module.exports = router;
