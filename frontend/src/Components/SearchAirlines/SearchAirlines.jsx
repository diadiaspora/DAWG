import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";

import "./SearchAirlines.css";

const airlineOptions = [
  { value: "", label: "Which Airline?" },
  { value: "delta", label: "Delta" },
  { value: "aeromexico", label: "AeroMexico" },
  { value: "american-airlines", label: "American Airlines" },
];

const destinationOptions = [
  { value: "", label: "National or International" },
  { value: "national", label: "National" },
  { value: "international", label: "International" },
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

const SearchAirlines = () => {
  const navigate = useNavigate();
  const [airline, setAirline] = useState("");
  const [location, setLocation] = useState("");

  const handleClick = () => {
    if (airline && location) {
      navigate(`/airlines/${airline}/${location}`);
    } else {
      alert("Please select both an airline and a destination type.");
    }
  };

  return (
    <div className="airbox">
      <div style={{ paddingTop: "18px" }}>
        <p className="title" >
          Compare pet travel fees for each airline. Find out which airline meets
          your pet travel budget.
        </p>
      </div>

      <div className="airRow">
        <div
          className="airColumn"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label
            htmlFor="airline"
            className="air-label"
      
          >
            Which Airline?
          </label>
          <Select
            inputId="airline"
            options={airlineOptions}
            onChange={(option) => setAirline(option.value)}
            styles={customStyles}
            defaultValue={airlineOptions[0]}
            classNamePrefix="select"
          />
        </div>

        <div
          className="whereColumn"
          style={{
            display: "flex",
            flexDirection: "column",
        
          }}
        >
          <label
            htmlFor="destination"
            className="where-to"
        
          >
            Where to?
          </label>
          <Select
            inputId="destination"
            options={destinationOptions}
            onChange={(option) => setLocation(option.value)}
            styles={customStyles}
            defaultValue={destinationOptions[0]}
            classNamePrefix="select"
            className="where"
          />
        </div>

        <button
          onClick={handleClick}
          className="buttonAir"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchAirlines;
