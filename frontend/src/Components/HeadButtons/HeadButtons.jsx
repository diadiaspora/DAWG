// HeadButtons.jsx
import "./HeadButtons.css";

const HeadButtons = ({ activeForm, setActiveForm }) => {
  const buttons = [
    { key: "flights", label: "Flights" },
    { key: "airlineInfo", label: "Airline Info" },
    { key: "documents", label: "Documents" },
    { key: "services", label: "Services" },
  ];

  return (
    <div className="headbuttons">
      {buttons.map(({ key, label }) => (
        <button
          key={key}
          className={`${activeForm === key ? "selected" : ""} ${
            key === "flights" ? "flights-only" : ""
          }`}
          onClick={() => setActiveForm(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default HeadButtons;
