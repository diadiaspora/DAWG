import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import React, { useEffect, useRef } from "react";

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
        widgetRef.current.innerHTML = ""; // Clean up on unmount
      }
    };
  }, []);

  return (
    <>
      <section style={{ marginTop: "16px", marginLeft: "5px" }}>
        <div style={{ marginLeft: "-2vw" }}>
          <Header user={user} setUser={setUser} />
        </div>

        <div
          id="tp-widget"
          ref={widgetRef}
          style={{
            marginTop: "9px",
            padding: "20px",
            backgroundColor: "#fff",
            borderStyle: "solid",
            borderColor: "#d9d9d9",
            borderRadius: "7px",
            width: "84.7vw",
            boxSizing: "border-box",
          }}
        ></div>
      </section>
    </>
  );
}
