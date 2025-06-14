import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as planService from "../../services/planService";
import PlanWhereForm from "../../Components/PlanWhereForm/PlanWhereForm.jsx";
import PlanFlightForm from "../../Components/PlanFlightForm/PlanFlightForm.jsx";
import PlanBasicUpdate from "../../Components/PlanBasicUpdate/PlanBasicUpdate.jsx";

import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Carousel from "../../Components/Carousel/Carousel.jsx";
import "./ShowPlanPage.css";

export default function ShowPlanPage() {
  const { id } = useParams();
  
  const [plan, setPlan] = useState({});
  const [planId, setPlanId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchPlan() {
      try {
        const planData = await planService.show(id);
        setPlan(planData);
      } catch (err) {}
    }
    fetchPlan();
  }, [plan]);

  return (
    <>
      <SearchComponent />

      <div
        style={{
          marginLeft: "0px",
          width: "1012px",
          border: "solid",
          padding: "21px",
          borderRadius: "20px",
          borderWidth: "3px",
        }}
      >
        <h1 style={{ textAlign: "left", marginTop: "-4px" }}>The Plan</h1>

        <div style={{ display: "flex" }}>
          <div>{plan && <PlanBasicUpdate plan={plan} />}</div>
          <div style={{ marginLeft: "100px", marginTop: "-18px" }}>
            <Carousel />
          </div>
        </div>
      </div>

      {plan && <PlanWhereForm plan={plan} setPlan={setPlan} />}
      {plan && <PlanFlightForm plan={plan} />}
    </>
  );
}
