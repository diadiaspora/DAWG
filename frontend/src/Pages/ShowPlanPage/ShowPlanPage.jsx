import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as planService from "../../services/planService";
import PlanWhereForm from "../../Components/PlanWhereForm/PlanWhereForm.jsx";
import PlanFlightForm from "../../Components/PlanFlightForm/PlanFlightForm.jsx";
import PlanScheduleForm from "../../Components/PlanScheduleForm/PlanScheduleForm.jsx";
import Header from "../../Components/Header/Header.jsx"; // Assuming this is used elsewhere
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx"; // Assuming this is used elsewhere
import Carousel from "../../Components/Carousel/Carousel.jsx"; // Assuming this is used elsewhere

import WeatherSearch from "../../Components/WeatherSearch/WeatherSearch";
import * as weatherService from "../../services/weatherService";
import WeatherDetails from "../../Components/WeatherDetails/WeatherDetails";

export default function ShowPlanPage() {
  const { id } = useParams();
  const [weather, setWeather] = useState({});
  const [plan, setPlan] = useState({});
  const [planId, setPlanId] = useState(null); // This state seems unused in the provided snippet.
  const [showForm, setShowForm] = useState(false); // Added for handleEditClick
  const [formData, setFormData] = useState({}); // Added for handleEditClick
  const [errorMsg, setErrorMsg] = useState(""); // Added for handleEditClick

  // The following log should be outside of the fetchData function
  console.log("Current Weather State:", weather);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const planData = await planService.show(id);
        setPlan(planData);
      } catch (err) {
    
      }
    }
    fetchPlan();
  }, [id]); 


  async function fetchWeather(city) {
    try {
      const weatherData = await weatherService.show(city);
      setWeather(weatherData);
    } catch (err) {
      console.error("Error fetching weather data:", err);
   
      setWeather({
        location: "N/A",
        temperature: "N/A",
        condition: "Error fetching weather",
      });
    }
  }

  async function handleEditClick(evt) {
    evt.preventDefault();
    setShowForm(false);
    try {
    
      await planService.update(plan.id, formData); 
      setErrorMsg("");
  
    } catch (err) {
      setErrorMsg("Failed to save location details. Please try again.");
      console.error("Error updating plan:", err);
    }
  }



  return (
    <>
 
      <SearchComponent />
     
      <div
        style={{
          marginLeft: "0px",
          width: "1012px",
          border: "solid",
          padding: "21px",
          borderRadius: "10px",
          borderWidth: "3px",
        }}
      >
        <h1 style={{ textAlign: "left" }}>The Plan</h1>
        <div>
          <div style={{ display: "flex" }}>
            <div>
              <h4>
                {plan.month} {plan.day}, {plan.year}
              </h4>
              <p>
                <strong>Notes:</strong> {plan.notes}
              </p>
              <p>
                <strong>Destination:</strong> {plan.destination}
              </p>
              <button onClick={handleEditClick}>Update</button>
            </div>

            <div style={{ marginLeft: "100px" }}>
              <Carousel />
            </div>
          </div>
        </div>
      </div>
      <PlanWhereForm planId={id} />
      <PlanFlightForm planId={id} />
 
    </>
  );
}
