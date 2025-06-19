import { useState, useRef} from "react";
import * as planService from "../../services/planService";
import { useNavigate, Link } from "react-router-dom";

import "./PlanWhereForm.css"; 
export default function PlanWhereForm({ plan, setPlan }) {
  const [showForm, setShowForm] = useState(plan ? false : true);
  const navigate = useNavigate();

  const fileInputRef = useRef();

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
      const planData = new FormData();

      console.log(fileInputRef.current.files);


      for (const key in formData) {
        planData.append(key, formData[key]);
      }

  
      if (fileInputRef.current.files.length > 0) {
        planData.append("receipt", fileInputRef.current.files[0]);
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
              borderRadius: "20px",
              backgroundColor: "#D9D9D9",
            }}
          >
            <div>
              <p style={{ fontWeight: "bold", marginTop: "-6px" }}>
                Stay Details
              </p>
            </div>
            <div
              style={{ display: "flex", gap: "10px", marginBottom: "1.2vmin" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="checkIn" style={{ margin: "0px" }}>
                  Check-In
                </label>
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
                    border: "1px solid #000000",
                    height: "44px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "21px",
                }}
              >
                <label htmlFor="checkOut" style={{ margin: "0px" }}>
                  Check-Out
                </label>
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
                    border: "1px solid #000000",
                    height: "44px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "21px",
                }}
              >
                <label style={{ margin: "0px" }}>Upload Receipt</label>
                <input
                  style={{
                    borderRadius: "50px",
                    padding: "10px",
                    height: "44px",
                    width: "150px",
                  }}
                  name="receipt"
                  type="file"
                  accept=".png, .gif, .jpg, .jpeg"
                  ref={fileInputRef}
                />
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
                  width: "588px",
                  marginRight: "30px",
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
            <h4 style={{ marginTop: "-14px", fontSize: "24px" }}>
              Stay Details:
            </h4>
            <div style={{ display: "flex", marginTop: "-60px" }}>
              <div className="shadowSmall" style={{ borderRadius: "20px" }}>
                <div>
                  <strong style={{ fontSize: "14px" }}>Check-In:</strong>
                </div>
                <div>
                  {plan.checkIn
                    ? new Date(plan.checkIn).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </div>
              </div>
              <div className="shadowSmall">
                <div>
                  <strong style={{ fontSize: "14px" }}>Check-Out:</strong>
                </div>
                <div>
                  {plan.checkOut
                    ? new Date(plan.checkOut).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </div>
              </div>
              <div>
                {/* Conditionally render View Receipt or "No Receipt" text */}
                {plan.receipt &&
                plan.receipt !== "https://i.imgur.com/KTEjbsw.png" ? (
                  // <button
                  //   onClick={() => window.open(plan.receipt, "_blank")} // Open in new tab
                  //   style={{
                  //     backgroundColor: "#d9d9d9",
                  //     width: "190px",
                  //     marginTop: "10px",
                  //     color: "black",
                  //     height: "44px",
                  //     borderRadius: "50px",
                  //     borderWidth: "2px",
                  //     borderColor: "#d9d9d9",
                  //   }}
                  // >
                  //   View Receipt
                  // </button>
                  <Link
                    to={`/plans/${plan._id}/receipt`} // Assuming plan._id is the ID you need for the route
                    style={{
                      backgroundColor: "#d9d9d9",
                      width: "190px",
                      marginTop: "10px",
                      color: "black",
                      height: "44px",
                      borderRadius: "50px",
                      borderWidth: "2px",
                      borderColor: "#d9d9d9",
                      display: "flex", // To apply button styles to the Link
                      justifyContent: "center", // Center text if needed
                      alignItems: "center", // Center text if needed
                      textDecoration: "none", // Remove underline from Link
                    }}
                  >
                    View Receipt
                  </Link>
                ) : (
                  <p style={{ marginTop: "10px", color: "#666" }}>
                    No receipt uploaded
                  </p>
                )}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="shadowLong" style={{ width: "690px" }}>
                <strong style={{ fontSize: "14px" }}>Address:</strong>{" "}
                {plan.address || "N/A"}
              </div>
            </div>

            {!plan.checkIn && !plan.checkOut && !plan.address && (
              <p style={{ marginTop: "-10px", marginBottom: "-10px" }}>
                No location details entered yet.
              </p>
            )}
            <button
              onClick={() => setShowForm(true)}
              style={{
                height: "44px",
                borderRadius: "50px",
                borderWidth: "2px",
                backgroundColor: "#1E3769",
              }}
            >
              Edit{" "}
            </button>
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
      )}
    </div>
  );
}
