// /Users/diadiaspora/code/ga/DAWG/backend/controllers/flights.js

// CORRECTED PATH: From backend/controllers, go up one level (to backend/),
// then into the 'services' folder.
const { searchFlights } = require("../services/flightService"); // This is the simple and correct path now!

async function getFlights(req, res) {
  try {
    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
    } = req.query;

    if (
      !originLocationCode ||
      !destinationLocationCode ||
      !departureDate ||
      !adults
    ) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters." });
    }

    const results = await searchFlights({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      currencyCode: "USD",
      max: 5,
    });

    res.json(results);
  } catch (error) {
    console.error("Error fetching flights:", error.message);
    res.status(500).json({ error: "Server error fetching flight data." });
  }
}

module.exports = {
  getFlights,
};
