import { useState, useEffect } from "react";
import * as planService from "../../services/planService";
import { Link } from "react-router";
import { BiWorld } from "react-icons/bi";
import { IoMdCalendar } from "react-icons/io";

export default function UserPlans() {
  const [plans, setPlans] = useState([]);
  const [hoveredPlanId, setHoveredPlanId] = useState(null);

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
      <div
        style={{
          backgroundColor: "#1E3769",
          width: "1012px",
          display: "flex",
          borderRadius: "7px",
          height: "70px",
          alignItems: "baseline",
          marginBottom: "24px",
          padding: "12px",
        }}
      >
        <h1
          style={{
            fontSize: "18px",
            color: "#ffffff",
            marginTop: "10px",
            marginLeft: "21px",
            marginRight: "660px",
          }}
        >
          Upcoming Trips
        </h1>
        <button>Plan a New Trip</button>
      </div>

      {plans.length ? (
        <div
          style={{
            overflowX: "auto",
            paddingBottom: "16px",
            width: "1012px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <ul
            style={{
              display: "flex",
              gap: "16px",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "thin",
              scrollbarColor: "#1E3769 #f0f0f0",
              paddingBottom: "8px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {plans.map((plan) => (
              <li
                key={plan._id}
                style={{ flex: "0 0 auto", width: "300px" }}
                onMouseEnter={() => setHoveredPlanId(plan._id)}
                onMouseLeave={() => setHoveredPlanId(null)}
              >
                <Link
                  to={`${plan._id}`}
                  style={{
                    display: "block",
                    border:
                      hoveredPlanId === plan._id
                        ? "2px solid #4AA692"
                        : "1px solid #BCC7D4",

                    borderRadius: "7px",
                    padding: "16px",
                    scrollSnapAlign: "start",
                    backgroundColor:
                      hoveredPlanId === plan._id ? "#F2F4F7" : "#fff",
                    textDecoration: "none",
                    color: "inherit",
                    height: "180px",

                    transition: "background-color 0.3s ease",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <BiWorld color="#4AA692" />
                    <h3 style={{ marginLeft: "6px", marginTop: "-5px" }}>
                      {plan.destination}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      marginTop: "-12px",
                      alignItems: "center",
                    }}
                  >
                    <IoMdCalendar color="#4AA692" />
                    <p
                      style={{
                        fontSize: "14px",
                        marginLeft: "8px",
                        marginTop: "0",
                      }}
                    >
                      {plan.month} {plan.day}, {plan.year}
                    </p>
                  </div>

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
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>You haven’t created any plans yet.</p>
      )}
    </div>
  );
}
