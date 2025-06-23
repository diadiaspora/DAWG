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
      <section style={{ width: "100%" }}>
        {/* <Header user={user} setUser={setUser} />
        <SearchComponent /> */}

        <div
          id="tp-widget"
          ref={widgetRef}
          style={{
            minHeight: "300px",
            margin: "40px auto",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "50px",
          }}
        >
   
        </div>
      </section>
    </>
  );
}
