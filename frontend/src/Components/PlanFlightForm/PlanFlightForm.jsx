import { useState } from "react";

const PlanFlightForm = (props) => {
  const [formData, setFormData] = useState({
    airline: "",
    flighNumber: "",
    outDate: "",
    outDepartureTime: "",
    outArrivalTime: "",
    returnDate: "",
    returnDepartureTime: "",
    returnArrivalTime: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  return (
    <div>
      <div>
        <form>
          <label htmlFor="airline"> Airline </label>
          <input
            id="airline"
            name="airline"
            value={formData.airline}
            onChange={handleChange}
            required
          />
          <label htmlFor="flighNumber"> Fligh Number </label>
          <input
            id="flighNumber"
            name="flighNumber"
            value={formData.flighNumber}
            onChange={handleChange}
            required
          />
          <label htmlFor="outDate"> Date </label>
          <input
            id="outDate"
            name="outDate"
            value={formData.outDate}
            onChange={handleChange}
          />
          <label htmlFor="outDepartureTime"> Departure Time </label>
          <input
            id="outDepartureTime"
            name="outDepartureTime"
            value={formData.outDepartureTime}
            onChange={handleChange}
          />
          <label htmlFor="outArrivalTime"> Arrival Time </label>
          <input
            id="outArrivalTime"
            name="outArrivalTime"
            value={formData.outArrivalTime}
            onChange={handleChange}
          />
          <label htmlFor="returnDate"> Date </label>
          <input
            id="returnDate"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
          />
          <label htmlFor="returnDepartureTime"> Departure Time </label>
          <input
            id="returnDepartureTime"
            name="returnDepartureTime"
            value={formData.returnDepartureTime}
            onChange={handleChange}
          />
          <label htmlFor="returnArrivalTime"> Arrival Time </label>
          <input
            id="returnArrivalTime"
            name="returnArrivalTime"
            value={formData.returnArrivalTime}
            onChange={handleChange}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default PlanFlightForm;