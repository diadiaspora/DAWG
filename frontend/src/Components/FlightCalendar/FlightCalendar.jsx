import { useEffect, useRef } from "react";

export default function FlightCalendar() {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.innerHTML = ""; // Clear previous script if any
    }

    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src =
      "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&destination=MEX&target_host=www.aviasales.com%2Fsearch&locale=en&limit=10&powered_by=true&primary=%230085FF&promo_id=4044&campaign_id=100";

    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
      
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      <div ref={widgetRef} />
    </div>
  );
}
