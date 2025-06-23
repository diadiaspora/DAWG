import Header from "../../Components/Header/Header.jsx";
import PlanBasicsForm from "../../Components/PlanBasicsForm/PlanBasicsForm.jsx";

import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import PlanIndex from "../../Components/PlanIndex/PlanIndex.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import Marketplace from "../../Components/Marketplace/Marketplace.jsx";

import { useNavigate, NavLink } from "react-router";
import { useState, useEffect } from "react";

import "./PlanPage.css";

export default function PlanPage() {
  const [planId, setPlanId] = useState(null);

  useEffect(() => {}, [planId]);
  return (
    <>
      <section className="plan">
        <Header />
        <SearchComponent />
        <div >
          <PlanBasicsForm planId={planId} setPlanId={setPlanId} />
        </div>
        <div
          style={{
            backgroundColor: "#d9d9d9",
            width: "1012px",
            marginLeft: "42px",
            borderRadius: "7px",
            height: "75px",
            paddingTop: "10px",
            marginTop: "42px"
          }}
        >
          <PlanIndex />
        </div>

    
         <Marketplace /> 
        
        <Articles />
      </section>
    </>
  );
}
