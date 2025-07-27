import HeadButtons from "../HeadButtons/HeadButtons.jsx";
import SearchFlights from "../SearchFlights/SearchFlights.jsx";
import SearchAirlines from "../SearchAirlines/SearchAirlines.jsx";
import SearchDocuments from "../SearchDocuments/SearchDocuments.jsx";
import SearchServices from "../SearchServices/SearchServices.jsx";
import { useState, useEffect, useState as useReactState } from "react";
import "./SearchComponent.css";

const SearchComponent = () => {
  const [activeForm, setActiveForm] = useState("flights");
  const [isMobile, setIsMobile] = useReactState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <HeadButtons activeForm={activeForm} setActiveForm={setActiveForm} />

      <div className="box">
        {activeForm === "flights" && !isMobile && <SearchFlights />}
        {activeForm === "airlineInfo" && <SearchAirlines />}
        {activeForm === "documents" && <SearchDocuments />}
        {activeForm === "services" && <SearchServices />}
      </div>
    </>
  );
};

export default SearchComponent;
