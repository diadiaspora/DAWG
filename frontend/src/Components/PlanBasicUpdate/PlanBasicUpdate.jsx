import { useState, useEffect } from "react";
import * as planService from "../../services/planService";

import "./PlanBasicUpdate.css";

export default function PlanBasicUpdate({ plan }) {
  const [showForm, setShowForm] = useState(plan ? false : true);
    console.log(plan);
    console.log(showForm)
  const [formData, setFormData] = useState({
    month: plan?.month ? plan.month : "",
    day: plan?.day ? plan.day : "",
    year: plan?.year ? plan.year : "",
    destination: plan?.destination ? plan.destination : "",
    notes: plan?.notes ? plan.notes : "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    
    try {
      await planService.update(plan?._id, formData);
        setErrorMsg("");
        setShowForm(false);
    } catch (err) {
      setErrorMsg("Failed to save plan details. Please try again.");
      console.error("Error updating plan:", err);
    }
  }

  return (
    <>
      <div>
        <div className="planBox">
          {showForm ? (
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <label>Month</label>
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
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
                  >
                    <option value="">-- Select Year --</option>
                    {[2025, 2026, 2027, 2028].map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ marginLeft: "0px" }}>Destination</label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                />
              </div>
              <div>
                <button type="submit"> Update </button>
              </div>
            </form>
          ) : (
            <div
       
            >
              <h4 style={{ marginTop: "4px" }}>
                {plan.month} {plan.day}, {plan.year}
              </h4>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "-12px",
                  }}
                >
                  <div style={{ fontSize: "14px" }}>
                    <strong>Destination:</strong>
                  </div>
                  <div>{plan.destination}</div>
                </div>
                <div>
                  <p style={{ fontSize: "14px" }}>
                    <strong>Notes:</strong>
                    <div style={{ height: " 40px" }}>{plan.notes}</div>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowForm(true)}
                style={{ height: "44px" }}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
