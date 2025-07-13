import { useState, useEffect } from "react";
import { BiWorld } from "react-icons/bi";
import { IoMdCalendar } from "react-icons/io";

import * as planService from "../../services/planService";
import "./PlanBasicUpdate.css";

export default function PlanBasicUpdate({ plan, setPlan }) {
  const [showForm, setShowForm] = useState(plan ? false : true);

  const [formData, setFormData] = useState({
    month: plan?.month || "",
    day: plan?.day || "",
    year: plan?.year || "",
    destination: plan?.destination || "",
    notes: plan?.notes || "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {}, [plan])
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const updatedPlan = await planService.update(plan?._id, formData);
      setErrorMsg("");
      setShowForm(false);
      setPlan({ ...updatedPlan });
    } catch (err) {
      setErrorMsg("Failed to save plan details. Please try again.");
      console.error("Error updating plan:", err);
    }
  }


    const handleDeletePlan = async (planId) => {
      try {
        const deletedPlan = await planService.deletePlan(planId);
        if (deletedPlan.err) throw new Error(deletedPlan.err);
      
        setPlan(null);
       
      } catch (err) {
        console.log(err);
      }
    };
  
// boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)";
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "300px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "20px",
        borderColor: "#d9d9d9",
      }}
    >
      {showForm ? (
        <form
          onSubmit={handleSubmit}
          style={{
            width: "300px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "20px",
            height: "300px",
            border: "1px solid #e9e9e9",
            borderRadius: "7px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "14px", marginLeft: "0px" }}>
                Month
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                style={{ width: "100px", borderRadius: "7px", height: "38px" }}
              >
                <option value="" stylle={{}}>
                  Month
                </option>
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
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              style={{
                width: "60px",
                borderRadius: "7px",
                height: "38px",
                marginTop: "22px",
                marginLeft: "12px",
              }}
            >
              <option value="">Day</option>
              {[...Array(31).keys()].map((d) => (
                <option key={d + 1} value={d + 1}>
                  {d + 1}
                </option>
              ))}
            </select>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              style={{
                width: "60px",
                borderRadius: "7px",
                height: "38px",
                marginTop: "22px",
                marginLeft: "12px",
              }}
            >
              <option value="">Year</option>
              {[2025, 2026, 2027, 2028].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <label
            style={{
              fontSize: "14px",
              marginBottom: "-10px",
              marginLeft: "0px",
            }}
          >
            Destination
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            style={{ height: "38px", borderRadius: "7px", width: "250px" }}
          />

          <label
            style={{
              fontSize: "14px",
              marginBottom: "-12px",
              marginLeft: "0px",
            }}
          >
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={2}
            style={{ borderRadius: "7px", width: "250px" }}
          />
          <div style={{ marginBottom: "-6px" }}>
            <button
              onClick={() => handleDeletePlan(plan._id)}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "7px",
                width: "100px",
                borderWidth: "0px",
                marginLeft: "12px",
                color: "#1E3769",
                textDecoration: "underline",
              }}
            >
              Delete Plan
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "7px",
                width: "100px",
                borderWidth: "0px",
                marginLeft: "12px",
                color: "#1E3769",
                textDecoration: "underline",
              }}
            >
              Update Plan
            </button>
          </div>
        </form>
      ) : (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "7px",
            padding: "10px",
            height: "300px",
          }}
        >
          <div style={{ marginTop: "12px", display: "flex" }}>
            <BiWorld color="#4AA692" />
            <h3
              style={{
                fontSize: "24px",
                marginLeft: "8px",
                marginTop: "-10px",
              }}
            >
              {plan.destination}
            </h3>
          </div>

          <div style={{ display: "flex", marginTop: "-12px" }}>
            <IoMdCalendar color="#4AA692" />
            <p
              style={{ marginTop: "-4px", marginLeft: "8px", fontSize: "16px" }}
            >
              {plan.month} {plan.day} {plan.year}
            </p>
          </div>
          <div
            style={{
              width: "260px",
              borderRadius: "7px",
              height: "44px",
              backgroundColor: "#F2F4F7",
              border: "1px solid #BCC7D4",
              height: "100px",
            }}
          >
            <p style={{ marginLeft: "6px" }}> {plan.notes} </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "7px",
              width: "100px",
              borderWidth: "0px",
              marginLeft: "12px",
              color: "#1E3769",
              textDecoration: "underline",
            }}
          >
            Edit Plan
          </button>
        </div>
      )}
    </div>
  );
}
