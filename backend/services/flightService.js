// /Users/diadiaspora/code/ga/DAWG/frontend/src/services/flightService.js

// Use require for Amadeus
const Amadeus = require("amadeus");

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

// Define the async function without 'export' keyword
async function searchFlights({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults,
  currencyCode = "USD",
  max = 5,
}) {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      currencyCode,
      max,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Amadeus API Error:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch flights from Amadeus API.");
  }
}

// Export the function using module.exports
module.exports = {
  searchFlights,
};
