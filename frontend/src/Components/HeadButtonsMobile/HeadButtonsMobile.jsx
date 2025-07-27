import "./HeadButtonsMobile.css";

const HeadButtonsMobile = ({ activeForm, setActiveForm }) => {
  return (
    <div>
      <div className="headbuttonsmobile">
        <div >
          <button
            className={activeForm === "flights" ? "selected" : ""}
            onClick={() => setActiveForm("flights")}

          >
            Flights
          </button>
        </div>
        <div>
          <button
            className={activeForm === "airlineInfo" ? "selected" : ""}
            onClick={() => setActiveForm("airlineInfo")}
          >
            Airline Info
          </button>
        </div>
        <div>
          <button
            className={activeForm === "documents" ? "selected" : ""}
            onClick={() => setActiveForm("documents")}
          >
            Documents
          </button>
        </div>
        <div>
          <button
            className={activeForm === "services" ? "selected" : ""}
            onClick={() => setActiveForm("services")}
          >
            Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeadButtonsMobile;
