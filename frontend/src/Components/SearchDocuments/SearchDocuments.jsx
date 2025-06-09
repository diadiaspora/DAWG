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
              <option value="">Where From?</option>
              <option value="option1">USA</option>
              <option value="option2">Mexico</option>
              <option value="option3">Chile</option>
            </select>
          </div>
          <div>
            <label for="to">Where to?:</label>
            <select name="to" className="docSelect">
              <option value="">Where are you going?l</option>
              <option value="option1">USA</option>
              <option value="option2">Mexico</option>
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
