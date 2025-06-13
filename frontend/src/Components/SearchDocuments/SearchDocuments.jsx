import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HeadButtons from "../HeadButtons/HeadButtons.jsx";
import "./SearchDocuments.css";

const SearchDocuments = () => {
  const navigate = useNavigate();
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");

  const handleClick = () => {
    if (fromCountry && toCountry) {
      navigate(`/documents/${fromCountry}/${toCountry}`);
    } else {
      alert("Please select both countries.");
    }
  };

  return (
    <div style={{ marginLeft: "0px" }}>
      <div style={{ display: "flex", paddingTop: "42px" }}>
        <div>
          <label htmlFor="from" style={{ marginLeft: "0px", width: "220px" }}>
            Where From
          </label>
          <select
            name="from"
            className="docSelect"
            value={fromCountry}
            onChange={(e) => setFromCountry(e.target.value)}
          >
            <option value="">Where From?</option>
            <option value="usa">USA</option>
            <option value="mexico">Mexico</option>
            <option value="chile">Chile</option>
          </select>
        </div>
        <div>
          <label htmlFor="to">Where to?:</label>
          <select
            name="to"
            className="docSelect"
            value={toCountry}
            onChange={(e) => setToCountry(e.target.value)}
          >
            <option value="">Where are you going?</option>
            <option value="usa">USA</option>
            <option value="mexico">Mexico</option>
            <option value="chile">Chile</option>
          </select>
        </div>
      </div>
      <div className="button">
        <button onClick={handleClick}>Search</button>
      </div>
    </div>
  );
};

export default SearchDocuments;
