

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
      }}
    >
      <div
        style={{
          display: "flex",
          paddingTop: "42px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label> Where from?*</label>
          <input
            type="text"
            placeholder="Origin (e.g., SYD)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)} // Keep user input as is, format on append
            required
            style={{
              padding: "8px",
              borderRadius: "50px",
              height: "44px",
              borderColor: "black",
              width: "220px",
              marginLeft: "42px",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label> Where To?*</label>
          <input
            type="text"
            placeholder="Destination (e.g., BKK)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)} // Keep user input as is, format on append
            required
            style={{
              padding: "8px",
              borderRadius: "50px",
              height: "44px",
              borderColor: "black",
              width: "220px",
              marginLeft: "22px",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Departure Date:*</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
            style={{
              padding: "8px",
              borderRadius: "50px",
              height: "44px",
              borderColor: "black",
              marginLeft: "22px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "22px",
          }}
        >
          <label>Return Date:</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "50px",
              height: "44px",
              borderColor: "black",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "22px"
          }}
        >
          <label>Adults:</label>
          <input
            type="number"
            placeholder="Number of Adults"
            value={adults}
            onChange={(e) =>
              setAdults(Math.max(1, parseInt(e.target.value) || 1))
            }
            min="1"
            required
            style={{
              padding: "8px",
              borderRadius: "50px",
              height: "44px",
              borderColor: "black",
              width: "80px",
            }}
          />
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "36px",
          }}
        >
          <button
            type="submit"
            style={{
              height: "44px",
              backgroundColor: "#1E3769",
              borderRadius: "50px",
              width: "200px",
              borderColor: "#1E3769",
            }}
          >
            Search Flights
          </button>
        </div>
      </div>
    </form>
  );
}
