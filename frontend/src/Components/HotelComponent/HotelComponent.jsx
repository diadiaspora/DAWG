import { useEffect, useRef } from "react";

export default function HotelComponent() {
  const widgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://tpwidg.com/content?trs=428421&shmarker=639991&lang=www&layout=S606230&powered_by=true&campaign_id=121&promo_id=4038";
    script.async = true;
    script.charset = "utf-8";

    if (widgetRef.current) {
      widgetRef.current.innerHTML = ""; // Clear anything that might be in there
      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        marginLeft: "42px",
        width: "1012px",
        backgroundColor: "#1E3769",
        padding: "24px",
        borderRadius: "8px",
        display: "flex",
              justifyContent: "center",
        
      }}
    >
      <div
        ref={widgetRef}
              style={{
            
          borderRadius: "7px",
          overflow: "hidden",
         
        }}
      />
    </div>
  );
}
