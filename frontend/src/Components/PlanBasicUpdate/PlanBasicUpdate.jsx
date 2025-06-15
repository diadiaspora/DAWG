import { useState } from "react";
import * as planService from "../../services/planService";
import "./PlanBasicUpdate.css";

export default function PlanBasicUpdate({ plan }) {
  const [showForm, setShowForm] = useState(plan ? false : true);

  const [formData, setFormData] = useState({
    month: plan?.month || "",
    day: plan?.day || "",
    year: plan?.year || "",
    destination: plan?.destination || "",
    notes: plan?.notes || "",
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
// boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)";
  return (
    <div
      style={{
        width: "300px",
        borderStyle: "solid",
        borderWidth: "3px",
        borderRadius: "20px",
        borderColor: "#000000",
      }}
    >
      {showForm ? (
        <form
          onSubmit={handleSubmit}
          style={{
            width: "300px",

            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "10px",
            height: "300px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "14px", marginLeft: "0px" }}>
                Month
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                style={{ width: "100px" }}
              >
                <option value="" stylle={{}}>
                  Month
                </option>
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
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              style={{ width: "60px" }}
            >
              <option value="">Day</option>
              {[...Array(31).keys()].map((d) => (
                <option key={d + 1} value={d + 1}>
                  {d + 1}
                </option>
              ))}
            </select>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              style={{ width: "60px" }}
            >
              <option value="">Year</option>
              {[2025, 2026, 2027, 2028].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <label
            style={{
              fontSize: "14px",
              marginBottom: "-10px",
              marginLeft: "0px",
            }}
          >
            Destination
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          />

          <label style={{ fontSize: "14px" }}>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={2}
          />

          <button type="submit">Update</button>
        </form>
      ) : (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "10px",
            height: "300px",
          }}
        >
          <div className="shadowMedium" style={{ marginTop: "12px" }}>
            <strong>Date:</strong>
            <h4 style={{ marginTop: "4px", fontSize: "24px" }}>
              {plan.month} {plan.day} {plan.year}
            </h4>
          </div>

          <div className="shadowMedium">
            <strong>Destination:</strong>
            <h3 style={{ fontSize: "24px", marginTop: "-4px" }}>
              {plan.destination}
            </h3>
          </div>

          <button
            onClick={() => setShowForm(true)}
            style={{
              height: "44px",
              marginTop: "10px",
              width: "270px",
              borderRadius: "50px",
              marginTop: "24px",
              backgroundColor: "#1E3769",
              borderWidth: "0"
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
