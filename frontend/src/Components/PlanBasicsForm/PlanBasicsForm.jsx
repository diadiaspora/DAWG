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
  const [planId, setPlanId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const newPlan = await planService.create(formData);
      setPlanId(newPlan._id);
    } catch (err) {
      setErrorMsg("Adding Plan Failed");
    }
  }

  return (
    <div className="divbody">
      <aside>
        <h3>Create a Plan</h3>
        <p>Add your photos here</p>
      </aside>

      <main>Calendar</main>

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
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <label>Day</label>
              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                style={{ width: "80px" }}
              >
                <option value="">-- Select Day --</option>
                {[...Array(31).keys()].map((d) => (
                  <option key={d + 1} value={d + 1}>
                    {d + 1}
                  </option>
                ))}
              </select>

              <label>Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                style={{ width: "150px" }}
              >
                <option value="">-- Select Year --</option>
                {[2025, 2026, 2027, 2028].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <label>Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
            />

            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />

            <button type="submit">Create Plan</button>
          </form>
        </div>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>

      <div className="main">
        <img src="./calander.png" className="calander" alt="calendar" />
      </div>
    </div>
  );
}
