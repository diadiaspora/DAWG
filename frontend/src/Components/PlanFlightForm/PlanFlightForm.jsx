import { useState } from "react";

import * as planService from "../../services/planService";


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
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await planService.create(formData);
    } catch (err) {
      setErrorMsg("Adding Post Failed");
    }
  }

  return (
    <div className="planFlight">
      <h3>Flight Info</h3>
      <form onSubmit={handleSubmit}>
        <label>Airline</label>
        <input
          type="text"
          name="airline"
          value={formData.airline}
          onChange={handleChange}
        />

        <label>Flight Number</label>
        <input
          type="text"
          name="outboundFlightNumber"
          value={formData.outboundFlightNumber}
          onChange={handleChange}
        />

        <label>Date</label>
        <input
          type="text"
          name="outboundDate"
          value={formData.outboundDate}
          onChange={handleChange}
        />

        <label>Departure Time</label>
        <input
          type="text"
          name="outboundDepartureTime"
          value={formData.outboundDepartureTime}
          onChange={handleChange}
        />

        <label>Arrival Time</label>
        <input
          type="text"
          name="outboundArrivalTime"
          value={formData.outboundArrivalTime}
          onChange={handleChange}
        />

        <label>Return Date</label>
        <input
          type="text"
          name="returnDate"
          value={formData.returnDate}
          onChange={handleChange}
        />

        <label>Return Departure Time</label>
        <input
          type="text"
          name="returnDepartureTime"
          value={formData.returnDepartureTime}
          onChange={handleChange}
        />

        <label>Return Arrival Time</label>
        <input
          type="text"
          name="returnArrivalTime"
          value={formData.returnArrivalTime}
          onChange={handleChange}
        />

        <button type="submit">Save</button>
      </form>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
}
