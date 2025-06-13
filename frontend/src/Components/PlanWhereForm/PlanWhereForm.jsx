import { useState, useEffect } from "react";
import * as planService from "../../services/planService";

import "./PlanWhereForm.css"; // Ensure this CSS file exists and is correctly linked

export default function PlanWhereForm({ planId }) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    address: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchPlanData() {
      if (!planId) {
        setShowForm(false);
        setIsSubmitted(false);
        return;
      }

      try {
        const planData = await planService.show(planId);
       
        if (planData && (planData.checkIn || planData.checkOut || planData.address )) {
          setFormData({
            checkIn: planData.checkIn || "",
            checkOut: planData.checkOut || "",
            address: planData.address || "",
          });
          setIsSubmitted(true);
          setShowForm(false); 
        } else {
          setFormData({
            checkIn: "",
            checkOut: "",
            address: "",
          });
          setIsSubmitted(false);
          setShowForm(false); 
        }
      } catch (err) {
        console.error("Failed to fetch plan data for planId:", planId, err);
        setErrorMsg("Failed to load plan details.");
        setIsSubmitted(false);
        setShowForm(false); 
      }
    }
    fetchPlanData();
  }, [planId]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleToggle() {
    if (isSubmitted) {
      setShowForm(true); 
    } else {
      setShowForm((prev) => !prev); 
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await planService.update(planId, formData);
      setErrorMsg("");
      setIsSubmitted(true);
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

        <button onClick={handleToggle} style={{ height: "44px" }}>
          {isSubmitted
            ? "Update"
            : showForm
            ? "Hide Form"
            : "Add Stay Detaills"}
        </button>
      </aside>
      <main></main>{" "}
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
              backgroundColor: "white", 
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
                    borderRadius: "5px",
                    border: "1px solid #ccc",
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
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ alignSelf: "flex-end" }}>
                
                <button
                  type="button"
                  className="upload-btn"
                  style={{
                    padding: "8px 15px",
                    borderRadius: "50px",
                    border: "none",
                    backgroundColor: "#1E3769",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Upload Receipt
                </button>
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
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  resize: "vertical",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "50px",
                border: "none",
                backgroundColor: "#1E3769",
                color: "white",
                cursor: "pointer",
              }}
            >
              Save Stay Info
            </button>
            {errorMsg && <p className="error">{errorMsg}</p>}
          </form>

          <div
            className="companionGrayBox"
            style={{
              backgroundColor: "#D9D9D9",
              minHeight: "350px", 
              borderRadius: "1vmin",
              width: "350px", 
              padding: "4vmin",
              display: "flex",
              flexDirection: "column",
              gap: "1.5vmin",
            }}
          >
            <h4>Tips for Booking Stays</h4>
            <p>
              - Never agree to make an accomadation off of a secure platform.
            </p>
      
            <p>- Always Upload Recipts for easy access</p>
          </div>
        </div>
      ) : (
     
        isSubmitted && (
          <div
            className="planWhereCard"
            style={{
              marginLeft: "42px",
              backgroundColor: "#ffffff",
              minHeight: "350px", 
              borderRadius: "1vmin",
              width: "662px", 
              padding: "4vmin",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              borderStyle: "solid",
              borderWidth: "3px",
              borderColor: "#1E3769",
              marginTop: "42px",
            }}
          >
            <h4>Stay Details:</h4>
            <p>
              <strong>Check-In:</strong> {formData.checkIn || "N/A"}
            </p>
            <p>
              <strong>Check-Out:</strong> {formData.checkOut || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {formData.address || "N/A"}
            </p>
            {!formData.checkIn && !formData.checkOut && !formData.address && (
              <p>No location details entered yet.</p>
            )}
          </div>
        )
      )}
   
      {!isSubmitted && !showForm && (
        <p style={{ marginLeft: "42px", marginTop: "10px", color: "#666" }}></p>
      )}
    </div>
  );
}
