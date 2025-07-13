import { useEffect, useRef } from "react";

export default function Motel() {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    widgetRef.current.innerHTML = ""; // Clear container

    const script = document.createElement("script");
    script.src =
      "https://tpwidg.com/content?trs=428421&shmarker=639991&lang=www&layout=S4279&powered_by=true&campaign_id=121&promo_id=4038";
    script.async = true;
    script.charset = "utf-8";

    widgetRef.current.appendChild(script);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = ""; // Clean up on unmount
      }
    };
  }, []);

  return (
    <div
      ref={widgetRef}
      style={{
        borderRadius: "7px",
        overflow: "hidden",
      }}
    />
  );
}
