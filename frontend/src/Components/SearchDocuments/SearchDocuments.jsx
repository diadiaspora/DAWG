import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";

import "./SearchDocuments.css";

const countryOptions = [
  { value: "", label: "Where From?" },
  { value: "Argentina ", label: "Argentina " },
  { value: "Australia  ", label: "Australia" },
  { value: "Bali", label: "Bali" },
  { value: "Berlin", label: "Berlin" },
  { value: "Brazil", label: "Brazil" },
  { value: "Chile", label: "Chile" },
  { value: "Colombia", label: "Colombia" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Cuba", label: "Cuba" },
  { value: "Dominican Republic", label: "Dominican Republic" },
  { value: "Egypt", label: "Egypt" },
  { value: "France", label: "France" },
  { value: "Greece", label: "Greece" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "India", label: "India" },
  { value: "Italy", label: "Italy" },
  { value: "Mexico", label: "Mexico" },
  { value: "Panama", label: "Panama" },
  { value: "Peru", label: "Peru" },
  { value: "Philippines", label: "Philippines" },
  { value: "South Africa", label: "South Africa" },
  { value: "Spain", label: "Spain" },
  { value: "Thailand", label: "Thailand" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "USA ", label: "USA " },
];

const destinationOptions = [
  { value: "", label: "Where From?" },
  { value: "Argentina ", label: "Argentina " },
  { value: "Australia  ", label: "Australia" },
  { value: "Bali", label: "Bali" },
  { value: "Berlin", label: "Berlin" },
  { value: "Brazil", label: "Brazil" },
  { value: "Chile", label: "Chile" },
  { value: "Colombia", label: "Colombia" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Cuba", label: "Cuba" },
  { value: "Dominican Republic", label: "Dominican Republic" },
  { value: "Egypt", label: "Egypt" },
  { value: "France", label: "France" },

  { value: "Greece", label: "Greece" },
  { value: "Germany", label: "Germany" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "India", label: "India" },
  { value: "Italy", label: "Italy" },
  { value: "Mexico", label: "Mexico" },
  { value: "Panama", label: "Panama" },
  { value: "Peru", label: "Peru" },
  { value: "Philippines", label: "Philippines" },
  { value: "South Africa", label: "South Africa" },
  { value: "Spain", label: "Spain" },
  { value: "Thailand", label: "Thailand" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "USA ", label: "USA " },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    width: "100%",
    height: 48,
    marginLeft: 18,
    backgroundColor: "#F2F4F7",
    borderColor: state.isFocused ? "#4AA692" : "#E9E9E9",
    borderRadius: 7,
    boxShadow: state.isFocused ? "0 0 0 2px rgba(74, 166, 146, 0.697)" : "none",
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "14px",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#4AA692",
      borderWidth: "2px",
    },
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#4AA692" : "#ffffff",
    color: state.isFocused ? "#ffffff" : "#000000",
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "14px",
    cursor: "pointer",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "#4AA692",
    "&:hover": {
      color: "#4AA692",
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};

const SearchDocuments = () => {
  const navigate = useNavigate();
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");

  const handleClick = () => {
    if (fromCountry && toCountry) {
      navigate(`/documents/${fromCountry}/${toCountry}`);
    } else {
      alert("Please select both countries.");
    }
  };

  return (
    <div className="airbox">
      <div style={{ paddingTop: "8px" }}>
        <p className="title">
          Find out what documents your pet needs to travel to and from a
          specific country.
        </p>
      </div>

      <div style={{ display: "flex", marginTop: "10px" }} className="airRow">
        <div
          className="airColumn"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="from" className="air-label">
            Where From
          </label>
          <Select
            inputId="from"
            options={countryOptions}
            onChange={(option) => setFromCountry(option.value)}
            styles={customStyles}
            defaultValue={countryOptions[0]}
            classNamePrefix="select"
          />
        </div>

        <div
          className="airColumn"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="to" className="where-to">
            Where to?:
          </label>
          <Select
            inputId="to"
            options={destinationOptions}
            onChange={(option) => setToCountry(option.value)}
            styles={customStyles}
            defaultValue={destinationOptions[0]}
            classNamePrefix="select"
            className="where"
          />
        </div>

        <button
          onClick={handleClick}
          className="buttonAir"
          style={{ fontSize: "16px" }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchDocuments;
