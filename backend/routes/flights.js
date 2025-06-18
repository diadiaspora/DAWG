// /Users/diadiaspora/code/ga/DAWG/backend/routes/flights.js
const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flights"); // Correctly imports the module

// Define your flight search route, using the controller function
// Use `flightController.getFlights` because that's what you imported.
router.get("/search", flightController.getFlights);

module.exports = router;
