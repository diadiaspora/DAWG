import { useState, useEffect, useRef } from "react";
import AllUsersCarousel from "../../Components/AllUsersCarousel/AllUsersCarousel.jsx";
import Calendar from "../../Components/Calendar/Calendar.jsx";
import AllUserCarouselMobile from "../../Components/AllUserCarouselMobile/AllUserCarouselMobile.jsx";
import "./Gallery.css";

const Gallery = () => {
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    // Show the mobile carousel on mobile screens
    return <AllUserCarouselMobile />;
  }

  // Desktop gallery UI
  return (
    <section className="gal">
      <div className="gallery-container">
        <div className="Caro-Cal">
          <div className="AllUsersCarousel">
            <AllUsersCarousel />
          </div>

          <div
            className="bluething"
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
            {/* <div
            ref={klookWidgetRef}
            style={{
              borderRadius: "7px",
              overflow: "hidden",
              width: "468px",
              height: "60px",
            }}
          /> */}
          </div>
        </div>

        <div
          className="calendarContainer"
          style={{ height: "350px", marginRight: "0px", marginLeft: "42px" }}
        >
          <Calendar />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
