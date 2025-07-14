import { useState, useRef} from "react";
import * as planService from "../../services/planService";
import { useNavigate, Link } from "react-router-dom";
import { IoMdCalendar } from "react-icons/io";
import Motel from "../../Components/Motel/Motel";

import "./PlanWhereForm.css"; 
export default function PlanWhereForm({ plan, setPlan }) {
  const [showForm, setShowForm] = useState(
    !(plan?.checkIn || plan?.checkOut || plan?.address)
  );
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
    console.log(plan);
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
          backgroundColor: "#1E3769",
          width: "1012px",
          borderRadius: "7px",
          paddingTop: "1px",
          paddingLeft: "42px",
          color: "#ffffff",
          marginLeft: "42px",
          height: "60px",
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
              border: "1px solid #e9e9e9",
              borderRadius: "7px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
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
              <div
                className="date-wrapper"
                style={{ display: "flex", flexDirection: "column" }}
              >
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
                    borderRadius: "7px",
                    height: "44px",
                    backgroundColor: "#F2F4F7",
                    border: "1px solid #BCC7D4",
                  }}
                />
                {/* <IoMdCalendar color="#4AA692" className="calendar-icon" /> */}
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
                    borderRadius: "7px",
                    height: "44px",
                    backgroundColor: "#F2F4F7",
                    border: "1px solid #BCC7D4",
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
                    borderRadius: "7px",
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
                  borderRadius: "7px",
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
                  borderRadius: "7px",
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
            <Motel />
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
              borderRadius: "7px",
              width: "662px",
              paddingLeft: "21px",
              paddingRight: "21px",
              paddingTop: "0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#d9d9d9",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h4
              style={{
                marginTop: "0px",
                fontSize: "20px",
                marginBottom: "0px",
              }}
            >
              Stay Details:
            </h4>
            <div style={{ display: "flex", marginTop: "-10px" }}>
              <div>
                <div>
                  <strong style={{ fontSize: "14px" }}>Check-In:</strong>
                </div>
                <div
                  style={{
                    width: "180px",
                    borderRadius: "7px",
                    height: "44px",
                    backgroundColor: "#ffffff",
                    border: "2px solid #1E3769",
                    marginLeft: "0px",
                    paddingLeft: "8px",
                    paddingTop: "8px",
                  }}
                >
                  {plan.checkIn
                    ? new Date(plan.checkIn).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "No dates added(Yet)"}
                </div>
              </div>
              <div>
                <div>
                  <strong style={{ fontSize: "14px", marginLeft: "16px" }}>
                    Check-Out:
                  </strong>
                </div>
                <div
                  style={{
                    width: "180px",
                    borderRadius: "7px",
                    height: "44px",
                    backgroundColor: "#fffffff",
                    border: "2px solid #1E3769",
                    marginLeft: "16px",
                    paddingLeft: "8px",
                    paddingTop: "8px",
                  }}
                >
                  {plan.checkOut
                    ? new Date(plan.checkOut).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "No dates added(Yet)"}
                </div>
              </div>
              <div>
                {/* Conditionally render View Receipt or "No Receipt" text */}
                {plan.receipt &&
                plan.receipt !== "https://i.imgur.com/KTEjbsw.png" ? (
                  <Link
                    to={`/plans/${plan._id}/receipt`} // Assuming plan._id is the ID you need for the route
                    style={{
                      backgroundColor: "#d9d9d9",
                      width: "190px",
                      marginTop: "10px",
                      color: "black",
                      height: "44px",
                      borderRadius: "7px",
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
                  <p
                    style={{
                      paddingTop: "20px",
                      color: "#666",
                      marginLeft: "16px",
                    }}
                  >
                    No receipt uploaded
                  </p>
                )}
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "-10px" }}>
              <div>
                <strong style={{ fontSize: "14px" }}>Address:</strong>{" "}
                <div
                  style={{
                    width: "590px",
                    borderRadius: "7px",
                    height: "90px",
                    border: "2px solid #1E3769",
                    marginLeft: "0px",
                    paddingLeft: "8px",
                    paddingTop: "8px",
                  }}
                >
                  {plan.address || "An address hasnt been added"}
                </div>
              </div>
            </div>

            {!plan.checkIn && !plan.checkOut && !plan.address && (
              <p style={{ marginTop: "-10px", marginBottom: "-10px" }}></p>
            )}
            <button
              onClick={() => setShowForm(true)}
              style={{
                height: "44px",
                borderRadius: "7px",
                borderWidth: "2px",
                backgroundColor: "#1E3769",
              }}
            >
              Edit
            </button>
          </div>
          <div>
            <div>
              <Motel />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
