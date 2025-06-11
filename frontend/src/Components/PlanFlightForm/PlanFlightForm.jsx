import { useState } from "react";
import * as planService from "../../services/planService";
import "./PlanFlightForm.css";

export default function PlanFlightForm() {
  const [formData, setFormData] = useState({
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

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await planService.update(formData);
      setErrorMsg(""); // clear error if successful
    } catch (err) {
      setErrorMsg("Failed to save flight details. Please try again.");
    }
  }

  return (
    <div className="planFlight">
      <h3>Flight Info</h3>
      <form onSubmit={handleSubmit} className="flight-form">
        {/* Outbound Flight Info */}
        <fieldset>
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
        </fieldset>

        {/* Return Flight Info */}
        <fieldset>
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
        </fieldset>

        <button type="submit" className="submit-btn">
          Save Flight Info
        </button>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
    </div>
  );
}
