import { useEffect, useRef, useState } from "react";

export default function HotelComponent() {
  const widgetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480); // or use 768 if you want to hide on tablets too
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile && widgetRef.current) {
      const script = document.createElement("script");
      script.src =
        "https://tpwidg.com/content?trs=428421&shmarker=639991&lang=www&layout=S606230&powered_by=true&campaign_id=121&promo_id=4038";
      script.async = true;
      script.charset = "utf-8";

      widgetRef.current.innerHTML = ""; // Clear anything that might be in there
      widgetRef.current.appendChild(script);
    }
  }, [isMobile]);

  if (isMobile) return null; // Don't render anything on mobile

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
