import { useState, useEffect } from "react";
import * as planService from "../../services/planService";

import "./PlanWhereForm.css"; 
export default function PlanWhereForm({ plan, setPlan }) {
  const [showForm, setShowForm] = useState(plan? false : true);

  const [formData, setFormData] = useState({
    
    checkIn: plan.checkIn ? plan.checkIn : "",
    checkOut: plan.checkOut ? plan.checkOut : "",
    address: plan.address ? plan.address : "",
  });

  const [errorMsg, setErrorMsg] = useState("");


  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }


  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const plan = await planService.update(plan._id, formData);
      setErrorMsg("");
      setPlan(plan)
      setShowForm(false);
    } catch (err) {
      console.error("Failed to save location details:", err);
      setErrorMsg("Failed to save location details. Please try again.");
    }
  }

  return (
    <div style={{ marginTop: "42px" }}>
      <aside
        style={{
          marginRight: "42px",
          backgroundColor: "#D9D9D9",
          width: "1012px",
          borderRadius: "10px",
          padding: "21px",
        }}
      >
        <h3>Where Are You Staying?</h3>

      </aside>
      
      {showForm ? (
        <div
          className="planWhereFormContainer"
          style={{
            marginLeft: "42px",
            display: "grid",
            gridTemplateColumns: "662px 350px",
            gap: "20px",
            alignItems: "start",
            marginBottom: "20px",
            marginTop: "42px",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "4vmin",
              border: "0.5vmin solid #1a1a1a",
              borderRadius: "1vmin",
              backgroundColor: "#D9D9D9",
            }}
          >
            <h3>Stay Details</h3>
            <div
              style={{ display: "flex", gap: "10px", marginBottom: "1.2vmin" }}
            >
              <div>
                <label htmlFor="checkIn">Check-In</label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  style={{
                    width: "180px",
                    padding: "8px",
                    borderRadius: "50px",
                    border: "1px solid #red",
                  }}
                />
              </div>
              <div>
                <label htmlFor="checkOut">Check-Out</label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  style={{
                    width: "180px",
                    padding: "8px",
                    borderRadius: "50px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ alignSelf: "flex-end", color: "1E3769" }}>
      
              </div>
            </div>
            <div style={{ marginBottom: "1.2vmin" }}>
              <label htmlFor="address">Address</label>
              <textarea
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={4}
                style={{
                  width: "calc(100% - 16px)",
                  padding: "8px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  resize: "vertical",
                }}
              />
            </div>
            <div style={{ textAlign: "right" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  borderRadius: "50px",
                  border: "none",
                  backgroundColor: "#1E3769",
                  color: "white",
                  cursor: "pointer",
                  height: "44px",
                }}
              >
               Update
              </button>
            </div>
            {errorMsg && <p className="error">{errorMsg}</p>}
          </form>

          <div>
            <img
              src="../calander.png"
              alt="calander"
              style={{ width: "310px" }}
            ></img>
          </div>
        </div>
      ) : (
      
  
            <div
              className="planWhereFormContainer"
              style={{
                marginLeft: "42px",
                display: "grid",
                gridTemplateColumns: "662px 350px",
                gap: "20px",
                alignItems: "start",
                marginBottom: "20px",
                marginTop: "42px",
              }}
            >
              <div
                className="planWhereCard"
                style={{
                 
                  backgroundColor: "#ffffff",
                  minHeight: "350px",
                  borderRadius: "20px",
                  width: "662px",
                  paddingLeft: "21px",
                  paddingRight: "21px",
                  paddingTop: "0px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  borderStyle: "solid",
                  borderWidth: "3px",
                  borderColor: "#00000",
                 
                }}
              >
                <h4 style={{ marginTop: "-14px" }}>Stay Details:</h4>
                <div style={{ display: "flex", marginTop: "-60px" }}>
                  <div className="shadowSmall" style={{ borderRadius: "20px" }}>
                    <div>
                      <strong style={{ fontSize: "14px" }}>Check-In:</strong>
                    </div>
                    <div>
                      {plan.checkIn
                        ? new Date(plan.checkIn).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </div>
                  </div>
                  <div className="shadowSmall">
                    <div>
                      <strong style={{ fontSize: "14px" }}>Check-Out:</strong>
                    </div>
                    <div>
                      {plan.checkOut
                        ? new Date(plan.checkOut).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </div>
                  </div>
            
                </div>
                <div style={{ display: "flex" }}>
                  <div className="shadowLong">
                    <strong style={{ fontSize: "14px" }}>Address:</strong>{" "}
                    {plan.address || "N/A"}
                  </div>
                <button onClick={() => setShowForm(true)} style={{ height: "44px" }} >Edit </button> 
                </div>

                {!plan.checkIn &&
                  !plan.checkOut &&
                  !plan.address && <p>No location details entered yet.</p>}
              </div>
              <div>
                <div>
                  <img
                    src="../calander.png"
                    alt="calander"
                    style={{ width: "310px" }}
                  ></img>
                </div>
              </div>
            </div>
          
        // )
      )}
   
    </div>
  );
}
