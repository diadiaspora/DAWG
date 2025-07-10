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
        <div style={{ marginTop: "18px" }}>
          <strong style={{ marginLeft: "18px" }}>
            Find the services you need while traveling
          </strong>
        </div>
        <div style={{ display: "flex", marginTop: "18px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              for="from"
              style={{ marginLeft: "21px", width: "350px", fontSize: "16px" }}
            >
              Service Needed
            </label>
            <select
              name="service"
              className="servSelect"
              value={service}
              onChange={(e) => setService(e.target.value)}
              style={{ fontSize: "14px" }}
            >
              <option value="">What do you need?</option>
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

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              for="to"
              style={{ marginLeft: "18px", width: "220px", fontSize: "16px" }}
            >
              City?:
            </label>
            <select
              name="location"
              className="servSelect"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ fontSize: "14px" }}
            >
              <option value="">Where are you?</option>
              <option value="MexicoCity">Mexico City</option>
              <option value="Berlin">Berlin</option>
              <option value="Santiago">Santiago</option>
            </select>
          </div>

          <button onClick={handleClick} className="buttonAir">
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchServices;
