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
      <div style={{ marginLeft: "42px", paddingLeft: "0px" }}>
        <div
          style={{
            display: "flex",
            paddingTop: "42px",
            marginLeft: "0px",
            paddingLeft: "0px",
          }}
        >
          <div>
            <label for="from" style={{ marginLeft: "0px", width: "220px" }}>
              Service Needed{" "}
            </label>
            <select name="from" className="select">
              <option value="">What do yoou need?</option>
              <option value="option1">Veteriinarian</option>
              <option value="option2">Lawyer</option>
              <option value="option3">Dentist</option>
              <option value="option4">Mental Health</option>
              <option value="option5">Accountant</option>
              <option value="option6">Translator</option>
              <option value="option7">Emergency Housing</option>
              <option value="option8">Tour Guide</option>
              <option value="option9">Police</option>
              <option value="option10">General Practitioner</option>
              <option value="option11">Beauty</option>
              <option value="option12">Domestic Violence</option>
            </select>
          </div>
          <div>
            <label for="to" style={{ marginLeft: "0px", width: "220px" }}>
              Your Language
            </label>
            <select name="to" className="select">
              <option value="">Your Language</option>
              <option value="option1">English</option>
              <option value="option2">Spanish</option>
              <option value="option3">French</option>
              <option value="option3">German</option>
            </select>
          </div>
          <div>
            <label for="to" style={{ marginLeft: "0px", width: "220px" }}>
              Your Nationality
            </label>
            <select name="to" className="select">
              <option value="">Your Nationality</option>
              <option value="option1">USA</option>
              <option value="option2">Mexico</option>
              <option value="option3">Chile</option>
              <option value="option3">Germany</option>
              <option value="option3">France</option>
            </select>
          </div>
          <div>
            <label for="to" style={{ marginLeft: "0px", width: "220px" }}>
              City?:
            </label>
            <select name="to" className="select">
              <option value="">Where are you?</option>
              <option value="option1">Mexico City</option>
              <option value="option2">Berlin</option>
              <option value="option3">Santiago</option>
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
