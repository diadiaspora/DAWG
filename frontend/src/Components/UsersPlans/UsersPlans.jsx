import { useState, useEffect } from "react";
import * as planService from "../../services/planService";

export default function UserPlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const data = await planService.getUserPlans();
        setPlans(data);
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    }

    fetchPlans();
  }, []);

  return (
    <div style={{ marginLeft: "42px", marginTop: "42px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
        Your Travel Plans
      </h2>
      {plans.length ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
          {plans.map((plan) => (
            <div
              key={plan._id}
              style={{
                width: "300px",
                border: "1px solid #BCC7D4",
                borderRadius: "10px",
                padding: "16px",
                backgroundColor: "#F9F9F9",
              }}
            >
              <h3 style={{ color: "#1E3769", marginBottom: "8px" }}>
                {plan.destination}
              </h3>
              <p>
                <strong>Date:</strong> {plan.month} {plan.day}, {plan.year}
              </p>
              {plan.notes && (
                <p
                  style={{ marginTop: "8px", fontSize: "14px", color: "#555" }}
                >
                  {plan.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>You haven’t created any plans yet.</p>
      )}
    </div>
  );
}
