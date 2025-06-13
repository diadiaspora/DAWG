import { useParams } from "react-router-dom";
import servicesData from "../../Data/serviceInfo.json";

export default function ServicesInfoPage() {
  const { service, location } = useParams();
  const locData = servicesData[location];
  const list = locData ? locData[service] : null;

  if (!locData || !list) {
    return (
      <h1>
        No information found for "{service}" in "{location}"
      </h1>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        {service.charAt(0).toUpperCase() + service.slice(1)} in{" "}
        {location.replace(/([A-Z])/g, " $1")}
      </h1>
      {list.map((item, idx) => (
        <div key={idx} style={{ marginBottom: "1.5rem" }}>
          <h3>{item.name}</h3>
          <ul>
            {item.services.map((svc, i) => (
              <li key={i}>{svc}</li>
            ))}
          </ul>
          {item.address && (
            <p>
              <strong>Address:</strong> {item.address}
            </p>
          )}
          {item.contact && (
            <p>
              <strong>Contact:</strong> {item.contact}
            </p>
          )}
          {item.source && (
            <p>
              <em>Source: {item.source}</em>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
