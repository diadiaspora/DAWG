import { useState } from "react";

const PlanBasicsForm = (props) => {

const [formData, setFormData] = useState({
  month: "",
  day: "",
  year: "",
  destination: "",
  notes: "",
});
    
const handleChange = (evt) => {
  setFormData({ ...formData, [evt.target.name]: evt.target.value });
};
    
  return (
    <div>
      <div>
        <form>
          <label htmlFor="month"> Month </label>
          <input
            id="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
          />
          <label htmlFor="day"> Day </label>
          <input
            id="day"
            name="day"
            value={formData.day}
            onChange={handleChange}
            required
          />
          <label htmlFor="year"> Year </label>
          <input
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
          <label htmlFor="destination"> Destination </label>
          <input
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          />
          <label htmlFor="notes"> Notes </label>
          <input
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
          <button type="submit">Add New Pet</button>
        </form>
      </div>
    </div>
  );
    
}

export default PlanBasicsForm;