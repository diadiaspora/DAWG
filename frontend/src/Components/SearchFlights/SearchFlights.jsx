import React, { useEffect, useRef } from "react";

export default function SearchFlights() {
  const widgetRef = useRef(null);

  useEffect(() => {
    // TEMPORARY: FOR DIAGNOSIS ONLY! This will ALWAYS load the mobile widget.
    const isMobile = true; // <--- CHANGE THIS LINE!

    const script = document.createElement("script");
    let scriptUrl = "";

    if (isMobile) {
      scriptUrl =
        "https://tpwidg.com/content?trs=428421&shmarker=639991&locale=en&curr=USD&powered_by=true&border_radius=7&plain=true&color_button=%231E3769&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121&responsive=true";
    } else {
      scriptUrl =
        "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=7&plain=true&color_button=%231E3769&color_button_text=%23ffffff&promo_id=3414&campaign_id=111&responsive=true";
    }

    // ... rest of your useEffect code ...
    script.src = scriptUrl;
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
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 0",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        ref={widgetRef}
        id="kiwi-widget"
        style={{
          width: "100%",
          maxWidth: "1262px",
        }}
      ></div>
    </section>
  );
}
