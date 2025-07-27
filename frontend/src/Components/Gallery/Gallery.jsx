import { useState, useEffect, useRef } from "react";
import AllUsersCarousel from "../../Components/AllUsersCarousel/AllUsersCarousel.jsx";
import Calendar from "../../Components/Calendar/Calendar.jsx";
import { Link } from "react-router";
import "./Gallery.css";

const Gallery = () => {
  const [isGallery, setIsGallery] = useState(true);
  const [showCalendar, setShowCalendar] = useState(true); // ✅ state to control calendar visibility
  const klookWidgetRef = useRef();

  useEffect(() => {
    // Set calendar visibility based on screen width
    const handleResize = () => {
      setShowCalendar(window.innerWidth >= 768); // show calendar if screen is tablet or desktop
    };

    handleResize(); // set on mount
    window.addEventListener("resize", handleResize); // update on resize

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        flexDirection: "column",
      }}
    >
      <div style={{ height: "350px", marginLeft: "42px" }}>
        <div style={{ width: "662px" }}>
          <AllUsersCarousel />
        </div>

        <div
          style={{
            backgroundColor: "#1E3769",
            height: "100px",
            width: "665px",
            borderRadius: "7px",
            marginTop: "24px",
            paddingTop: "1px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Widget could go here */}
        </div>
      </div>

      {showCalendar && (
        <div
          style={{ height: "350px", marginRight: "0px", marginLeft: "42px" }}
        >
          <Calendar />
        </div>
      )}
    </div>
  );
};

export default Gallery;
