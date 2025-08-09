import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();

  // Update isMobile state on resize
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  }

  // Handler for the mobile native date input
  function handleDateChange(evt) {
    const date = evt.target.value; // format: "YYYY-MM-DD"
    if (!date) {
      setFormData({
        month: "",
        day: "",
        year: "",
        destination: formData.destination,
        notes: formData.notes,
      });
      return;
    }
    const [year, month, day] = date.split("-");
    setFormData({
      ...formData,
      year,
      month: new Date(year, month - 1).toLocaleString("default", {
        month: "long",
      }),
      day,
    });
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
    <div
      className="plan-containter"
      style={{ marginBottom: "0px", display: "flex" }}
    >
      <div>
        <div
          className="bluehead"
    
        >
          <h3
            style={{ marginLeft: "42px", fontSize: "24px", color: "#ffffff" }}
          >
            Create a Plan
          </h3>
        </div>
        <form
          className="formula"
          onSubmit={handleSubmit}
          style={{ height: isMobile ? "auto" : "320px" }}
        >
          <div className="destination" >
            {isMobile ? (
              // Mobile: show a single date input
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <label style={{ marginLeft: "0px" }}>Date</label>
                <input
                  type="date"
                  onChange={handleDateChange}
                  style={{
                    borderRadius: "7px",
                    height: "44px",
                    backgroundColor: "#F2F4F7",
                    border: "1px solid #BCC7D4",
                    padding: "0 10px",
                    width: "300px",
                    marginLeft: "12px"
                  }}
                />
              </div>
             ) : (
              // Desktop: show Month, Day, Year dropdowns
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginLeft: "0px", width: "180px" }}>
                    Month
                  </label>
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    style={{
                      width: "150px",
                      borderRadius: "7px",
                      height: "44px",
                      backgroundColor: "#F2F4F7",
                      border: "1px solid #BCC7D4",
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
              </>
             )}

            
             <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: isMobile ? "10px" : "10px",
                flexGrow: 1,
              }}
             >
              <label style={{ marginLeft: "0px" }}>Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="destiny"
        
              />
            </div>
          </div>

          {/* Only show Notes if NOT mobile */}
          {!isMobile && (
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
          )}

          <div style={{ textAlign: "right", marginRight: "-43px" }}>
            <button type="submit" className="create-plan">
              Create Plan
            </button>
          </div>
        </form>

        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>

      <div
        className="calendar-wrapper"
        style={{ height: "350px", marginRight: "0px", marginLeft: "42px" }}
      >
        <Calendar />
      </div>
    </div>
  );
}
