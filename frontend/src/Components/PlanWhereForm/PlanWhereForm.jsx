import { useState, useEffect } from "react";
import * as planService from "../../services/planService";

import "./PlanWhereForm.css";

export default function PlanWhereForm({ planId }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: planId,
    checkIn: "",
    checkOut: "",
    address: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => { }, [planId]);
  
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value, id: planId }));
  }

  function handleToggle() {
    setShowForm((prev) => !prev);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setShowForm(false);
    try {
      await planService.update(formData);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg("Failed to save location details. Please try again.");
    }
  }

  return (
    <div style={{ marginTop: "-150px" }}>
      <aside
        style={{
          marginRight: "42px",
          backgroundColor: "#D9D9D9",
          width: "1012px",
          borderRadius: "10px",
        }}
      >
        <h3>Where Are You Staying?</h3>

        <button onClick={handleToggle} style={{ height: "44px" }}>
          {showForm ? "Hide Form" : "Open Form"}
        </button>
      </aside>

      <main></main>

      <div>
        {showForm && (
          <div className="planWhere" style={{ marginBottom: "-230px" }}>
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
                borderRadius: "1vmin"
         
              }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <label>Check-In</label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    style={{ width: "180px" }}
                  />
                </div>
                <div>
                  <label>Check-Out</label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    style={{ width: "180px" }}
                  />
                </div>
                <div>
                  <button type="button" className="upload-btn">
                    Upload Receipt
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="address">Address</label>
                <textarea
                  type="tex"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <button type="submit" className="submit-btn">
                Save Stay Info
              </button>
              {errorMsg && <p className="error">{errorMsg}</p>}
            </form>
            <div >
              <div
                style={{
                  backgroundColor: "#D9D9D9",
                  height: "350px",
                  borderRadius: "1vmin",
                  width: "350px"
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
