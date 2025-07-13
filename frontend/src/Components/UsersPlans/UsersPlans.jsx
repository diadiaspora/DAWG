import { useState, useEffect } from "react";
import * as planService from "../../services/planService";
import { Link } from "react-router-dom";
import { BiWorld } from "react-icons/bi";
import { IoMdCalendar } from "react-icons/io";



export default function UserPlans() {
  const [plans, setPlans] = useState([]);
  const [hover, setHover] = useState(false);

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
            marginleft: "21px",
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
                <div style={{ display: "flex" }}>
                  <div>
                    <BiWorld color="#4AA692" />
                  </div>
                  <div>
                    <h3 style={{ marginLeft: "6px", marginTop: "-5px" }}>
                      {plan.destination}
                    </h3>
                  </div>
                </div>
                <div style={{display: "flex", marginTop: "-12px"}}>
                <IoMdCalendar color="#4AA692" />

                <p style={{fontSize: "14px", marginLeft: "8px", marginTop: "0px"}}>
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
              </div>
            ))}
            <div
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
              Add a New Trip:
              <Link to="/plans">
                <button>Start Planning </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>You haven’t created any plans yet.</p>
      )}
    </div>
  );
}
