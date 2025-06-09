import { useState } from "react";

const PlanWhereForm = (props) => {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    address: "",
    
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  return (
    <div>
      <div>
        <form>
          <label htmlFor="checkIn"> Check In </label>
          <input
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
          />
          <label htmlFor="checkOut"> Check Out </label>
          <input
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
          />
          <label htmlFor="address"> Address </label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        
          <button type="submit">Add New Pet</button>
        </form>
      </div>
    </div>
  );
};

export default PlanWhereForm;