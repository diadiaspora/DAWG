import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import * as planService from "../../services/planService";

export default function TicketPage() {
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
      <h1>Your Ticket</h1>
      <img src={plan.ticket} alt="Post Image" style={{ width: "400px" }} />
    </>
  );
}
