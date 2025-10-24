import { useEffect, useRef } from "react";
import "./Destinations.css";

export default function Destinations() {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    widgetRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&locale=en&powered_by=true&limit=3&primary_color=00AE98&results_background_color=FFFFFF&form_background_color=FFFFFF&promo_id=4563&campaign_id=111";
    script.async = true;
    script.charset = "utf-8";

    widgetRef.current.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={widgetRef}
      style={{
        borderRadius: "7px",
        overflow: "hidden",
        maxWidth: "100%",
        width: "100%",
        boxSizing: "border-box",
        minHeight: "300px",
      }}
    />
  );
}
