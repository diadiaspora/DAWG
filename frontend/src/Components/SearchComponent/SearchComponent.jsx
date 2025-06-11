import HeadButtons from "../HeadButtons/HeadButtons.jsx";
import SearchFlights from "../SearchFlights/SearchFlights.jsx";
import SearchAirlines from "../SearchAirlines/SearchAirlines.jsx";
import SearchDocuments from "../SearchDocuments/SearchDocuments.jsx";
import SearchServices from "../SearchServices/SearchServices.jsx";
import { useState } from "react";
import "./SearchComponent.css";

const SearchComponent = () => {
  const [activeForm, setActiveForm] = useState("flights");

  return (
    <>
      <HeadButtons activeForm={activeForm} setActiveForm={setActiveForm} />

      <div className="box">
        {activeForm === "flights" && <SearchFlights />}
        {activeForm === "airlineInfo" && <SearchAirlines />}
        {activeForm === "documents" && <SearchDocuments />}
        {activeForm === "services" && <SearchServices />}
      </div>
    </>
  );
};

export default SearchComponent;
