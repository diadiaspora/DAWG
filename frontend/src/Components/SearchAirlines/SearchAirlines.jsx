import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
        borderRadius: "2px",
        borderColor: "#d9d9d9",
        backgroundColor: "#ffffff",
        marginTop: "82px",
        height: "177px",
        width: "963px",
        marginLeft: "25px"
      }}
    >
      <div
        style={{
          display: "flex",
          paddingTop: "42px",
          // borderStyle: "solid",
          // borderRadius: "7px",
          // borderColor: "#d9d9d9",
        }}
      >
        <div
          style={
            {
              // borderStyle: "solid",
              // borderRadius: "7px",
              // borderColor: "#d9d9d9",
            }
          }
        >
          <label htmlFor="from">Airline</label>
          <select
            name="from"
            className="airSelect"
            value={airline}
            onChange={handleAirlineChange}
            style={{
              borderRadius: "7px",
              backgroundColor: "#F2F4F7",
              borderTopWidth: "0.5px",
              borderColor: "#E9E9E9",
            }}
          >
            <option value="">Which Airline?</option>
            <option value="delta">Delta</option>
            <option value="aeromexico">AeroMexico</option>
            <option value="american-airlines">American Airlines</option>
          </select>
        </div>
        <div style={{ marginLeft: "-60px" }}>
          <label htmlFor="to">Where to?</label>
          <select
            name="to"
            className="airSelect"
            value={location}
            onChange={handleLocationChange}
          >
            <option value="">National or International</option>
            <option value="national">National</option>
            <option value="international">International</option>
          </select>
        </div>
        <button onClick={handleClick} className="buttonAir">
          Search
        </button>
      </div>
      {/* <div
        style={{ display: "flex", justifyContent: "center", marginTop: "36px" }}
      >
        
      </div> */}
    </div>
  );
};

export default SearchAirlines;
