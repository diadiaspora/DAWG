import { useEffect, useRef } from "react";

export default function Map() {
  const widgetRef = useRef(null);

  useEffect(() => {

    if (widgetRef.current) {
      widgetRef.current.innerHTML = "";
    }

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&lat=51.51&lng=0.06&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=LON&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=true&primary=%231E3769&secondary=%231E3769&light=%23ffffff&width=1012&height=500&zoom=1&promo_id=4054&campaign_id=100";
    script.charset = "utf-8";

    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1012px",
        margin: "0 auto",
        padding: "16px",
      }}
    >
      <div ref={widgetRef} />
    </div>
  );
}
