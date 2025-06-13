import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HeadButtons from "../HeadButtons/HeadButtons.jsx";
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
    <div style={{ marginLeft: "0px" }}>
      <div style={{ display: "flex", paddingTop: "42px" }}>
        <div>
          <label htmlFor="from">Airline</label>
          <select
            name="from"
            className="airSelect"
            value={airline}
            onChange={handleAirlineChange}
          >
            <option value="">Which Airline?</option>
            <option value="delta">Delta</option>
            <option value="aeromexico">AeroMexico</option>
            <option value="american-airlines">American Airlines</option>
          </select>
        </div>
        <div>
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
      </div>
      <div className="button">
        <button onClick={handleClick}>Search</button>
      </div>
    </div>
  );
};

export default SearchAirlines;
