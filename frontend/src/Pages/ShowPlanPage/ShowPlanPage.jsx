import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as planService from "../../services/planService";
import PlanWhereForm from "../../Components/PlanWhereForm/PlanWhereForm.jsx";
import PlanFlightForm from "../../Components/PlanFlightForm/PlanFlightForm.jsx";
import PlanScheduleForm from "../../Components/PlanScheduleForm/PlanScheduleForm.jsx";
import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Carousel from "../../Components/Carousel/Carousel.jsx";

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
      <Header />
      <SearchComponent />
      <div style={{ marginLeft: "0px", width: "1012px", border: "solid", padding: "21px", borderRadius: "10px", borderWidth: "3px"}}>
        <h1 style={{ textAlign: "left" }}>The Plan</h1>
        <div>
          <div style={{ display: "flex" }}>
            <div>
              <h4>
                {plan.month} {plan.day}, {plan.year}
              </h4>
              <p>
                <strong>Notes:</strong> {plan.notes}
              </p>
              <p>
                <strong>Destination:</strong> {plan.destination}
              </p>
              <button onClick={handleEditClick}>Update</button>
            </div>

            <div style={{ marginLeft: "100px" }}>
              <Carousel
             
              />
            </div>
          </div>
        </div>
      </div>
      <PlanWhereForm planId={id} />
      <PlanFlightForm planId={id} />
      <PlanScheduleForm planId={id} />
    </>
  );
}
