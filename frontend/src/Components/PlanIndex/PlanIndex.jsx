import { useState, useEffect } from "react";
import * as postService from "../../services/planService";

export default function PostIndex() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      const plans = await planService.index();
      setPlans(plans);
    }
    fetchPlans();
  }, []);

  return (
    <>
      <h1>Plans</h1>
      {plans.length ? (
        <ul>
          {plans.map((plan) => (
            <li key={plan._id}>{plan.destination}</li>
          ))}
        </ul>
      ) : (
        <p>No Plans. Create Some!</p>
      )}
    </>
  );
}
  
