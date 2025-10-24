import "./SearchServices.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";

const serviceOptions = [
  { value: "", label: "Service" },
  { value: "vet", label: "Veterinarian" },
  { value: "lawyer", label: "Lawyer" },
  { value: "dentist", label: "Dentist" },
];

const locationOptions = [
  { value: "", label: "Location" },
  { value: "Athens", label: "Athens" },
  { value: "Bali", label: "Bali" },
  { value: "Bangkok", label: "Bangkok" },
  { value: "Barcelona", label: "Barcelona" },
  { value: "Berlin", label: "Berlin" },
  { value: "Bogotá", label: "Bogotá" },
  { value: "Brisbane", label: "Brisbane" },
  { value: "Buenos Aires", label: "Buenos Aires" },
  { value: "Cairo", label: "Cairo" },
  { value: "Cape Town", label: "Cape Town" },
  { value: "Christchurch", label: "Christchurch" },
  { value: "Copenhagen", label: "Copenhagen" },
  { value: "Cusco", label: "Cusco" },
  { value: "Denpasar", label: "Denpasar" },
  { value: "Dublin", label: "Dublin" },
  { value: "Edinburgh", label: "Edinburgh" },
  { value: "Glasgow", label: "Glasgow" },
  { value: "Guadalajara", label: "Guadalajara" },
  { value: "Guatemala City", label: "Guatemala City" },
  { value: "Havana", label: "Havana" },
  { value: "Heraklion", label: "Heraklion" },
  { value: "Lima", label: "Lima" },
  { value: "London", label: "London" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "Madrid", label: "Madrid" },
  { value: "Manila", label: "Manila" },
  { value: "Manchester", label: "Manchester" },
  { value: "Marseille", label: "Marseille" },
  { value: "Melbourne", label: "Melbourne" },
  { value: "Mexico City", label: "Mexico City" },
  { value: "Milan", label: "Milan" },
  { value: "Monterrey", label: "Monterrey" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Nairobi", label: "Nairobi" },
  { value: "Naples", label: "Naples" },
  { value: "New York City", label: "New York City" },
  { value: "Perth", label: "Perth" },
  { value: "Puebla", label: "Puebla" },
  { value: "Pretoria", label: "Pretoria" },
  { value: "Quezon City", label: "Quezon City" },
  { value: "Quebec City", label: "Quebec City" },
  { value: "Quetzaltenango", label: "Quetzaltenango" },
  { value: "Rio de Janeiro", label: "Rio de Janeiro" },
  { value: "Rome", label: "Rome" },
  { value: "Rosario", label: "Rosario" },
  { value: "San Francisco", label: "San Francisco" },
  { value: "San José", label: "San José" },
  { value: "Santiago", label: "Santiago" },
  { value: "São Paulo", label: "São Paulo" },
  { value: "Sydney", label: "Sydney" },
  { value: "Tijuana", label: "Tijuana" },
  { value: "Tokyo", label: "Tokyo" },
  { value: "Toronto", label: "Toronto" },
  { value: "Valencia", label: "Valencia" },
  { value: "Valparaíso", label: "Valparaíso" },
  { value: "Venice", label: "Venice" },
  { value: "Vienna", label: "Vienna" },
  { value: "Vancouver", label: "Vancouver" },
  { value: "Zurich", label: "Zurich" },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    width: "100%",
    height: 48,
    marginLeft: 18,
    backgroundColor: "#F2F4F7",
    borderColor: state.isFocused ? "#4AA692" : "#E9E9E9",
    borderRadius: 7,
    boxShadow: state.isFocused ? "0 0 0 2px rgba(74, 166, 146, 0.697)" : "none",
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "14px",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#4AA692",
      borderWidth: "2px",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#4AA692" : "#ffffff",
    color: state.isFocused ? "#ffffff" : "#000000",
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: "14px",
    cursor: "pointer",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#4AA692",
    "&:hover": { color: "#4AA692" },
  }),
  indicatorSeparator: (base) => ({ ...base, display: "none" }),
  menu: (base) => ({ ...base, zIndex: 9999 }),
};

const SearchServices = () => {
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const formatLocation = (loc) => loc.replace(/\s+/g, "");

  const handleClick = () => {
    if (service && location) {
      const normalizedLocation = formatLocation(location);
      navigate(`/services/${service}/${normalizedLocation}`);
    } else {
      alert("Please select both service and location");
    }
  };

  return (
    <div className="airbox">
      <div style={{ paddingTop: "8px" }}>
        <p className="title">
          Find the services for you and your pet while traveling abroad
        </p>
      </div>

      <div className="airRow">
        <div className="airColumn">
          <label htmlFor="service" className="air-label">
            Service Needed
          </label>
          <Select
            inputId="service"
            options={serviceOptions}
            onChange={(option) => setService(option.value)}
            styles={customStyles}
            defaultValue={serviceOptions[0]}
            classNamePrefix="select"
          />
        </div>

        <div className="airColumn">
          <label htmlFor="location" className="where-to">
            City?
          </label>
          <Select
            inputId="location"
            options={locationOptions}
            onChange={(option) => setLocation(option.value)}
            styles={customStyles}
            defaultValue={locationOptions[0]}
            classNamePrefix="select"
            className="where"
          />
        </div>

        <button onClick={handleClick} className="buttonAir">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchServices;
