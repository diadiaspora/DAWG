import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import * as planService from "../../services/planService";

export default function ReceiptPage() {
  const [plan, setPlan] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPlans() {
      const plan = await planService.show(id);
      setPlan(plan);
    }
    fetchPlans();
  }, []);

  return (
    <>
      <h1>Your Recipt</h1>
      <img src={plan.receipt} alt="Post Image" style={{ width: "400px" }} />
    </>
  );
}
