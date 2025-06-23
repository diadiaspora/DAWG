import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as planService from "../../services/planService";

import "./PlanFlightForm.css";

export default function PlanFlightForm({ plan, setPlan }) {
  const [showForm, setShowForm] = useState(plan ? false : true); 

  const fileInputRef = useRef();
  
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
    returnDepartureTime: plan?.returnDepartureTime
      ? plan.returnDepartureTime
      : "",
    returnArrivalTime: plan?.returnArrivalTime ? plan.returnArrivalTime : "",
   
  });

  const [errorMsg, setErrorMsg] = useState("");



  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }




  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const planData = new FormData();

      console.log(fileInputRef.current.files);


      for (const key in formData) {
        planData.append(key, formData[key]);
      }

  
      if (fileInputRef.current.files.length > 0) {
        planData.append("ticket", fileInputRef.current.files[0]);
      }

 
      for (const pair of planData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const updatedPlan = await planService.update(plan._id, planData);
      setErrorMsg("");
      setPlan({ ...updatedPlan }); 
      setShowForm(false); 
    } catch (err) {
      console.error("Failed to save location details:", err);
      setErrorMsg("Failed to save location details. Please try again.");
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
            border: "1px solid #d9d9d9",
            borderRadius: "7px",
            marginTop: "42px",
            backgroundColor: "#d9d9d9",
          }}
        >
          <h3>Outbound Flight</h3>
          <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="airline">Airline</label>
              <input
                type="text"
                id="airline"
                name="airline"
                value={formData.airline}
                onChange={handleChange}
                style={{ height: "44px", borderRadius: "50px" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="outboundFlightNumber">Flight Number</label>
              <input
                type="text"
                id="outboundFlightNumber"
                name="outboundFlightNumber"
                value={formData.outboundFlightNumber}
                onChange={handleChange}
                style={{ height: "44px", borderRadius: "50px" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label type="button">Upload Ticket</label>
              <input
               
                name="ticket"
                type="file"
                accept=".png, .gif, .jpg, .jpeg"
                ref={fileInputRef}
                style={{ height: "44px", borderRadius: "50px" }}
              />
            </div>
          </div>

          <div
            className="form-group"
            style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="outboundDate">Date</label>
              <input
                type="date"
                id="outboundDate"
                name="outboundDate"
                value={formData.outboundDate}
                onChange={handleChange}
                style={{ height: "44px", borderRadius: "50px" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="outboundDepartureTime">Departure Time</label>
              <input
                type="text"
                id="outboundDepartureTime"
                name="outboundDepartureTime"
                value={formData.outboundDepartureTime}
                onChange={handleChange}
                style={{ height: "44px", borderRadius: "50px" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="outboundArrivalTime">Arrival Time</label>
              <input
                type="text"
                id="outboundArrivalTime"
                name="outboundArrivalTime"
                value={formData.outboundArrivalTime}
                onChange={handleChange}
                style={{ height: "44px", borderRadius: "50px" }}
              />
            </div>
          </div>

          <h3>Return Flight</h3>
          <div
            className="form-group"
            style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="returnFlightNumber">Flight Number</label>
              <input
                type="text"
                id="returnFlightNumber"
                name="returnFlightNumber"
                value={formData.returnFlightNumber}
                onChange={handleChange}
                style={{ height: "44px", borderRadius: "50px" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="returnDate">Date</label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                style={{ height: "44px", borderRadius: "7px" }}
              />
            </div>
          </div>

          <div
            className="form-group"
            style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="returnDepartureTime">Departure Time</label>
              <input
                type="text"
                id="returnDepartureTime"
                name="returnDepartureTime"
                value={formData.returnDepartureTime}
                onChange={handleChange}
                style={{ height: "44px", borderRadius: "7px" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="returnArrivalTime">Arrival Time</label>
              <input
                type="text"
                id="returnArrivalTime"
                name="returnArrivalTime"
                value={formData.returnArrivalTime}
                onChange={handleChange}
                style={{ height: "44px", borderRadius: "7px" }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "7px",
              border: "none",
              backgroundColor: "#1E3769",
              color: "white",
              cursor: "pointer",
              height: "44px",
         
              marginRight: "30px",
            }}
          >
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
            borderRadius: "7px",
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
            <Link
              to={`/plans/${plan._id}/ticket`}
              style={{
                backgroundColor: "#d9d9d9",
                width: "190px",
                marginTop: "10px",
                color: "black",
                height: "44px",
                borderRadius: "7px",
                borderWidth: "2px",
                borderColor: "#d9d9d9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              View Ticket
            </Link>
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
                <strong>Airline:</strong>
                {plan.airline || "N/A"}
              </div>
              <div className="shadowSmall">
                <strong style={{ fontSize: "14px" }}> Flight Number:</strong>

                {plan.outboundFlightNumber || "N/A"}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="shadowSmall">
                <strong>Date:</strong>{" "}
                {plan.outboundDate
                  ? new Date(plan.outboundDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </div>
              <div className="shadowSmall">
                <strong>Departure Time:</strong>
                {plan.outboundDepartureTime || "N/A"}
              </div>
              <div className="shadowSmall">
                <strong>Arrival Time:</strong>
                {plan.outboundArrivalTime || "N/A"}
              </div>
            </div>
          </div>

          <>
            <h4>Inbound:</h4>
            <div
              style={{
                borderStyle: "solid",
                borderColor: "#d9d9d9",
                borderRadius: "7px",
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
                    ? new Date(plan.returnDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </div>
                <div className="shadowSmall">
                  <strong>DepartTime:</strong>{" "}
                  {plan.returnDepartureTime || "N/A"}
                </div>
                <div className="shadowSmall">
                  <strong>ArrivTime:</strong> {plan.returnArrivalTime || "N/A"}
                </div>
              </div>
            </div>
          </>

          {!plan.airline &&
            !plan.outboundFlightNumber &&
            !plan.outboundDate &&
            !plan.returnFlightNumber && <p>No flight details entered yet.</p>}
          <button
            onClick={() => setShowForm(true)}
            style={{
              height: "44px",
              backgroundColor: "#1E3769",
              borderWidth: "2px",
              borderColor: "#1E3769",
              borderRadius: "50px",
            }}
          >
            {" "}
            Edit{" "}
          </button>
        </div>
      )}
    </div>
  );
}
