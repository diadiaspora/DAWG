import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
      <div style={{ paddingTop: "18px" }}>
        <strong style={{ marginLeft: "18px" }}>
          Find out what documents you pet needs to travel to and from a specific
          country.
        </strong>
      </div>

      <div style={{ display: "flex", marginTop: "18px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="from" style={{ marginLeft: "21px", width: "350px" }}>
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

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="to" style={{ marginLeft: "19px" }}>
            Where to?:
          </label>
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
        <button onClick={handleClick} className="buttonAir">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchDocuments;
