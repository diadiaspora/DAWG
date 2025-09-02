import { useEffect, useRef, useState } from "react";

export default function SearchFlights() {
  const widgetRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    const scriptUrl =
      "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=7&plain=true&color_button=%231E3769&color_button_text=%23ffffff&promo_id=3414&campaign_id=111&responsive=true";

    script.src = scriptUrl;
    script.async = true;
    script.charset = "utf-8";

    script.onload = () => setLoading(false);
    script.onerror = () => {
      setLoading(false);
      console.error("Failed to load flight widget script");
    };

    if (widgetRef.current) {
      widgetRef.current.innerHTML = "";
      widgetRef.current.appendChild(script);
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "42px",
        paddingBottom: "16px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          width: "1012px",
          minHeight: "177px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              backgroundColor: "rgba(249,249,249,0.9)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              width: "100%",
            }}
          >
            <div
              style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #1E3769",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                animation: "spin 1s linear infinite",
              }}
            ></div>
          </div>
        )}

        <div
          ref={widgetRef}
          id="kiwi-widget"
          style={{
            width: "100%",
          }}
        ></div>
      </div>

      {/* Spinner animation keyframes */}
      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
      </style>
    </section>
  );
}
