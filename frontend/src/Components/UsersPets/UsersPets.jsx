// UserPets.jsx
import { useEffect, useState } from "react";
import * as petService from "../../services/petService";
import { useNavigate } from "react-router-dom";

export default function UserPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPets();
  }, []);

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

  if (loading) return <p>Loading pets...</p>;
  if (!pets.length) return <p>No pets found.</p>;

  return (
    <div className="mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">My Pets</h2>

      {/* Outer container to hide overflow */}
      <div
        style={{
          overflowX: "auto",
          paddingBottom: "16px",
          width: "500px",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Scrollable row of cards */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            scrollSnapType: "x mandatory",
            paddingBottom: "8px",
            scrollbarWidth: "thin",
            scrollbarColor: "#1E3769 #f0f0f0",
          }}
        >
          {pets.map((pet) => (
            <div
              key={pet._id}
              style={{
                flex: "0 0 auto",
                width: "300px",
                border: "1px solid #BCC7D4",
                borderRadius: "8px",
                padding: "16px",
                scrollSnapAlign: "start",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={pet.petPhoto || "https://i.ibb.co/5x5Td7ks/av-1.png"}
                alt={pet.petName}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-2">{pet.petName}</h3>
              <p>
                <strong>Breed:</strong> {pet.breed}
              </p>
              <p>
                <strong>Age:</strong> {pet.age}
              </p>
              <p>
                <strong>Weight:</strong> {pet.weight}
              </p>
              <p className="text-sm mt-2">{pet.bio}</p>

              <div className="mt-4 space-y-2">
                {pet.vaccine && (
                  <a
                    href={pet.vaccine}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700"
                  >
                    View Vaccine
                  </a>
                )}
                {pet.healthCertificate && (
                  <a
                    href={pet.healthCertificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700"
                  >
                    View Health Certificate
                  </a>
                )}
                {pet.microchip && (
                  <a
                    href={pet.microchip}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700"
                  >
                    View Microchip
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate("/addpet")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
        >
          Add Pet
        </button>
      </div>
    </div>
  );
}
