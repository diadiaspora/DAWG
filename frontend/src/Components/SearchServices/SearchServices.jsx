import "./SearchServices.css";
import { useNavigate } from "react-router-dom";


import HeadButtons from "../HeadButtons/HeadButtons.jsx";
import { useState } from "react";
import "./SearchServices.css";


const SearchServices = () => {
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

 

  const handleClick = () => {
    if (service && location) {
      navigate(`/services/${service}/${location}`);
    } else {
      alert("Please select both service and location");
    }
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
              Service Needed
            </label>
            <select
              name="service"
              className="select"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">What do yoou need?</option>
              <option value="vet">Veterinarian</option>
              <option value="lawyer">Lawyer</option>
              <option value="dentist">Dentist</option>
              {/* <option value="option4">Mental Health</option>
              <option value="option5">Accountant</option>
              <option value="option6">Translator</option>
              <option value="option7">Emergency Housing</option>
              <option value="option8">Tour Guide</option>
              <option value="option9">Police</option>
              <option value="option10">General Practitioner</option>
              <option value="option11">Beauty</option>
              <option value="option12">Domestic Violence</option> */}
            </select>
          </div>

          <div>
            <label for="to" style={{ marginLeft: "0px", width: "220px" }}>
              City?:
            </label>
            <select
              name="location"
              className="select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Where are you?</option>
              <option value="MexicoCity">Mexico City</option>
              <option value="Berlin">Berlin</option>
              <option value="Santiago">Santiago</option>
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
