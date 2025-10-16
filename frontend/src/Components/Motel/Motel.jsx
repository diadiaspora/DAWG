import { useEffect, useRef } from "react";

export default function Motel() {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    widgetRef.current.innerHTML = ""; // Clear previous content

    const script = document.createElement("script");
    script.src =
      "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&destination=SJU&target_host=www.aviasales.com%2Fsearch&locale=en&limit=5&powered_by=false&primary=%231E3769&promo_id=4044&campaign_id=100";
    script.async = true;
    script.charset = "utf-8";

    widgetRef.current.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = ""; // Cleanup on unmount
      }
    };
  }, []);

  return (
    <div
      ref={widgetRef}
      style={{
        borderRadius: "7px",
        overflow: "hidden",
        width: "300px",
        maxWidth: "1012px",
        margin: "0 auto",
      }}
    />
  );
}
