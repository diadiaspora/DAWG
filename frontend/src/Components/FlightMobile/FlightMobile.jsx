import { useEffect, useState } from "react";
import "./FlightMobile.css";

export default function FlightMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const container = document.getElementById("flight-widget-container");
      if (container && container.children.length === 0) {
        const script = document.createElement("script");
        script.src =
          "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=7&plain=true&color_button=%231E3769&color_button_text=%23ffffff&promo_id=3414&campaign_id=111";
        script.async = true;
        script.charset = "utf-8";
        container.appendChild(script);
      }
    }
  }, [isMobile]);

  return isMobile ? (
    <section
      id="flight-widget-container"
      style={{
        width: "100%", // Widget width container
        transform: "scale(0.85)", // Scale widget to fit mobile
        transformOrigin: "top left",
        marginLeft: "-304px", // Adjust as needed
        overflow: "hidden",
      }}
    />
  ) : null;
}
