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
            includedLanguages: "es,fr,de,it,ja,zh-CN", 
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
    };

    addScript();

    return () => {

      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div style={{backgroundColor: "blue", padding: "12px", borderRadius: "7px"}}>
    
      <div
        id="google_translate_element"
        style={{ marginTop: "1rem", borderRadius: "7px" }}
      ></div>{" "}
    </div>
  );
}
