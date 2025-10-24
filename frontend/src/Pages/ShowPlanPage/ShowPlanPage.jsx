import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import * as planService from "../../services/planService";
import PlanWhereForm from "../../Components/PlanWhereForm/PlanWhereForm.jsx";
import PlanFlightForm from "../../Components/PlanFlightForm/PlanFlightForm.jsx";
import PlanBasicUpdate from "../../Components/PlanBasicUpdate/PlanBasicUpdate.jsx";
import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import UserCarousel from "../../Components/UserCarousel/UserCarousel.jsx";
import "./ShowPlanPage.css";

export default function ShowPlanPage({user, profile}) {

  const { id } = useParams();
  
  const [plan, setPlan] = useState(null);
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
  }, [id]);

  useEffect(
    () => {
      console.log("planUpdated");
    }, [plan]
  );

  if (!plan) {
    return <div> loading...</div>
  }

  return (
    <>
      <section className="plan">
        <Header />
        <SearchComponent />

        <div
          style={{
            marginLeft: "42px",
            width: "1012px",

            padding: "21px",
            borderRadius: "7px",

            marginRight: "0px",
            border: "1px solid #e9e9e9",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              {plan && <PlanBasicUpdate plan={plan} setPlan={setPlan} />}
            </div>
            <div style={{ marginLeft: "42px", marginTop: "0px", width: "632px" }}>
              <UserCarousel user={user} profile={profile} style={{ width: "632px" }} />
            </div>
          </div>
        </div>

        {plan && <PlanWhereForm plan={plan} setPlan={setPlan} />}
        {plan && <PlanFlightForm plan={plan} setPlan={setPlan} />}
      </section>
    </>
  );
}
