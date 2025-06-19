// /Users/diadiaspora/code/ga/DAWG/frontend/src/Pages/FlightInfoPage.jsx (or wherever it's located)

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function FlightInfoPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve parameters using the names sent by SearchFlights and expected by the backend
  const originLocationCode = searchParams.get("originLocationCode");
  const destinationLocationCode = searchParams.get("destinationLocationCode");
  const departureDate = searchParams.get("departureDate");
  const adults = searchParams.get("adults");
  const returnDate = searchParams.get("returnDate"); // Will be null if not present

  useEffect(() => {
    async function fetchFlights() {
      // Reset state for a new search
      setLoading(true);
      setResults([]);
      setError(null);

      // --- Important: Client-side validation before making the API call ---
      // This helps prevent unnecessary calls if parameters are missing
      if (
        !originLocationCode ||
        !destinationLocationCode ||
        !departureDate ||
        !adults
      ) {
        setError("Missing required flight search parameters in the URL.");
        setLoading(false);
        return;
      }

      try {

        let url = `/api/flights/search?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}`;

        if (returnDate) {
          url += `&returnDate=${returnDate}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
         
          const errorData = await res.json();

          throw new Error(
            errorData.error || `HTTP error! Status: ${res.status}`
          );
        }

        const data = await res.json();

        setResults(data || []);
      } catch (err) {
        console.error("Error fetching flights:", err);
        setError(
          err.message || "Failed to fetch flight data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }


    if (
      originLocationCode &&
      destinationLocationCode &&
      departureDate &&
      adults
    ) {
      fetchFlights();
    } else {
 
      setLoading(false);
      setError("Please perform a search from the flight search form.");
    }
  }, [
    originLocationCode,
    destinationLocationCode,
    departureDate,
    adults,
    returnDate,
  ]);

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Flight Results
      </h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading flights...</p>
      ) : error ? (
        <p
          style={{
            color: "red",
            textAlign: "center",
            border: "1px solid red",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Error: {error}
        </p>
      ) : results.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No flights found for your criteria. Please try different dates or
          routes.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {results.map((flight, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: "25px",
                border: "3px solid #000000",
                padding: "15px",
                borderRadius: "20px",
               
              }}
            >
              <h2
                style={{
                  fontSize: "1.2em",
                  marginBottom: "10px",
                  color: "#000000",
                }}
              >
                Price:{" "}
                <strong style={{ color: "#000000" }}>
                  ${flight.price.total} {flight.price.currency}
                </strong>
              </h2>
              {/* Iterating through itineraries, typically one for simple searches */}
              {flight.itineraries.map((itinerary, itIdx) => (
                <div key={itIdx} style={{ marginBottom: "15px" }}>
                  <h3
                    style={{
                      fontSize: "1em",
                      marginBottom: "8px",
                      color: "#000000",
                    }}
                  >
                    Itinerary {itIdx + 1} (Duration: {itinerary.duration}):
                  </h3>
                
                  {itinerary.segments.map((segment, segIdx) => (
                    <div
                      key={segIdx}
                      style={{
                        marginLeft: "20px",
                        borderLeft: "3px solid #f0f0f0",
                        paddingLeft: "15px",
                        marginBottom: "10px",
                      }}
                    >
                      <p>
                        <strong>Segment {segIdx + 1}:</strong>{" "}
                        {segment.carrierCode} {segment.number || ""}
                      </p>
                      <p>
                        From: <strong>{segment.departure.iataCode}</strong> (
                        {new Date(segment.departure.at).toLocaleString()})
                      </p>
                      <p>
                        To: <strong>{segment.arrival.iataCode}</strong> (
                        {new Date(segment.arrival.at).toLocaleString()})
                      </p>
                      <p>
                        Aircraft: {segment.aircraft.code || "N/A"}, Stops:{" "}
                        {segment.numberOfStops}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
