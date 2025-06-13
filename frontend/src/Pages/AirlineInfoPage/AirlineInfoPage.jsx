import { useParams } from "react-router-dom";
import airlinePrices from "../../Data/airlinePrices.json";

export default function AirlineInfoPage() {
  const { airline, location } = useParams();

  const airlineData = airlinePrices[airline];
  const price = airlineData ? airlineData[location] : null;

  if (!airlineData || !price) {
    return <h1>Sorry, we don't have info for that airline or destination.</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        {airline.replace("-", " ").toUpperCase()} - {location.toUpperCase()}
      </h1>
      <p>Base fee: ${price}</p>
      <p>
        This is the estimated fee for a {location} flight with{" "}
        {airline.replace("-", " ")}.
      </p>
    </div>
  );
}
