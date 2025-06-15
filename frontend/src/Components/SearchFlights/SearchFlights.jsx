

import { useNavigate } from "react-router-dom";
import "./SearchFlights.css";

const SearchFlights = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/flights");
  };

  return (
    <>
      <div style={{ marginLeft: "42px", paddingLeft: "0px" }}>
        <div style={{ display: "flex", paddingTop: "42px" }}>
          <div>
            <label for="to" style={{ marginLeft: "0px", width: "220px" }}>
              Where to?:
            </label>
            <input id="to" name="to" type="text" className="input" />
          </div>
          <div>
            <label for="to" style={{ marginLeft: "0px", width: "220px" }}>
              Where to?:
            </label>
            <input id="to" name="to" type="text" className="input" />
          </div>
          <div>
            <label for="to" style={{ marginLeft: "0px", width: "220px" }}>
              Departure:
            </label>
            <input id="to" name="to" type="text" className="input" />
          </div>
          <div>
            <label for="to" style={{ marginLeft: "0px", width: "220px" }}>
              Return:
            </label>
            <input id="to" name="to" type="text" className="input" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "36px",
          }}
          className="buttonFly"
        >
          <button onClick={handleClick} className="buttonAir">
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchFlights;
