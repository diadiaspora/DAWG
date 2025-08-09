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
  
    return <AllUserCarouselMobile />;
  }

  return (
    <section className="gal">
      <div className="gallery-container">
        <div className="Caro-Cal">
          <div
            className="bluething"
       
          > Besties </div>
          <div className="AllUsersCarousel">
            <AllUsersCarousel />
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
