import { useEffect } from "react";

export default function Advertisement() {
  useEffect(() => {

    if (
      !document.querySelector(
        'script[src="https://affiliate.klook.com/widget/fetch-iframe-init.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://affiliate.klook.com/widget/fetch-iframe-init.js";
      script.async = true;
      script.onload = () => {
    
        if (window.klookWidgetInit) {
          window.klookWidgetInit();
        }
      };
      document.body.appendChild(script);
    } else {

      if (window.klookWidgetInit) {
        window.klookWidgetInit();
      } else {
     
        const oldScript = document.querySelector(
          'script[src="https://affiliate.klook.com/widget/fetch-iframe-init.js"]'
        );
        if (oldScript) {
          oldScript.remove();
          const newScript = document.createElement("script");
          newScript.src =
            "https://affiliate.klook.com/widget/fetch-iframe-init.js";
          newScript.async = true;
          document.body.appendChild(newScript);
        }
      }
    }
  }, []);

  return (
    <div
      style={{
        width: "1012px",
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
        marginTop: "50px",
      }}
    >
      <ins
        className="klk-aff-widget"
        data-wid="93395"
        data-bgtype="Shinkansen"
        data-adid="1085833"
        data-lang="en"
        data-prod="banner"
        data-width="250"
        data-height="250"
        style={{ display: "inline-block", width: 250, height: 250 }}
      >
        <a href="//www.klook.com/?aid=">Klook.com</a>
      </ins>

      <ins
        className="klk-aff-widget"
        data-wid="93395"
        data-bgtype="Play"
        data-adid="1085833"
        data-lang="en"
        data-prod="banner"
        data-width="250"
        data-height="250"
        style={{ display: "inline-block", width: 250, height: 250 }}
      >
        <a href="//www.klook.com/?aid=">Klook.com</a>
      </ins>

      <ins
        className="klk-aff-widget"
        data-wid="93395"
        data-bgtype="Car"
        data-adid="1085833"
        data-lang="en"
        data-prod="banner"
        data-width="250"
        data-height="250"
        style={{ display: "inline-block", width: 250, height: 250 }}
      >
        <a href="//www.klook.com/?aid=">Klook.com</a>
      </ins>

      <ins
        className="klk-aff-widget"
        data-wid="93395"
        data-bgtype="Hotel"
        data-adid="1085833"
        data-lang="en"
        data-prod="banner"
        data-width="250"
        data-height="250"
        style={{ display: "inline-block", width: 250, height: 250 }}
      >
        <a href="//www.klook.com/?aid=">Klook.com</a>
      </ins>
    </div>
  );
}
