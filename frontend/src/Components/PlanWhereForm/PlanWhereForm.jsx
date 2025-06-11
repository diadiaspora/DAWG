import { useState } from "react";
import * as planService from "../../services/planService";
import "./PlanWhereForm.css";

export default function PlanWhereForm() {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    address: "",
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
      setErrorMsg(""); 
    } catch (err) {
      setErrorMsg("Failed to save location details. Please try again.");
    }
  }

  return (
    <div className="planWhere">
      <h3>Where Are You Staying?</h3>
      <form onSubmit={handleSubmit} className="where-form">
        <div className="form-group">
          <label htmlFor="checkIn">Check-In</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
          />

          <label htmlFor="checkOut">Check-Out</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
          />

          <button type="button" className="upload-btn">
            Upload Receipt
          </button>
        </div>

        <div className="form-group full-width">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Save Stay Info
        </button>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
    </div>
  );
}
