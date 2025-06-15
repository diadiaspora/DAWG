import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as planService from "../../services/planService";
import PlanWhereForm from "../../Components/PlanWhereForm/PlanWhereForm.jsx";
import PlanFlightForm from "../../Components/PlanFlightForm/PlanFlightForm.jsx";
import PlanBasicUpdate from "../../Components/PlanBasicUpdate/PlanBasicUpdate.jsx";
import Header from "../../Components/Header/Header.jsx";
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
      <section className="plan">
        <Header />
        <SearchComponent />

        <div
          style={{
            marginLeft: "42px",
            width: "1012px",
            border: "solid",
            padding: "21px",
            borderRadius: "20px",
            borderWidth: "3px",
            marginRight: "0px"
          }}
        >
          <h1 style={{ textAlign: "left", marginTop: "-4px" }}>The Plan</h1>

          <div style={{ display: "flex" }}>
            <div>{plan && <PlanBasicUpdate plan={plan} />}</div>
            <div style={{ marginLeft: "42px", marginTop: "0px" }}>
              <Carousel />
              <div
                style={{
                  borderStyle: "solid",
                  borderColor: "black",
                  borderWidth: "3px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "20px",
                  marginTop: "14px",
                  height: "90px",
                }}
              >
                <div
                  style={{
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    padding: "8px",
                    borderRadius: "20px",
                    marginLeft: "14px",
                    marginRight: "14px",
                    marginTop: "6px"
                  }}
                >
                  <strong style={{ marginLeft: "8px", marginTop: "16px" }}>
                    {" "}
                    Notes:
                  </strong>{" "}
                  <p style={{ marginLeft: "6px" }}> {plan.notes} </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {plan && <PlanWhereForm plan={plan} setPlan={setPlan} />}
        {plan && <PlanFlightForm plan={plan} />}
      </section>
    </>
  );
}
