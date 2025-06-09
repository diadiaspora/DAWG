
import HeadButtons from "../HeadButtons/HeadButtons.jsx";
import FlightSearch from "../SearchFlights/SearchFlights.jsx";
import AirlineSearch from "../SearchAirline/SearchAirllines.jsx";
import DocumentSearch from "../SearchDocuments/SearchDocuments.jsx";
import ServicesSearch from "../SearchServices/SearchServices.jsx";
import { useState } from "react";

const SearchComponent = () => {
  const [activeForm, setActiveForm] = useState("flights");

  return (
    <>
      <HeadButtons activeForm={activeForm} setActiveForm={setActiveForm} />

      <div className="box">
        {activeForm === "flights" && <FlightSearch />}
        {activeForm === "airlineInfo" && <AirlineSearch />}
        {activeForm === "documents" && <DocumentSearch />}
        {activeForm === "services" && <ServicesSearch />}
      </div>
    </>
  );
};

export default SearchComponent;
