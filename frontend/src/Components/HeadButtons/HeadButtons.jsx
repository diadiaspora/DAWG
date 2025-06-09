import "./HeadButtons.css";

const HeadButtons = ({ activeForm, setActiveForm }) => {
  return (
    <div className="headbuttons">
      <button onClick={() => setActiveForm("flights")}>Flights</button>
      <button onClick={() => setActiveForm("airlineInfo")}>Airline Info</button>
      <button onClick={() => setActiveForm("documents")}>Documents</button>
      <button onClick={() => setActiveForm("services")}>Services</button>
    </div>
  );
};

export default HeadButtons;
