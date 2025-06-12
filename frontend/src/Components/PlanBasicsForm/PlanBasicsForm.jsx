import { useState } from "react";
import * as planService from "../../services/planService";
import "./PlanBasicForm.css";

import { useNavigate } from "react-router";

export default function PlanBasicsForm({ planId, setPlanId }) {
  const [formData, setFormData] = useState({
    month: "",
    day: "",
    year: "",
    destination: "",
    notes: "",
  });
  const [isEditing, setIsEditing] = useState(true); // starts in form mode
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      let plan;
      if (!planId) {
        // Create new plan
        plan = await planService.create(formData);
        setPlanId(plan._id);
        navigate(`/plans/${planId}`);
      } else {
        // Update existing plan
        plan = await planService.update(planId, formData);
      }
      setIsEditing(false); // Switch to card view
    } catch (err) {
      setErrorMsg("Saving Plan Failed");
    }
  }

  function handleEditClick() {
    setIsEditing(true); // Switch back to form view
  }

  return (
    <div className="divbody">
      <aside style={{ marginRight: "42px" }}>
        <h3>{planId ? "Your Plan" : "Create a Plan"}</h3>
      </aside>

      <main>Calendar</main>

      <div>
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            style={{
              height: "350px",
              marginLeft: "42px",
              width: "662px",
              display: "grid",
              gap: "1.2vmin",
              padding: "4vmin",
              border: "0.5vmin solid #1a1a1a",
              borderRadius: "1vmin",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <div>
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
              </div>

              <div>
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
              </div>

              <div>
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

            <button type="submit">{planId ? "Save" : "Create Plan"}</button>
          </form>
        ) : (
          <div>
            <h4>
              {formData.month} {formData.day}, {formData.year}
            </h4>
            <p>
              <strong>Destination:</strong> {formData.destination}
            </p>
            <p>
              <strong>Notes:</strong> {formData.notes}
            </p>
            <button onClick={handleEditClick}>Update</button>
          </div>
        )}

        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>

      <div style={{ height: "350px" }}>
        <img src="./calander.png" className="calander" alt="calendar" />
      </div>
    </div>
  );
}
