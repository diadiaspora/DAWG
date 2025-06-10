// routes/api/planRoutes.js
const express = require("express");
const router = express.Router();
const planBasicFormsCtrl = require("../../controllers/planBasicForms"); // Adjust this path if your controller file is elsewhere

// POST /api/plan (for creating a new plan)
// This will be handled by planBasicFormsCtrl.create
router.post("/", planBasicFormsCtrl.create);

// GET /api/plan (for fetching all plans)
// This will be handled by planBasicFormsCtrl.index
router.get("/", planBasicFormsCtrl.index);

module.exports = router;
