import { useNavigate } from "react-router-dom";

import HeadButtons from "../HeadButtons/HeadButtons.jsx";
import { useState } from "react";
import "./SearchDocuments.css";

const SearchDocuments = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/docs");
  };

  return (
    <>
      <div style={{ marginLeft: "0px" }}>
        <div style={{ display: "flex", paddingTop: "42px" }}>
          <div>
            <label for="from">Where From </label>
            <select name="from" className="docSelect">
              <option value="">Which Airline?</option>
              <option value="option1">Delta</option>
              <option value="option2">AeroMexico</option>
              <option value="option3">Chile</option>
            </select>
          </div>
          <div>
            <label for="to">Where to?:</label>
            <select name="to" className="docSelect">
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

export default SearchDocuments;
