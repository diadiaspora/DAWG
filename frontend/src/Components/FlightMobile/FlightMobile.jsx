import { useEffect, useState } from "react";
import "./FlightMobile.css";

export default function FlightMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && document.getElementById("tp-widget-script") == null) {
      const script = document.createElement("script");
      script.src =
        "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=7&plain=true&color_button=%231E3769&color_button_text=%23ffffff&promo_id=3414&campaign_id=111";
      script.async = true;
      script.charset = "utf-8";
      script.id = "tp-widget-script";

      const container = document.getElementById("tp-widget-wrapper");
      if (container) container.appendChild(script);
    }
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <section
      id="tp-widget-wrapper"
      style={{
        width: "85vw", // full viewport width
        height: "100vh", // full viewport height
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
        margin: "0",
          boxSizing: "border-box",
        // marginLeft: "-500px"
      }}
    />
  );
}
