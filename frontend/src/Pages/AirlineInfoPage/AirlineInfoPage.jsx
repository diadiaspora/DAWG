import { useParams } from "react-router-dom";
import airlinePrices from "../../Data/airlinePrices.json";

export default function AirlineInfoPage() {
  const { airline, location } = useParams();
  const airlineData = airlinePrices[airline];
  const flightData = airlineData ? airlineData[location] : null;

  if (!airlineData || !flightData) {
    return <h1>Sorry, we don't have info for that airline or destination.</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        {airline.replace("-", " ").toUpperCase()} – {location.toUpperCase()}
      </h1>
      <p>
        <strong>Base Fee:</strong> ${flightData.fee}
      </p>
      <p>
        <strong>Pets in Cabin Allowed:</strong> {flightData.max_in_cabin}
      </p>
      <p>
        <strong>Pets in Cargo Allowed:</strong>{" "}
        {flightData.cargo_available ? "Yes" : "No"}
      </p>
      <p>
        <strong>Service Animal Fee:</strong> ${flightData.service_animal_fee}
      </p>
      <p>
        <strong>Emotional Support Animal Fee:</strong>{" "}
        {flightData.esa_fee !== null
          ? `$${flightData.esa_fee}`
          : "Not accepted"}
      </p>

      <h3>Documents Required for Service Animals:</h3>
      <ul>
        {flightData.docs_service_animal.map((doc, index) => (
          <li key={index}>{doc}</li>
        ))}
      </ul>

      {flightData.docs_esa ? (
        <>
          <h3>Documents Required for Emotional Support Animals:</h3>
          <ul>
            {flightData.docs_esa.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>
          <em>This airline no longer accepts emotional support animals.</em>
        </p>
      )}
    </div>
  );
}
