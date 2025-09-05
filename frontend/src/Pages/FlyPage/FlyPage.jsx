import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import React, { useEffect, useRef } from "react";
import "./FlyPage.css";

export default function FlyPage({ user, setUser }) {
  const widgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&locale=en&powered_by=true&limit=4&primary_color=1E3769&results_background_color=FFFFFF&form_background_color=FFFFFF&border_radius=50&campaign_id=111&promo_id=3411";
    script.async = true;
    script.charset = "utf-8";

    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="home">
      {/* Consistent header + search */}
      <div className="page-container">
        <div className="header-wrapper">
          <Header user={user} setUser={setUser} />
        </div>
        <SearchComponent />
      </div>

      {/* Align widget with search */}
      <div className="wide">
        <main className="mainly">
          <div id="tp-widget" ref={widgetRef} className="fly-widget"></div>
        </main>
      </div>
    </section>
  );
}
