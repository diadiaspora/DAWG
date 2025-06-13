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
      <h1>Plans</h1>
      {plans.length ? (
        <ul>
          {plans.map((plan) => (
            <Link to={`${plan._id}`}>
              <li key={plan._id}>
                {plan.destination} {plan.month} {plan.day}
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No Plans. Create Some!</p>
      )}
    </>
  );
}
  
