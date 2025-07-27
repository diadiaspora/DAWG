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
      {" "}
      {/* This single div will handle both desktop and mobile */}
      {buttons.map(({ key, label }) => (
        <button
          key={key}
          className={activeForm === key ? "selected" : ""}
          onClick={() => setActiveForm(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default HeadButtons;
