import { useEffect, useState } from "react";
import * as petService from "../../services/petService";

export default function UserPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPets() {
      try {
        const petList = await petService.index();
        setPets(petList);
      } catch (err) {
        console.error("Error fetching pets:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, []);

  if (loading) return <p>Loading pets...</p>;
  if (!pets.length) return <p>No pets found.</p>;

  return (
    <div style={{ marginTop: "32px" }}>
      <h2>My Pets</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {pets.map((pet) => (
          <div
            key={pet._id}
            style={{
              width: "250px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <img
              src={pet.petPhoto || "https://i.ibb.co/5x5Td7ks/av-1.png"}
              alt={pet.petName}
              style={{ width: "100%", borderRadius: "6px" }}
            />
            <h3>{pet.petName}</h3>
            <p>
              <strong>Breed:</strong> {pet.breed}
            </p>
            <p>
              <strong>Age:</strong> {pet.age}
            </p>
            <p>
              <strong>Weight:</strong> {pet.weight}
            </p>
            <p>{pet.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
