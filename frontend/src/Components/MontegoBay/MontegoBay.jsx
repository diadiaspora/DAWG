import { useEffect, useRef } from "react";

export default function MontegoBay() {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    widgetRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&destination=MBJ&target_host=www.aviasales.com%2Fsearch&locale=en&limit=5&powered_by=true&primary=%231E3769&promo_id=4044&campaign_id=100";
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
        width: "100%",
        maxWidth: "300px",
        margin: "0 auto",
      }}
    />
  );
}
