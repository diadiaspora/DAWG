import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function FlightInfoPage() {
  const widgetRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Parse query params from the search form (matching SearchFlights' output)
    const searchParams = new URLSearchParams(location.search);
    const origin = searchParams.get("origin") || "";
    const destination = searchParams.get("destination") || "";
    const departureDate = searchParams.get("departureDate") || "";
    const returnDate = searchParams.get("returnDate") || "";
    const adults = searchParams.get("adults") || "1";

    // Build Aviasales widget URL
    // IMPORTANT: Removed 'target_host' to prevent redirection
    // Using 'origin' and 'destination' directly as per Aviasales example
    const widgetUrl = `https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&color_button=%23FF0000&locale=en&powered_by=true&origin=${origin}&destination=${destination}&depart_date=${departureDate}&return_date=${returnDate}&adults=${adults}&with_fallback=false&non_direct_flights=true&min_lines=5&border_radius=0&color_background=%23FFFFFF&color_text=%23000000&color_border=%23FFFFFF&promo_id=2811&campaign_id=100`;

    const script = document.createElement("script");
    script.src = widgetUrl;
    script.async = true;
    script.charset = "utf-8";

    if (widgetRef.current) {
      widgetRef.current.innerHTML = ""; // Clear previous content
      widgetRef.current.appendChild(script);
    }

    // Cleanup function: remove the script if the component unmounts
    return () => {
      if (widgetRef.current) widgetRef.current.innerHTML = "";
    };
  }, [location.search]); // Re-run effect if URL search params change

  return (
    <div style={{ padding: "40px 20px" }}>
      <h2 style={{ textAlign: "center", color: "#1E3769" }}>Flight Results</h2>
      <div
        id="tp-widget" // The ID where the Aviasales widget will be injected
        ref={widgetRef}
        style={{ minHeight: "300px", marginTop: "30px" }}
      >
        <p>Loading flight deals...</p>
      </div>
    </div>
  );
}
