import { useState, useEffect } from "react";
import * as planService from "../../services/planService";
import "./PlanFlightForm.css";

export default function PlanFlightForm({ planId }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: planId,
    airline: "",
    outboundFlightNumber: "",
    outboundDate: "",
    outboundDepartureTime: "",
    outboundArrivalTime: "",
    returnFlightNumber: "",
    returnDate: "",
    returnDepartureTime: "",
    returnArrivalTime: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => { }, [planId]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value, id:planId }));
  }
  
  function handleToggle() {
    setShowForm((prev) => !prev);
  }
  async function handleSubmit(evt) {
    evt.preventDefault();
    setShowForm(false);
    try {
      await planService.update(formData);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg("Failed to save flight details. Please try again.");
    }
  }

  return (
    <div>
      <aside
        style={{
          marginLeft: "42px",
          backgroundColor: "#D9D9D9",
          width: "1012px", borderRadius: "10px",
        }}
      >
        <h3>Flight Info</h3>
        <button onClick={handleToggle}>
          {showForm ? "Hide Form" : "Open Form"}
        </button>
      </aside>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            height: "350px",
            marginLeft: "42px",
            marginRight: "42px",
            width: "1012px",
            display: "grid",
            gap: "1.2vmin",
            padding: "4vmin",
            border: "0.5vmin solid #1a1a1a",
            borderRadius: "1vmin",
            height: "350px",
          }}
        >
          <legend>Outbound Flight</legend>
          <div className="form-group">
            <label htmlFor="airline">Airline</label>
            <input
              type="text"
              id="airline"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
            />

            <label htmlFor="outboundFlightNumber">Flight Number</label>
            <input
              type="text"
              id="outboundFlightNumber"
              name="outboundFlightNumber"
              value={formData.outboundFlightNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="outboundDate">Date</label>
            <input
              type="date"
              id="outboundDate"
              name="outboundDate"
              value={formData.outboundDate}
              onChange={handleChange}
            />

            <label htmlFor="outboundDepartureTime">Departure Time</label>
            <input
              type="time"
              id="outboundDepartureTime"
              name="outboundDepartureTime"
              value={formData.outboundDepartureTime}
              onChange={handleChange}
            />

            <label htmlFor="outboundArrivalTime">Arrival Time</label>
            <input
              type="time"
              id="outboundArrivalTime"
              name="outboundArrivalTime"
              value={formData.outboundArrivalTime}
              onChange={handleChange}
            />
          </div>

          {/* Return Flight Info */}

          <legend>Return Flight</legend>
          <div className="form-group">
            <label htmlFor="returnFlightNumber">Flight Number</label>
            <input
              type="text"
              id="returnFlightNumber"
              name="returnFlightNumber"
              value={formData.returnFlightNumber}
              onChange={handleChange}
            />

            <label htmlFor="returnDate">Date</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="returnDepartureTime">Departure Time</label>
            <input
              type="time"
              id="returnDepartureTime"
              name="returnDepartureTime"
              value={formData.returnDepartureTime}
              onChange={handleChange}
            />

            <label htmlFor="returnArrivalTime">Arrival Time</label>
            <input
              type="time"
              id="returnArrivalTime"
              name="returnArrivalTime"
              value={formData.returnArrivalTime}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Save Flight Info
          </button>
          {errorMsg && <p className="error">{errorMsg}</p>}
        </form>
      )}
    </div>
  );
}
