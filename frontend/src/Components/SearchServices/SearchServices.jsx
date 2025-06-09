import { useNavigate } from "react-router-dom";

import HeadButtons from "../HeadButtons/HeadButtons.jsx";
import { useState } from "react";

const SearchServices = () => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate("/services");
    };

  return (
    <>
      <div className="box">
        <div className="selContainer">
          <div>
            <label for="from">Where from? </label>
            <select name="from">
              <option value="">Select a Country</option>
              <option value="option1">USA</option>
              <option value="option2">Mexico</option>
              <option value="option3">Chile</option>
            </select>
          </div>
          <div>
            <label for="to">Where to?:</label>
            <select name="to">
              <option value="">Select a Country</option>
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

export default SearchServices;
