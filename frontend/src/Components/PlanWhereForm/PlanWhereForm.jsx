import { useState, useEffect } from "react";
import * as planService from "../../services/planService";

import "./PlanWhereForm.css"; // Ensure this CSS file exists and is correctly linked

export default function PlanWhereForm({ planId }) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
        const planData = await planService.get(planId);
        // Assuming planData.checkIn indicates existing data
        if (planData && planData.checkIn) {
          setFormData({
            checkIn: planData.checkIn || "",
            checkOut: planData.checkOut || "",
            address: planData.address || "",
          });
          setIsSubmitted(true);
          setShowForm(false); // Show the card initially if data exists
        } else {
          setFormData({
            checkIn: "",
            checkOut: "",
            address: "",
          });
          setIsSubmitted(false);
          setShowForm(false); // Ensure form is hidden, showing "Open Form" button
        }
      } catch (err) {
        console.error("Failed to fetch plan data for planId:", planId, err);
        setErrorMsg("Failed to load plan details.");
        setIsSubmitted(false);
        setShowForm(false); // Keep form hidden on initial load error
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
      setShowForm(true); // If submitted, "Update" button always opens form
    } else {
      setShowForm((prev) => !prev); // Otherwise, toggle show/hide form
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await planService.update(planId, formData);
      setErrorMsg("");
      setIsSubmitted(true);
      setShowForm(false); // Hide the form and show the card
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
          padding: "21px"
        }}
      >
        <h3>Where Are You Staying?</h3>

        <button onClick={handleToggle} style={{ height: "44px" }}>
          {isSubmitted ? "Update" : showForm ? "Hide Form" : "Add Stay Detaills"}
        </button>
      </aside>
      <main></main>{" "}

      {showForm ? (

        <div
          className="planWhereFormContainer" // New class for this grid container
          style={{
            marginLeft: "42px",
            display: "grid",
            gridTemplateColumns: "662px 350px", // Form width and Card width
            gap: "20px", // Space between form and card
            alignItems: "start", // Align items to the top of their grid cell
            marginBottom: "20px", // Add some bottom margin for spacing
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              // Removed fixed height here, let content dictate height
              padding: "4vmin",
              border: "0.5vmin solid #1a1a1a",
              borderRadius: "1vmin",
              backgroundColor: "white", // Added a background for the form itself
            }}
          >
            <h3>Stay Details</h3> {/* Added a heading for the form */}
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
                {" "}
                {/* Aligned button to bottom */}
                <button
                  type="button"
                  className="upload-btn"
                  style={{
                    padding: "8px 15px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#007bff",
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
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#28a745",
                color: "white",
                cursor: "pointer",
              }}
            >
              Save Stay Info
            </button>
            {errorMsg && <p className="error">{errorMsg}</p>}
          </form>

          {/* The companion grey box/card to the right of the form */}
          <div
            className="companionGrayBox"
            style={{
              backgroundColor: "#D9D9D9",
              minHeight: "350px", // Use min-height so it expands with content, or sets a minimum
              borderRadius: "1vmin",
              width: "350px", // Explicitly set width as per grid column
              padding: "4vmin",
              display: "flex",
              flexDirection: "column",
              gap: "1.5vmin",
            }}
          >
            <h4>Additional Information</h4>
            <p>
              This is where you can add extra details or notes about the stay.
              For example, nearby attractions, special requests, or local tips.
            </p>
            {/* You can add more text or content here */}
            <p>Feel free to customize this area as needed!</p>
          </div>
        </div>
      ) : (
        // When showForm is false, render only the submitted data card (if submitted)
        isSubmitted && (
          <div
            className="planWhereCard"
            style={{
              marginLeft: "42px",
              backgroundColor: "#D9D9D9",
              minHeight: "350px", // Use min-height
              borderRadius: "1vmin",
              width: "662px", // This card's width matches the form's column when it's solo
              padding: "4vmin",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
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
      {/* Optional: Message when no data and form is hidden */}
      {!isSubmitted && !showForm && (
        <p style={{ marginLeft: "42px", marginTop: "10px", color: "#666" }}>
      
        </p>
      )}
    </div>
  );
}
