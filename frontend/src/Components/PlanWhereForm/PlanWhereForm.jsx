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
    setFormData({ ...formData, [name]: value });
  }

    async function handleSubmit(evt) {
      evt.preventDefault();
      try {
        await planService.update(formData);
      } catch (err) {
        setErrorMsg("Adding Post Failed");
      }
    }
  
  return (
    <div className="where">
      <h3> Where are You Staying?</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div style={{display:"flex"}}>
            <label> Check In </label>
            <input
              type="text"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              style={{ width: "150px" }}
            />
            <label> Check Out </label>
            <input
              type="text"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              style={{ width: "150px" }}
            />
            <button> Upload Recipt</button>
          </div>
          <label> Address </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <button type="submit">Add New Pet</button>
        </form>
      </div>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
};

