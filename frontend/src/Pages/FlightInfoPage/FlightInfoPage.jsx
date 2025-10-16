import React, { useEffect, useRef } from "react";
import "./FlightInfoPage.css";

export default function FlightInfoPage() {
  const widgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&powered_by=true&locale=en&show_header=true&limit=5&primary_color=1E3769&results_background_color=FFFFFF&form_background_color=FFFFFF&campaign_id=111&promo_id=4478";
    script.async = true;
    script.charset = "utf-8";

    if (widgetRef.current) {
      widgetRef.current.innerHTML = "";
      widgetRef.current.appendChild(script);
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="flight-info">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Featured Flight Deals
      </h2>
      <div
        ref={widgetRef}
        id="kiwi-results-widget"
        className="container"
      >
        </div>

    </section>
  );
}
