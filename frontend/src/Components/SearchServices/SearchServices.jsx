import "./SearchServices.css";
import { useNavigate } from "react-router-dom";

import HeadButtons from "../HeadButtons/HeadButtons.jsx";
import { useState } from "react";
import "./SearchServices.css";
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
            <label for="from">Service Needed </label>
            <select name="from" className="select">
              <option value="">Select a Country</option>
              <option value="option1">USA</option>
              <option value="option2">Mexico</option>
              <option value="option3">Chile</option>
            </select>
          </div>
          <div>
            <label for="to">Your Language</label>
            <select name="to" className="select">
              <option value="">Select a Country</option>
              <option value="option1">USA</option>
              <option value="option2">Mexico</option>
              <option value="option3">Chile</option>
            </select>
          </div>
          <div>
            <label for="to">Your Nationality</label>
            <select name="to" className="select">
              <option value="">Select a Country</option>
              <option value="option1">USA</option>
              <option value="option2">Mexico</option>
              <option value="option3">Chile</option>
            </select>
          </div>
          <div>
            <label for="to">Where to?:</label>
            <select name="to" className="select">
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
