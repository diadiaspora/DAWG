import React, { useEffect, useRef } from "react";

export default function SearchFlights() {
  const widgetRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 480;
    const script = document.createElement("script");

    script.src = isMobile
      ? "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=7&plain=true&color_button=%231E3769&color_button_text=%23ffffff&promo_id=3414&campaign_id=111&device=mobile"
      : "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=7&plain=true&color_button=%231E3769&color_button_text=%23ffffff&promo_id=3414&campaign_id=111";

    script.async = true;
    script.charset = "utf-8";

    console.log("Injecting script:", script.src); // 👈 DEBUG

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
  

  useEffect(() => {
    const loadWidget = () => {
      const isMobile = window.innerWidth <= 480;

      const script = document.createElement("script");
      script.src = isMobile
        ? "https://tpwidg.com/content?...&device=mobile"
        : "https://tpwidg.com/content?...";
      script.async = true;
      script.charset = "utf-8";

      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
        widgetRef.current.appendChild(script);
      }
    };

    loadWidget();

    window.addEventListener("resize", loadWidget);
    return () => window.removeEventListener("resize", loadWidget);
  }, []);
  

  <style>
    {`
    @media (max-width: 480px) {
      #kiwi-widget {
        width: 100% !important;
        min-height: 400px !important;
      }
    }
  `}
  </style>;

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
          minHeight: "600px",
        }}
      ></div>
    </section>
  );
}
