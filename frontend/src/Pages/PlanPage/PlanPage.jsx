
import PlanBasicsForm from "../../Components/PlanBasicsForm/PlanBasicsForm.jsx";
import PlanWhereForm from "../../Components/PlanWhereForm/PlanWhereForm.jsx";
import PlanFlightForm from "../../Components/PlanFlightForm/PlanFlightForm.jsx";
import PlanScheduleForm from "../../Components/PlanScheduleForm/PlanScheduleForm.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import PlanIndex from "../../Components/PlanIndex/PlanIndex.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import Marketplace from "../../Components/Marketplace/Marketplace.jsx";

import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import "./PlanPage.css";

export default function PlanPage() {
  const [planId, setPlanId] = useState(null);
 
  useEffect(() => {}, [planId])
    return (
      <>
        <section className="plan">
          <SearchComponent />
          <PlanBasicsForm planId={planId} setPlanId={setPlanId} />
          <div
            style={{
              backgroundColor: "#d9d9d9",
              width: "1012px",
              marginLeft: "42px",
              borderRadius: "10px",
              height: "75px",
              paddingTop: "10px",
            }}
          >
            <PlanIndex />
          </div>

          <h3> Marketplace</h3>
          <Marketplace />
          <h3> Articles</h3>
          <Articles />
        </section>
      </>
    );
}
