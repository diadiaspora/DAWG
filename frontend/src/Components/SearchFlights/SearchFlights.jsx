import React, { useEffect, useRef } from "react";

export default function SearchFlights() {
  const widgetRef = useRef(null);

  useEffect(() => {
    // Define the breakpoint for mobile (e.g., 480px, adjust as needed)
    const isMobile = window.innerWidth <= 480;
    console.log("Is Mobile:", isMobile, "Window Width:", window.innerWidth); // ADD THIS LINE

    const script = document.createElement("script");
    let scriptUrl = "";

    if (isMobile) {
      // Mobile Widget (promo_id=4132) - Make sure to add &responsive=true!
      scriptUrl =
        "https://tpwidg.com/content?trs=428421&shmarker=639991&locale=en&curr=USD&powered_by=true&border_radius=7&plain=true&color_button=%231E3769&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121&responsive=true";
    } else {
      // Desktop Widget (promo_id=3414) - Keep &responsive=true here as well
      scriptUrl =
        "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=7&plain=true&color_button=%231E3769&color_button_text=%23ffffff&promo_id=3414&campaign_id=111&responsive=true";
    }

    script.src = scriptUrl;
    script.async = true;
    script.charset = "utf-8";

    if (widgetRef.current) {
      widgetRef.current.innerHTML = ""; // Clear existing content
      widgetRef.current.appendChild(script);
    }

    // Cleanup function to remove the widget when the component unmounts
    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, []); // Empty dependency array: this effect runs once when component mounts.
  // Note: If the user resizes the browser window AFTER loading,
  // the widget won't switch dynamically without a resize listener.
  // For initial load responsiveness, this is fine.

  return (
    <>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 0",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          ref={widgetRef}
          id="kiwi-widget"
          style={{
            width: "100%",
            maxWidth: "1262px",
            // Ensure no minHeight or fixed height here from inline styles
          }}
        ></div>
      </section>
    </>
  );
}
