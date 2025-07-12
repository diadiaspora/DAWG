import Header from "../../Components/Header/Header.jsx";
import PlanBasicsForm from "../../Components/PlanBasicsForm/PlanBasicsForm.jsx";
import Advertisement from "../../Components/Advertisement/Advertisement.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import PlanIndex from "../../Components/PlanIndex/PlanIndex.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import Marketplace from "../../Components/Marketplace/Marketplace.jsx";

import { useNavigate, NavLink } from "react-router";
import { useState, useEffect, useRef } from "react";

import "./PlanPage.css";

export default function PlanPage() {
  const [planId, setPlanId] = useState(null);
  // const klookRef = useRef(null);

  useEffect(() => { }, [planId]);
  
  // useEffect(() => {
  //   // Inject the script
  //   const script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.async = true;
  //   script.src = "https://affiliate.klook.com/widget/fetch-iframe-init.js";
  //   document.body.appendChild(script);

  //   // Insert the ins tag
  //   if (klookRef.current) {
  //     klookRef.current.innerHTML = `
  //       <ins class="klk-aff-widget" data-wid="93395" data-bgtype="Hotel" data-adid="1085833" data-lang="en" data-prod="banner" data-width="728" data-height="90">
  //         <a href="//www.klook.com/?aid=">Klook.com</a>
  //       </ins>
  //     `;
  //   }
  // }, []);

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
      {/* <Advertisement /> */}
    
         <Marketplace /> 
        
        <Articles />
      </section>
    </>
  );
}
