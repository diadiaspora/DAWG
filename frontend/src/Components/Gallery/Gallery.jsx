import { useState, useEffect, useRef } from "react";
import Carousel from "../../Components/Carousel/Carousel.jsx";
import Calendar from "../../Components/Calendar/Calendar.jsx";
import { Link } from "react-router";
import "./Gallery.css";

const Gallery = () => {
  const [isGallery, setIsGallery] = useState(true);
  const klookWidgetRef = useRef();

  useEffect(() => {
    if (klookWidgetRef.current) {
      klookWidgetRef.current.innerHTML = `
        <ins class="klk-aff-widget"
          data-wid="93395"
          data-bgtype="Hotel"
          data-adid="1085867"
          data-lang="en"
          data-prod="banner"
          data-width="468"
          data-height="60">
          <a href="//www.klook.com/?aid=">Klook.com</a>
        </ins>
      `;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://affiliate.klook.com/widget/fetch-iframe-init.js";
      klookWidgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        marginTop: "42px",
        width: "1012px",
        display: "flex",
        marginBottom: "60px",
      }}
    >
      <div style={{ height: "350px", marginLeft: "42px" }}>
        <div style={{ width: "662px" }}>
          <Carousel />
        </div>

        <div
          style={{
            backgroundColor: "#1E3769",
            height: "100px",
            width: "665px",
            borderRadius: "7px",
            marginTop: "34px",
            paddingTop: "1px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Widget injected here */}
          <div
            ref={klookWidgetRef}
            style={{
              borderRadius: "7px",
              overflow: "hidden",
              width: "468px",
              height: "60px",
            }}
          />
        </div>
      </div>

      <div style={{ height: "350px", marginRight: "0px", marginLeft: "42px" }}>
        <Calendar />
      </div>
    </div>
  );
};

export default Gallery;
