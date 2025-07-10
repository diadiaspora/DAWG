import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import "./SearchAirlines.css";

const SearchAirlines = () => {
  const navigate = useNavigate();
  const [airline, setAirline] = useState("");
  const [location, setLocation] = useState("");

  const handleAirlineChange = (evt) => {
    setAirline(evt.target.value);
  };

  const handleLocationChange = (evt) => {
    setLocation(evt.target.value);
  };

  const handleClick = () => {
    if (airline && location) {
      navigate(`/airlines/${airline}/${location}`);
    } else {
      alert("Please select both an airline and a destination type.");
    }
  };

  return (
    <div
      style={{
        borderStyle: "solid",
        borderRadius: "7px",
        borderColor: "#d9d9d9",
        backgroundColor: "#ffffff",
        marginTop: "82px",
        height: "177px",
        width: "1012px",
        marginLeft: "0px",
      }}
    >
      <div style={{ paddingTop: "18px" }}>
        <strong style={{ marginLeft: "18px" }}>
          Compare pet travel fees for each airline Find out which airline meets
          your pet travel budget.
        </strong>
      </div>

      <div style={{ display: "flex", marginTop: "18px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            htmlFor="from"
            style={{ marginLeft: "21px", fontSize: "16px", width: "350px" }}
          >
            Airline
          </label>
          <select
            name="from"
            className="airSelect"
            value={airline}
            onChange={handleAirlineChange}
            style={{ fontSize: "14px" }}
          >
            <option value="">Which Airline?</option>
            <option value="delta">Delta</option>
            <option value="aeromexico">AeroMexico</option>
            <option value="american-airlines">American Airlines</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="to" style={{ marginLeft: "21px", fontSize: "16px" }}>
            Where to?
          </label>
          <select
            name="to"
            className="airSelect"
            value={location}
            onChange={handleLocationChange}
            style={{ fontSize: "14px" }}
          >
            <option value="">National or International</option>
            <option value="national">National</option>
            <option value="international">International</option>
          </select>
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

export default SearchAirlines;
