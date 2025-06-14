import "./HeadButtons.css";

const HeadButtons = ({ activeForm, setActiveForm }) => {
  return (
    <div className="headbuttons">
      <button
        className={activeForm === "flights" ? "selected" : ""}
        onClick={() => setActiveForm("flights")}
      >
        Flights
      </button>
      <button
        className={activeForm === "airlineInfo" ? "selected" : ""}
        onClick={() => setActiveForm("airlineInfo")}
      >
        Airline Info
      </button>
      <button
        className={activeForm === "documents" ? "selected" : ""}
        onClick={() => setActiveForm("documents")}
      >
        Documents
      </button>
      <button
        className={activeForm === "services" ? "selected" : ""}
        onClick={() => setActiveForm("services")}
      >
        Services
      </button>
    </div>
  );
};

export default HeadButtons;
