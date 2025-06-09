

import { useNavigate } from "react-router-dom";
import "./SearchFlights.css";

const SearchFlights = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/flights");
  };

  return (
    <>
      <div className="box">
        <div className="selContainer">
          <div>
            <label for="to">Where to?:</label>
            <input id="to" name="to" type="text" />
          </div>
          <div>
            <label for="to">Where to?:</label>
            <input id="to" name="to" type="text" />
          </div>
          <div>
            <label for="to">Departure:</label>
            <input id="to" name="to" type="text" />
          </div>
          <div>
            <label for="to">Return:</label>
            <input id="to" name="to" type="text" />
          </div>
        </div>
        <div className="button">
          <button onClick={handleClick}>Search</button>
        </div>
      </div>
    </>
  );
};

export default SearchFlights;
