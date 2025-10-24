import { useEffect, useRef } from "react";

export default function MapSmall() {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.innerHTML = "";
    }

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&lat=40.7143528&lng=-74.0059731&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=NYC&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=true&primary=%231E3769&secondary=%231E3769&light=%23ffffff&width=290&height=350&zoom=1&promo_id=4054&campaign_id=100";
    script.charset = "utf-8";

    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        width: "290px",
        height: "350px",
        overflow: "hidden",
        borderRadius: "8px",
        margin: "0 auto",
      }}
    >
      <div ref={widgetRef} />
    </div>
  );
}
