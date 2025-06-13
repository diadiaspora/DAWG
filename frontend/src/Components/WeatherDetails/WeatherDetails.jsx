

const WeatherDetails = (props) => {
  console.log("WeatherDetails props:", props);
  return (
    <section>
      <h2>Weather Details</h2>
      <p>Location: {props.weather?.location?.name}</p>
      <p>Temperature: {props.weather?.current?.temp_f}</p>
      <p>Condition: {props.weather?.current?.condition?.text}</p>
    </section>
  );
};

export default WeatherDetails;
