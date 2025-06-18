// /Users/diadiaspora/code/ga/DAWG/frontend/src/Components/SearchFlights.jsx (or wherever it's located)

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchFlights() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState(""); // Optional for one-way search
  const [adults, setAdults] = useState(1); // New state for adults, default to 1

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!origin || !destination || !departureDate || adults < 1) {
      alert(
        "Please fill in all required fields (Origin, Destination, Departure Date, Adults)."
      );
      return;
    }

    const params = new URLSearchParams();
    params.append("originLocationCode", origin.toUpperCase()); // Ensure uppercase for IATA codes
    params.append("destinationLocationCode", destination.toUpperCase()); // Ensure uppercase
    params.append("departureDate", departureDate);
    params.append("adults", adults);

    // Only append returnDate if it's provided
    if (returnDate) {
      params.append("returnDate", returnDate);
    }

    // Navigate to the /flights route with query parameters
    navigate(`/flights?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        gap: "10px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        
      }}
    >
      <input
        type="text"
        placeholder="Origin (e.g., SYD)"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)} // Keep user input as is, format on append
        required
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      />
      <input
        type="text"
        placeholder="Destination (e.g., BKK)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)} // Keep user input as is, format on append
        required
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      />
      <label>
        Departure Date:
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            width: "calc(100% - 16px)",
          }}
        />
      </label>
      <label>
        Return Date (Optional):
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            width: "calc(100% - 16px)",
          }}
        />
      </label>
      <label>
        Adults:
        <input
          type="number"
          placeholder="Number of Adults"
          value={adults}
          onChange={(e) =>
            setAdults(Math.max(1, parseInt(e.target.value) || 1))
          } // Ensure at least 1 adult
          min="1"
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            width: "calc(100% - 16px)",
          }}
        />
      </label>
      <button
        type="submit"
        style={{
          padding: "10px 15px",
          borderRadius: "4px",
          border: "none",
          background: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Search Flights
      </button>
    </form>
  );
}
