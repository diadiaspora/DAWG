import { useEffect, useRef } from "react";

export default function HotelSearch() {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://tpwidg.com/content?trs=428421&shmarker=639991&lang=www&layout=S4279&powered_by=true&campaign_id=121&promo_id=4038";
    script.async = true;
    script.charset = "utf-8";

    // Clear any previous scripts if the component is re-rendered
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "310px",
        padding: "12px",
        fontFamily: "sans-serif",
        marginTop: "-11px",
      }}
    />
  );
}
