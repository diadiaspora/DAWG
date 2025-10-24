import { useState, useEffect, useRef } from "react";
import Header from "../../Components/Header/Header.jsx";
import PlanBasicsForm from "../../Components/PlanBasicsForm/PlanBasicsForm.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Marketplace from "../../Components/Marketplace/Marketplace.jsx";
import MarketplaceMobile from "../../Components/MarketplaceMobile/MarketplaceMobile.jsx"; // import mobile version
import HotelComponent from "../../Components/HotelComponent/HotelComponent";
import UsersPlans from "../../Components/UsersPlans/UsersPlans";

import "./PlanPage.css";

export default function PlanPage({ user }) {
  const [planId, setPlanId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const klookRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!klookRef.current) return;

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

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://affiliate.klook.com/widget/fetch-iframe-init.js";
    klookRef.current.appendChild(script);

    return () => {
      if (klookRef.current) {
        klookRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      <section className="plan">
        <div className="plan-header">
          <Header />
        </div>
        <div className="plan-search">
          <SearchComponent />
        </div>
        <div>
          <div>
            <PlanBasicsForm planId={planId} setPlanId={setPlanId} />
          </div>
          <div className="klook-banner" ref={klookRef}></div>
          <div style={{ marginTop: "75px" }}>
            <HotelComponent />
          </div>
          <div style={{ marginTop: "100px" }}>
            <UsersPlans user={user} />
          </div>
          <div style={{ marginTop: "-30px", marginLeft: "42px" }}>
            {isMobile ? <MarketplaceMobile /> : <Marketplace />}
          </div>
        </div>
        {/* <Articles />  */}
      </section>
    </>
  );
}
