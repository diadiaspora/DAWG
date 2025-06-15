import { useState, useEffect } from "react";
import * as planService from "../../services/planService";
import { Link } from "react-router";

export default function PlanIndex({isGallery}) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      const plans = await planService.index();
      if (isGallery) {
        setPlans([plans[0]])
      } else {
        setPlans(plans);
      }
      
    }
    fetchPlans();
  }, []);

  return (
    <>
      {plans.length ? (
        <ul style={{ display: "flex", listStyle: "none" }}>
          {plans.map((plan) => (
            <li key={plan._id}>
              <Link
                to={`${plan._id}`}
                style={{
                  backgroundColor: "#1E3769",
                  padding: "8px",
                  borderRadius: "50px",
                  color: "#ffffff",
                  textDecoration: "none",
                  marginRight: "16px"
                }}
              >
                {plan.destination} {plan.month} {plan.day}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Plans. Create Some!</p>
      )}
    </>
  );
}
  
