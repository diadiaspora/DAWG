import { useNavigate } from "react-router-dom";

import HeadButtons from "../HeadButtons/HeadButtons.jsx";
import { useState } from "react";
import "./SearchAirlines.css";

const SearchAirlines = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/airlines");
  };

  return (
    <>
      <div style={{ marginLeft: "0px" }}>
        <div style={{ display: "flex", paddingTop: "42px" }}>
          <div>
            <label for="from">Airline </label>
            <select
              name="from"
              className="airSelect">
              <option value="">Which Airline?</option>
              <option value="option1">Delta</option>
              <option value="option2">AeroMexico</option>
              <option value="option3">Chile</option>
            </select>
          </div>
          <div>
            <label for="to">Where to?:</label>
            <select name="to" className="airSelect">
              <option value="">National or International</option>
              <option value="option1">National</option>
              <option value="option2">International</option>
              <option value="option3">Chile</option>
            </select>
          </div>
        </div>
        <div className="button">
          <button onClick={handleClick}>Search</button>
        </div>
      </div>
    </>
  );
};

export default SearchAirlines;
