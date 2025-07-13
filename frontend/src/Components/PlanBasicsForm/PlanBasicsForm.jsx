import { useState } from "react";
import * as planService from "../../services/planService";
import "./PlanBasicForm.css";
import { useNavigate } from "react-router-dom";
import Calendar from "../Calendar/Calendar.jsx";


export default function PlanBasicsForm() {
  const [formData, setFormData] = useState({
    month: "",
    day: "",
    year: "",
    destination: "",
    notes: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const plan = await planService.create(formData);

      navigate(`/plans/${plan._id}`);
    } catch (err) {
      setErrorMsg("Saving Plan Failed");
    }
  }

  return (
    <div style={{ marginBottom: "0px", display: "flex" }}>
      <div>
        <h3 style={{ marginLeft: "42px", fontSize: "24px" }}>Create a Plan</h3>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            height: "320px",
            marginLeft: "42px",
            width: "662px",
            display: "grid",
            gap: "1.2vmin",
            padding: "4vmin",
            border: "1px solid #e9e9e9",
            borderRadius: "7px",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginLeft: "0px", width: "180px" }}>Month</label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                style={{
                  width: "150px",
                  borderRadius: "7px",
                  height: "44px",
                  backgroundColor: "#F2F4F7",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#BCC7D4",
                }}
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

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "-20px",
              }}
            >
              <label style={{ marginLeft: "0px" }}>Day</label>
              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                style={{
                  width: "70px",
                  borderRadius: "7px",
                  height: "44px",
                  backgroundColor: "#F2F4F7",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#BCC7D4",
                }}
              >
                <option value=""> Day </option>
                {[...Array(31).keys()].map((d) => (
                  <option key={d + 1} value={d + 1}>
                    {d + 1}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <label style={{ marginLeft: "0px" }}>Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                style={{
                  width: "100px",
                  borderRadius: "7px",
                  height: "44px",
                  backgroundColor: "#F2F4F7",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#BCC7D4",
                }}
              >
                <option value=""> Year </option>
                {[2025, 2026, 2027, 2028].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <label style={{ marginLeft: "0px" }}>Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                style={{
                  width: "195px",
                  borderRadius: "7px",
                  height: "44px",
                  backgroundColor: "#F2F4F7",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#BCC7D4",
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: "-22px" }}>
            <label style={{ marginLeft: "0px" }}>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              style={{
                width: "598px",
                borderRadius: "7px",
                backgroundColor: "#F2F4F7",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#BCC7D4",
              }}
            />
          </div>
          <div style={{ textAlign: "right", marginRight: "-43px" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#1E3769",
                height: "44px",
                borderRadius: "7px",
                borderWidth: "0px",
                color: "#ffffff",
                marginRight: "50px",
                width: "598px",
              }}
            >
              Create Plan
            </button>
          </div>
        </form>

        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>

      <div style={{ height: "350px", marginRight: "0px", marginLeft: "42px" }}>
        <Calendar />
      </div>
    </div>
  );
}
