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
        // Outer scroll container
        <div
          style={{
            overflowX: "auto",
            paddingBottom: "16px",
            width: "500px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Horizontal scrollable row */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "thin",
              scrollbarColor: "#1E3769 #f0f0f0",
              paddingBottom: "8px",
            }}
          >
            {plans.map((plan) => (
              <div
                key={plan._id}
                style={{
                  flex: "0 0 auto",
                  width: "300px",
                  border: "1px solid #BCC7D4",
                  borderRadius: "8px",
                  padding: "16px",
                  scrollSnapAlign: "start",
                  backgroundColor: "#fff",
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
                    style={{
                      marginTop: "8px",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    {plan.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>You haven’t created any plans yet.</p>
      )}
    </div>
  );
}
