import { useState } from "react";
import * as planService from "../../services/planService";
import "./PlanBasicForm.css";

export default function PlanBasicsForm() {
  const [formData, setFormData] = useState({
    month: "",
    day: "",
    year: "",
    destination: "",
    notes: "",
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
    <div className="divbody">
      <aside>
        <h3>Create a plan </h3>
        <p>Add your Photos here</p>
      </aside>

      <main>Calander</main>

      <div className="aside">
        <div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex" }}>
              <label>Month</label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                style={{ width: "180px" }}
              >
                <option value="">-- Select Month --</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
              <label> Day </label>
              <select
                value={formData.day}
                onChange={handleChange}
                style={{ width: "80px" }}
              >
                <option value="">-- Select Day --</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <label> Year </label>
              <select
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                style={{ width: "150px" }}
              >
                <option value="">-- Select Year --</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
            </div>
            <label> Destination </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
            />
            <label> Notes </label>
            <textarea
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />
            <button type="submit">Add New Pet</button>
          </form>
        </div>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>

      <div className="main">
        <div>
          <img src="./calander.png" className="calander" alt="calander"></img>
        </div>
      </div>
    </div>
  );
};


