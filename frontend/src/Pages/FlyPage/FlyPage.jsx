import Header from "../../Components/Header/Header.jsx";
import { useEffect, useRef } from "react";
import "./FlyPage.css";

export default function FlyPage({ user, setUser }) {
  const widgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&locale=en&powered_by=true&limit=4&primary_color=1E3769&results_background_color=FFFFFF&form_background_color=FFFFFF&border_radius=50&campaign_id=111&promo_id=3411";
    script.async = true;
    script.charset = "utf-8";

    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="home">
      <div className="page-container" style={{ marginBottom: "-46px" }}>
        <div className="header-wrapper">
          <Header user={user} setUser={setUser} />
        </div>
      </div>

      <div className="wide-fly">
        <main className="mainly-fly">
          <div id="tp-widget" ref={widgetRef} className="fly-widget"></div>
        </main>
      </div>
    </section>
  );
}
