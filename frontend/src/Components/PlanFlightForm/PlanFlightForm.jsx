import { useState, useEffect } from "react";
import * as planService from "../../services/planService";
import "./PlanFlightForm.css";

export default function PlanFlightForm({ planId }) {
  const [showForm, setShowForm] = useState(false); // Form is hidden by default
  const [isSubmitted, setIsSubmitted] = useState(false); // No data submitted yet
  const [formData, setFormData] = useState({
    airline: "",
    outboundFlightNumber: "",
    outboundDate: "",
    outboundDepartureTime: "",
    outboundArrivalTime: "",
    returnFlightNumber: "",
    returnDate: "",
    returnDepartureTime: "",
    returnArrivalTime: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  // Fetch existing flight data when component mounts or planId changes
  useEffect(() => {
    async function fetchFlightData() {
      if (!planId) {
        // If no planId, ensure form is hidden and not submitted
        setShowForm(false);
        setIsSubmitted(false);
        return;
      }

      try {
        const planData = await planService.get(planId);
        // console.log("Fetched planData:", planData); // Good for debugging

        if (planData && planData.flightDetails) {
          // If flightDetails exist, populate formData and show the card
          setFormData({
            airline: planData.flightDetails.airline || "",
            outboundFlightNumber:
              planData.flightDetails.outboundFlightNumber || "",
            outboundDate: planData.flightDetails.outboundDate || "",
            outboundDepartureTime:
              planData.flightDetails.outboundDepartureTime || "",
            outboundArrivalTime:
              planData.flightDetails.outboundArrivalTime || "",
            returnFlightNumber: planData.flightDetails.returnFlightNumber || "",
            returnDate: planData.flightDetails.returnDate || "",
            returnDepartureTime:
              planData.flightDetails.returnDepartureTime || "",
            returnArrivalTime: planData.flightDetails.returnArrivalTime || "",
          });
          setIsSubmitted(true); // Data exists, so consider it submitted
          setShowForm(false); // Show the card initially
        } else {
          // No existing flight details found for this plan.
          // Keep formData at its initial empty state.
          setFormData({
            airline: "",
            outboundFlightNumber: "",
            outboundDate: "",
            outboundDepartureTime: "",
            outboundArrivalTime: "",
            returnFlightNumber: "",
            returnDate: "",
            returnDepartureTime: "",
            returnArrivalTime: "",
          });
          setIsSubmitted(false); // No data, so not submitted
          setShowForm(false); // Ensure form is hidden, showing "Open Form" button
        }
      } catch (err) {
        console.error("Failed to fetch flight data for planId:", planId, err);
        setErrorMsg("Failed to load flight details. Please try again.");
        // If there's an error fetching, treat it as no data loaded yet
        setIsSubmitted(false);
        setShowForm(false); // Keep form hidden on initial load error
      }
    }
    fetchFlightData();
  }, [planId]); // Dependency array: re-run if planId changes

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleToggle() {
    // If data is submitted, clicking "Update" will show the form.
    // Otherwise, it's the initial "Open Form" / "Hide Form" toggle.
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
      setShowForm(false); 
    } catch (err) {
      console.error("Failed to save flight details in handleSubmit:", err);
      setErrorMsg("Failed to save flight details. Please try again.");
    }
  }

  return (
    <div style={{marginTop: "24px"}}>
      <aside
        style={{
          marginRight: "42px",
          backgroundColor: "#D9D9D9",
          width: "1012px",
          borderRadius: "10px",
          padding: "21px",
        }}
      >
        <h3>Flight Info</h3>
        <button onClick={handleToggle} style={{ height: "44px" }}>
          {isSubmitted
            ? "Update"
            : showForm
            ? "Hide Form"
            : "Add Flight Details"}
        </button>
      </aside>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          style={{
            height: "auto",
            marginLeft: "42px",
            marginRight: "42px",
            width: "1012px",
            display: "grid",
            gap: "1.2vmin",
            padding: "4vmin",
            border: "0.5vmin solid #1a1a1a",
            borderRadius: "1vmin",
          }}
        >
          <h3>Outbound Flight</h3>
          <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
            <label htmlFor="airline">Airline</label>
            <input
              type="text"
              id="airline"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
            />

            <label htmlFor="outboundFlightNumber">Flight Number</label>
            <input
              type="text"
              id="outboundFlightNumber"
              name="outboundFlightNumber"
              value={formData.outboundFlightNumber}
              onChange={handleChange}
            />
            <button type="button">Upload Ticket</button>
          </div>

          <div
            className="form-group"
            style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}
          >
            <label htmlFor="outboundDate">Date</label>
            <input
              type="date"
              id="outboundDate"
              name="outboundDate"
              value={formData.outboundDate}
              onChange={handleChange}
            />

            <label htmlFor="outboundDepartureTime">Departure Time</label>
            <input
              type="time"
              id="outboundDepartureTime"
              name="outboundDepartureTime"
              value={formData.outboundDepartureTime}
              onChange={handleChange}
            />

            <label htmlFor="outboundArrivalTime">Arrival Time</label>
            <input
              type="time"
              id="outboundArrivalTime"
              name="outboundArrivalTime"
              value={formData.outboundArrivalTime}
              onChange={handleChange}
            />
          </div>

          <h3>Return Flight</h3>
          <div
            className="form-group"
            style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}
          >
            <label htmlFor="returnFlightNumber">Flight Number</label>
            <input
              type="text"
              id="returnFlightNumber"
              name="returnFlightNumber"
              value={formData.returnFlightNumber}
              onChange={handleChange}
            />

            <label htmlFor="returnDate">Date</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
            />
          </div>

          <div
            className="form-group"
            style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}
          >
            <label htmlFor="returnDepartureTime">Departure Time</label>
            <input
              type="time"
              id="returnDepartureTime"
              name="returnDepartureTime"
              value={formData.returnDepartureTime}
              onChange={handleChange}
            />

            <label htmlFor="returnArrivalTime">Arrival Time</label>
            <input
              type="time"
              id="returnArrivalTime"
              name="returnArrivalTime"
              value={formData.returnArrivalTime}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Save Flight Info
          </button>
          {errorMsg && <p className="error">{errorMsg}</p>}
        </form>
      ) : (
        isSubmitted && (
          <div
            className="planFlightCard"
            style={{
              marginLeft: "42px",
              marginRight: "42px",
              backgroundColor: "#D9D9D9",
              width: "1012px",
              borderRadius: "1vmin",
              padding: "4vmin",
              display: "flex",
              flexDirection: "column",
              gap: "1.5vmin",
            }}
          >
            <h4>Flight Details:</h4>
            <div>
              <strong>Airline:</strong> {formData.airline || "N/A"}
            </div>
            <h4>Outbound:</h4>
            <div>
              <strong>Flight Number:</strong>{" "}
              {formData.outboundFlightNumber || "N/A"}
            </div>
            <div>
              <strong>Date:</strong> {formData.outboundDate || "N/A"}
            </div>
            <div>
              <strong>Departure Time:</strong>{" "}
              {formData.outboundDepartureTime || "N/A"}
            </div>
            <div>
              <strong>Arrival Time:</strong>{" "}
              {formData.outboundArrivalTime || "N/A"}
            </div>
            {formData.returnFlightNumber && (
              <>
                <h4>Return:</h4>
                <div>
                  <strong>Flight Number:</strong>{" "}
                  {formData.returnFlightNumber || "N/A"}
                </div>
                <div>
                  <strong>Date:</strong> {formData.returnDate || "N/A"}
                </div>
                <div>
                  <strong>Departure Time:</strong>{" "}
                  {formData.returnDepartureTime || "N/A"}
                </div>
                <div>
                  <strong>Arrival Time:</strong>{" "}
                  {formData.returnArrivalTime || "N/A"}
                </div>
              </>
            )}
            {!formData.airline &&
              !formData.outboundFlightNumber &&
              !formData.outboundDate &&
              !formData.returnFlightNumber && (
                <p>No flight details entered yet.</p>
              )}
          </div>
        )
      )}
      {/* Show a message if there's no data and the form is not showing */}
      {!isSubmitted && !showForm && (
        <p style={{ marginLeft: "42px", color: "#666" }}></p>
      )}
    </div>
  );
}
