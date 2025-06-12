import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as planService from "../../services/planService";
import PlanWhereForm from "../../Components/PlanWhereForm/PlanWhereForm.jsx";
import PlanFlightForm from "../../Components/PlanFlightForm/PlanFlightForm.jsx";
import PlanScheduleForm from "../../Components/PlanScheduleForm/PlanScheduleForm.jsx";

export default function ShowPlanPage() {
  const { id } = useParams();

  const [plan, setPlan] = useState({});
  const [planId, setPlanId] = useState(null);

  useEffect(() => {}, [planId]);

  useEffect(() => {
    async function fetchPlan() {
      const plan = await planService.show(id);

      setPlan(plan);
    }
    fetchPlan();
  }, []);

  async function handleEditClick(evt) {
    evt.preventDefault();
    setShowForm(false);
    try {
      await planService.update(planId, formData);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg("Failed to save location details. Please try again.");
    }
  }

  return (
    <>
      <h1>The Plan</h1>
      <div>
        <div>
          <h4>
            {plan.month} {plan.day}, {plan.year}
          </h4>
          <p>
            <strong>Destination:</strong> {plan.destination}
          </p>
          <p>
            <strong>Notes:</strong> {plan.notes}
          </p>
          <button onClick={handleEditClick}>Update</button>
        </div>
      </div>
      <PlanWhereForm planId={planId} />
      <PlanFlightForm planId={planId} />
      <PlanScheduleForm planId={planId} />
    </>
  );
}
