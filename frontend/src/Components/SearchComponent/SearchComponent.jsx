import { useState, useEffect } from "react";
import HeadButtons from "../HeadButtons/HeadButtons.jsx";
import SearchFlights from "../SearchFlights/SearchFlights.jsx";
import SearchAirlines from "../SearchAirlines/SearchAirlines.jsx";
import SearchDocuments from "../SearchDocuments/SearchDocuments.jsx";
import SearchServices from "../SearchServices/SearchServices.jsx";
import "./SearchComponent.css";

const SearchComponent = () => {
  const [activeForm, setActiveForm] = useState("flights");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 480;
      setIsMobile(isNowMobile);
      if (isNowMobile) {
        setActiveForm("airlineInfo"); // Automatically switch on mobile
      } else {
        setActiveForm("flights"); // Reset to flights on desktop
      }
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div>
        <div className="headbuttonz">
          <HeadButtons activeForm={activeForm} setActiveForm={setActiveForm} />
        </div>
        <div className="box">
          {!isMobile && activeForm === "flights" && <SearchFlights />}
          {activeForm === "airlineInfo" && <SearchAirlines />}
          {activeForm === "documents" && <SearchDocuments />}
          {activeForm === "services" && <SearchServices />}
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
