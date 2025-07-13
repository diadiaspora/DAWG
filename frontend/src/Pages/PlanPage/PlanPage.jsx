import { useState, useEffect, useRef } from "react";
import Header from "../../Components/Header/Header.jsx";
import PlanBasicsForm from "../../Components/PlanBasicsForm/PlanBasicsForm.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import PlanIndex from "../../Components/PlanIndex/PlanIndex.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import Marketplace from "../../Components/Marketplace/Marketplace.jsx";
import HotelComponent from "../../Components/HotelComponent/HotelComponent";
import UsersPlans from "../../Components/UsersPlans/UsersPlans";

import "./PlanPage.css";

export default function PlanPage({ user }) {
  const [planId, setPlanId] = useState(null);
  const klookRef = useRef(null);

  useEffect(() => {
    if (!klookRef.current) return;

    // Inject the ins tag HTML
    klookRef.current.innerHTML = `
      <ins class="klk-aff-widget" 
           data-wid="93395" 
           data-bgtype="Play" 
           data-adid="1085930" 
           data-lang="en" 
           data-prod="banner" 
           data-width="468" 
           data-height="60">
        <a href="//www.klook.com/?aid=">Klook.com</a>
      </ins>
    `;

    // Create and append the Klook script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://affiliate.klook.com/widget/fetch-iframe-init.js";
    klookRef.current.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (klookRef.current) {
        klookRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      <section className="plan">
        <Header />
        <SearchComponent />
        <div>
          <PlanBasicsForm planId={planId} setPlanId={setPlanId} />
        </div>
        {/* <div
          style={{
            backgroundColor: "#1E3769",
            width: "1012px",
            marginLeft: "42px",
            borderRadius: "7px",
            height: "75px",
            paddingTop: "10px",
            marginTop: "42px",
            paddingLeft:"42px"
          }}
          ref={klookRef}
        ></div> */}
        <div style={{ marginTop: "75px" }}>
          <HotelComponent />
        </div>
        <div style={{ marginTop: "100px" }}>
          <UsersPlans user={user} />
        </div>
        <div style={{marginTop: "-30px"}}>
          <Marketplace />
        </div>
        <Articles />
      </section>
    </>
  );
}
