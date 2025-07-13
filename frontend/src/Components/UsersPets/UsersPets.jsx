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
  if (!pets.length) return (
    <p>
      {" "}
      <div>
        <button
          onClick={() => navigate("/addpet")}
          style={{
            height: "44px",
            marginLeft: "21px",
            marginTop: "21px",
            width: "262px",
            backgroundColor: "#1E3769",
            borderWidth: "0px",
            borderRadius: "7px",
          }}
        >
          Add Pet
        </button>
      </div>
    </p>
  );

  return (
    <div className="mt-10 px-4">
      <div
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: "16px",
          width: "350px",
          height: "350px",
          marginLeft: "42px",
          WebkitOverflowScrolling: "touch",
        }}
      >
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
                width: "350px",
                height: "320px",
                border: "1px solid #BCC7D4",
                borderRadius: "8px",
                padding: "16px",
                scrollSnapAlign: "start",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <img
                    src={pet.petPhoto || "https://i.ibb.co/5x5Td7ks/av-1.png"}
                    alt={pet.petName}
                    style={{ width: "80px", borderRadius: "100px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "12px",
                    marginTop: "32px",
                  }}
                >
                  <div>
                    <h2 style={{ fontSize: "16px" }}>{pet.petName}</h2>
                  </div>
                  <div style={{ display: "flex", marginTop: "-20px" }}>
                    <p style={{ fontSize: "14px", fontWeight: "600" }}>
                      {pet.breed}
                    </p>
                    &nbsp; &nbsp;
                    <p style={{ fontSize: "14px", fontWeight: "600" }}>
                      {pet.age} yrs old
                    </p>
                    &nbsp; &nbsp;
                    <p style={{ fontSize: "14px", fontWeight: "600" }}>
                      {pet.weight}
                    </p>
                  </div>
                </div>
              </div>

              <p>{pet.bio}</p>

              <div>
                {pet.vaccine && (
                  <button
                    style={{
                      backgroundColor: "#1E3769",
                      borderWidth: "0px",
                      height: "44px",
                      marginRight: "12px",
                      borderRadiius: "7px",
                    }}
                    onClick={() =>
                      window.open(pet.vaccine, "_blank", "noopener,noreferrer")
                    }
                  >
                    Vaccine
                  </button>
                )}
                {pet.healthCertificate && (
                  <button
                    style={{
                      backgroundColor: "#1E3769",
                      borderWidth: "0px",
                      height: "44px",
                      marginRight: "12px",
                      borderRadiius: "7px",
                    }}
                    onClick={() =>
                      window.open(
                        pet.healthCertificate,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="block w-full bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700 mb-2"
                  >
                    Health Certificate
                  </button>
                )}
                {pet.microchip && (
                  <button
                    style={{
                      backgroundColor: "#1E3769",
                      borderWidth: "0px",
                      height: "44px",
                      borderRadiius: "7px",
                    }}
                    onClick={() =>
                      window.open(
                        pet.microchip,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="block w-full bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700"
                  >
                    Microchip
                  </button>
                )}
              </div>
              <div>
                <p>Update</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
