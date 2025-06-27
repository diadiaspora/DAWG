import React, { useEffect, useRef } from "react";

export default function SearchFlights() {
  const widgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=0&plain=true&color_button=%231E3769&color_button_text=%23ffffff&promo_id=3414&campaign_id=111";
    script.async = true;
    script.charset = "utf-8";

    if (widgetRef.current) {
      widgetRef.current.innerHTML = ""; // Clean old widget if any
      widgetRef.current.appendChild(script);
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = ""; // Clean up on unmount
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
          maxWidth: "960px",
          minHeight: "600px",
          
        }}
      >
        {/* Widget will be injected here */}
      </div>
    </section>
  );
}
