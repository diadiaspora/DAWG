import { useState } from "react";
import * as planService from "../../services/planService";
import "./PlanBasicForm.css";
import { useNavigate } from "react-router-dom";



export default function PlanBasicsForm() {
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
      
     
        const plan = await planService.create(formData);
   
        navigate(`/plans/${plan._id}`);
   

    } catch (err) {
      setErrorMsg("Saving Plan Failed");
    }
  }

 

  return (
    <div className="divbody" style={{ marginBottom: "-230px" }}>
      <aside style={{ marginRight: "42px" }}>
        <h3>Create a Plan</h3>
      </aside>

      <main>Calendar</main>

      <div>
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
            borderRadius: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginLeft: "0px", width: "180px" }}>Month</label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                style={{ width: "150px", borderRadius: "50px" }}
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
                style={{ width: "70px", borderRadius: "50px" }}
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
                style={{ width: "100px", borderRadius: "50px" }}
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
                style={{ width: "208px", borderRadius: "50px" }}
              />
            </div>
          </div>
          <div>
            <label style={{ marginLeft: "0px" }}>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              style={{ width: "598px", borderRadius: "20px" }}
            />
          </div>
          <div style={{ textAlign: "right", marginRight: "-43px" }}>
            <button type="submit"
              style={{
                backgroundColor: "#1E3769",
                height: "44px",
                borderRadius: "50px",
                borderWidth: "0px",
                color: "#ffffff",
                marginRight: "50px",
                width: "598px"
              }}>
              Create Plan
            </button>
          </div>
        </form>

        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>

      <div>
        <img src="./calander.png" className="calander" alt="calendar" />
      </div>
    </div>
  );
}
