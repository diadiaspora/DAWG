
import PlanBasicsForm from "../../Components/PlanBasicsForm/PlanBasicsForm.jsx";

import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import PlanIndex from "../../Components/PlanIndex/PlanIndex.jsx";
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
          <PlanIndex planId={planId} />
       
          <h3> Your Documents</h3>
          <h3> Your Services</h3>
          <h3> Weather</h3>
          <h3> Community</h3>
          <h3> Marketplace</h3>
          <h3> Articles</h3>
        </section>
      </>
    );
}
