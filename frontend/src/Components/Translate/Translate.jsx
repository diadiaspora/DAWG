import { useEffect } from "react";

import "./Translate.css";

export default function Translate() {
  useEffect(() => {
    const addScript = () => {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "es,fr,de,it,ja,zh-CN", // <-- list your desired language codes here
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
    };

    addScript();

    return () => {
      // Cleanup script and globals if needed
      delete window.googleTranslateElementInit;
    };
  }, []);

  return <div id="google_translate_element" style={{ marginTop: "1rem"}}></div>;
}
