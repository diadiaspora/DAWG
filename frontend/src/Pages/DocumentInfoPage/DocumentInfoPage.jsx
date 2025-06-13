// DocumentInfoPage.jsx
import { useParams } from "react-router-dom";
import documentsData from "../../Data/documents.json";

export default function DocumentInfoPage() {
  const { from, to } = useParams();

  const formatCountry = (name) => {
    switch (name.toLowerCase()) {
      case "usa":
        return "UnitedStates";
      case "mexico":
        return "Mexico";
      case "chile":
        return "Chile";
      default:
        return null;
    }
  };

  const fromKey = formatCountry(from);
  const toKey = formatCountry(to);

  const fromCountry = documentsData[fromKey];
  const toCountry = documentsData[toKey];

  if (!fromCountry || !toCountry) {
    return <h1>Sorry, we don't have document info for that route.</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        Traveling with Pets: {fromKey} to {toKey}
      </h1>

      {/* Export Info */}
      <div style={{ marginTop: "30px" }}>
        <h2>Exporting from {fromKey}</h2>
        <h4>Required Documents:</h4>
        <ul>
          {fromCountry.export.documents.map((doc, idx) => (
            <li key={idx}>{doc}</li>
          ))}
        </ul>
        <p>
          <strong>Export Fee:</strong>{" "}
          {fromCountry.export.fee_usd !== null
            ? `$${fromCountry.export.fee_usd}`
            : "Not listed"}
        </p>
      </div>

      {/* Import Info */}
      <div style={{ marginTop: "30px" }}>
        <h2>Importing to {toKey}</h2>
        <h4>Required Documents:</h4>
        <ul>
          {toCountry.import.documents.map((doc, idx) => (
            <li key={idx}>{doc}</li>
          ))}
        </ul>
        <p>
          <strong>Import Fee:</strong>{" "}
          {toCountry.import.fee_usd !== null
            ? `$${toCountry.import.fee_usd}`
            : "Not listed"}
        </p>
      </div>
    </div>
  );
}
