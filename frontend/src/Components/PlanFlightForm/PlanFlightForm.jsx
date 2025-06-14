import { useState, useEffect } from "react";
import * as planService from "../../services/planService";
import "./PlanFlightForm.css";

export default function PlanFlightForm({ plan }) {
  const [showForm, setShowForm] = useState(plan ? false : true); // Form is hidden by default
  
  const [formData, setFormData] = useState({
    airline: plan?.airline ? plan.airline : "",
    outboundFlightNumber: plan?.outboundFlightNumber
      ? plan.outboundFlightNumber
      : "",
    outboundDate: plan?.outboundDate ? plan.outboundDate : "",
    outboundDepartureTime: plan?.outboundDepartureTime
      ? plan.outboundDepartureTime
      : "",
    outboundArrivalTime: plan?.outboundArrivalTime
      ? plan.outboundArrivalTime
      : "",
    returnFlightNumber: plan?.returnFlightNumber ? plan.returnFlightNumber : "",
    returnDate: plan?.returnDate ? plan.returnDate : "",
    returnDepartureTime: plan?.returnDepartureTime ? plan.returnDepartureTime : "",
    returnArrivalTime: plan?.returnArrivalTime ? plan.returnArrivalTime :"",
  });

  const [errorMsg, setErrorMsg] = useState("");

  
  //   async function fetchFlightData() {
  //     if (!planId) {
  //       // If no planId, ensure form is hidden and not submitted
  //       setShowForm(false);
  //       setIsSubmitted(false);
  //       return;
  //     }

  //     try {
  //       const planData = await planService.show(planId);
        

  //       if (
  //         planData &&
  //         (planData.airline ||
  //           planData.outboundFlightNumber ||
  //           planData.outboundDepartureTime ||
  //           planData.outboundArrivalTime ||
  //           planData.returnFlightNumber ||
  //           planData.returnDepartureTime ||
  //           planData.returnArrivalTime))
  //       {
  //         setFormData({
  //           airline: planData.airline || "",

  //           outboundFlightNumber: planData.outboundFlightNumber || "",

  //           outboundDate: planData.outboundDate || "",

  //           outboundDepartureTime: planData.outboundDepartureTime || "",

  //           outboundArrivalTime: planData.outboundArrivalTime || "",

  //           returnFlightNumber: planData.returnFlightNumber || "",

  //           returnDate: planData.returnDate || "",

  //           returnDepartureTime: planData.returnDepartureTime || "",
  //           returnArrivalTime: planData.returnArrivalTime || "",
  //         });
  //         setIsSubmitted(true); // Data exists, so consider it submitted
  //         setShowForm(false); // Show the card initially
  //       } else {
  //         // No existing flight details found for this plan.
  //         // Keep formData at its initial empty state.
  //         setFormData({
  //           airline: "",
  //           outboundFlightNumber: "",
  //           outboundDate: "",
  //           outboundDepartureTime: "",
  //           outboundArrivalTime: "",
  //           returnFlightNumber: "",
  //           returnDate: "",
  //           returnDepartureTime: "",
  //           returnArrivalTime: "",
  //         });
  //         setIsSubmitted(false); // No data, so not submitted
  //         setShowForm(false); // Ensure form is hidden, showing "Open Form" button
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch flight data for planId:", planId, err);
  //       setErrorMsg("Failed to load flight details. Please try again.");
  //       // If there's an error fetching, treat it as no data loaded yet
  //       setIsSubmitted(false);
  //       setShowForm(false); // Keep form hidden on initial load error
  //     }
  //   }
  //   fetchFlightData();
  // }, [planId]); // Dependency array: re-run if planId changes

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // function handleToggle() {
  //   // If data is submitted, clicking "Update" will show the form.
  //   // Otherwise, it's the initial "Open Form" / "Hide Form" toggle.
  //   if (isSubmitted) {
  //     setShowForm(true); // If submitted, "Update" button always opens form
  //   } else {
  //     setShowForm((prev) => !prev); // Otherwise, toggle show/hide form
  //   }
  // }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await planService.update(plan._id, formData);
      setErrorMsg("");
      // setIsSubmitted(true); 
      setShowForm(false); 
    } catch (err) {
      console.error("Failed to save flight details in handleSubmit:", err);
      setErrorMsg("Failed to save flight details. Please try again.");
    }
  }

  return (
    <div style={{ marginTop: "24px" }}>
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
            borderRadius: "20px",
            marginTop: "42px",
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
              type="text"
              id="outboundDepartureTime"
              name="outboundDepartureTime"
              value={formData.outboundDepartureTime}
              onChange={handleChange}
            />

            <label htmlFor="outboundArrivalTime">Arrival Time</label>
            <input
              type="text"
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
              type="text"
              id="returnDepartureTime"
              name="returnDepartureTime"
              value={formData.returnDepartureTime}
              onChange={handleChange}
            />

            <label htmlFor="returnArrivalTime">Arrival Time</label>
            <input
              type="text"
              id="returnArrivalTime"
              name="returnArrivalTime"
              value={formData.returnArrivalTime}
              onChange={handleChange}
            />
          </div>

          <button type="submit">
            Update
          </button>
          {errorMsg && <p className="error">{errorMsg}</p>}
        </form>
      ) : (
        // isSubmitted && (
        <div
          className="planFlightCard"
          style={{
            marginLeft: "42px",
            marginRight: "42px",
            backgroundColor: "#ffffff",
            width: "1012px",
            borderRadius: "20px",
            padding: "4vmin",
            display: "flex",
            flexDirection: "column",
            gap: "1.5vmin",
            marginTop: "42px",
            borderStyle: "solid",
            borderWidth: "3px",
          }}
        >
          <div style={{ display: "flex" }}>
            <h4>Flight Details</h4>
            <button style={{ height: "44px" }}> Upload Ticket</button>
          </div>
          <h4>Outbound:</h4>
          <div
            style={{
              borderStyle: "solid",
              borderColor: "#d9d9d9",
              borderRadius: "20px",
              padding: "12px",
            }}
          >
            <div style={{ display: "flex" }}>
              <div className="shadowSmall">
                <div>
                  <strong style={{ fontSize: "14px" }}>Airline:</strong>
                </div>
                <div>{plan.airline || "N/A"}</div>
              </div>
              <div className="shadowSmall">
                <div>
                  <strong style={{ fontSize: "14px" }}> Flight Number:</strong>
                </div>
                <div>{plan.outboundFlightNumber || "N/A"}</div>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="shadowSmall">
                <strong>Date:</strong>{" "}
                {plan.outboundDate
                  ? new Date(plan.outboundDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "N/A"}
              </div>
              <div className="shadowSmall">
                <strong>Departure Time:</strong>{" "}
                {plan.outboundDepartureTime || "N/A"}
              </div>
              <div className="shadowSmall">
                <strong>Arrival Time:</strong>{" "}
                {plan.outboundArrivalTime || "N/A"}
              </div>
            </div>
          </div>
          {plan.returnFlightNumber && (
            <>
              <h4>Inbound:</h4>
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "#d9d9d9",
                  borderRadius: "20px",
                  padding: "12px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div className="shadowSmall">
                    <div>
                      <strong style={{ fontSize: "14px" }}>Airline:</strong>
                    </div>
                    <div>{plan.airline || "N/A"}</div>
                  </div>
                  <div className="shadowSmall">
                    <div>
                      <strong style={{ fontSize: "14px" }}>
                        {" "}
                        Flight Number:
                      </strong>
                    </div>
                    <div>{plan.returnFlightNumber || "N/A"}</div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="shadowSmall">
                    <strong>Date:</strong>{" "}
                    {plan.returnDate
                      ? new Date(plan.returnDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </div>
                  <div className="shadowSmall">
                    <strong>Departure Time:</strong>{" "}
                    {plan.returnDepartureTime || "N/A"}
                  </div>
                  <div className="shadowSmall">
                    <strong>Arrival Time:</strong>{" "}
                    {plan.returnArrivalTime || "N/A"}
                  </div>
                </div>
              </div>
       
            </>
          )}
          {!plan.airline &&
            !plan.outboundFlightNumber &&
            !plan.outboundDate &&
            !plan.returnFlightNumber && (
              <p>No flight details entered yet.</p>
            )}
          <button onClick={() => setShowForm(true)}> Edit </button>
        </div>
      )}
    </div>
  );
}
