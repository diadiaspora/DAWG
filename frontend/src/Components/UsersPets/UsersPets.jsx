
import { useEffect, useState, useRef } from "react";
import * as petService from "../../services/petService";
import { useNavigate } from "react-router-dom";
import PetComponent from "../PetComponent/PetComponent";
import UserPetComponent from "../UserPetComponent/UserPetComponent";

export default function UsersPets({ user }) {
  const [showForm, setShowForm] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [petData, setPetData] = useState(null);
  const [editingPetId, setEditingPetId] = useState(null);

  const petPhotoImageRef = useRef();
  const microchipImageRef = useRef();
  const vaccineImageRef = useRef();
  const healthCertificateImageRef = useRef();

  const [formData, setFormData] = useState({
    petName: "",
    bio: "",
    breed: "",
    age: "",
    weight: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

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

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const newPetData = new FormData();

      for (const key in formData) {
        newPetData.append(key, formData[key]);
      }

      if (petPhotoImageRef.current?.files[0]) {
        newPetData.append("petPhoto", petPhotoImageRef.current.files[0]);
      }
      if (vaccineImageRef.current?.files[0]) {
        newPetData.append("vaccine", vaccineImageRef.current.files[0]);
      }
      if (microchipImageRef.current?.files[0]) {
        newPetData.append("microchip", microchipImageRef.current.files[0]);
      }
      if (healthCertificateImageRef.current?.files[0]) {
        newPetData.append(
          "healthCertificate",
          healthCertificateImageRef.current.files[0]
        );
      }

      let updatedPet;
      if (petData && petData._id) {
        updatedPet = await petService.update(petData._id, newPetData);
      } else {
        updatedPet = await petService.create(newPetData);
      }

      setPetData(updatedPet);
      setShowForm(false);
      fetchPets();
    } catch (err) {
      console.error("Error submitting pet form:", err);
    }
  }

  function handleDelete(petId) {
    petService
      .deletePet(petId)
      .then(() => {
        fetchPets();
      })
      .catch((err) => {
        console.error("Error deleting pet:", err);
      });
  }

  return (
    <div className="mt-10 px-4">
      <div
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: "16px",
          width: "310px",
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
          {pets.map((pet) =>
            editingPetId === pet._id ? (
              <UserPetComponent
                key={pet._id}
                user={user}
                mode="edit"
                pet={pet}
                onSuccess={() => {
                  fetchPets();
                  setEditingPetId(null);
                }}
              />
            ) : (
              <div
                key={pet._id}
                style={{
                  flex: "0 0 auto",
                  width: "310px",
                  height: "350px",
                  border: "1px solid #BCC7D4",
                  borderRadius: "8px",
                  padding: "16px",
                  scrollSnapAlign: "start",
                  backgroundColor: "#DFE2E7",
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    src={pet.petPhoto || "https://i.ibb.co/5x5Td7ks/av-1.png"}
                    alt={pet.petName}
                    style={{ width: "80px", borderRadius: "100px" }}
                  />
                  <div style={{ marginLeft: "12px", marginTop: "32px" }}>
                    <h2 style={{ fontSize: "16px" }}>{pet.petName}</h2>
                    <div style={{ display: "flex", marginTop: "-20px" }}>
                      <p style={{ fontSize: "14px", fontWeight: "600" }}>
                        {pet.breed}
                      </p>
                      &nbsp;&nbsp;
                      <p style={{ fontSize: "14px", fontWeight: "600" }}>
                        {pet.age} yrs old
                      </p>
                      &nbsp;&nbsp;
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
                      style={buttonStyle}
                      onClick={() =>
                        window.open(
                          pet.vaccine,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      Vaccine
                    </button>
                  )}
                  {pet.healthCertificate && (
                    <button
                      style={buttonStyle}
                      onClick={() =>
                        window.open(
                          pet.healthCertificate,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      Health Certificate
                    </button>
                  )}
                  {pet.microchip && (
                    <button
                      style={buttonStyle}
                      onClick={() =>
                        window.open(
                          pet.microchip,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      Microchip
                    </button>
                  )}
                </div>

                <div
                  style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                  <button
                    onClick={() => setEditingPetId(pet._id)}
                    style={{
                      color: "#1E3769",
                      backgroundColor: "#DFE2E7",
                      borderColor: "#DFE2E7",
                      textDecoration: "underline",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Update
                  </button>
                  <button onClick={() => handleDelete(pet._id)} >Delete</button>
                </div>
              </div>
            )
          )}

          <div
            style={{
              flex: "0 0 auto",
              width: "550px",
              height: "345px",
              border: "1px solid #BCC7D4",
              borderRadius: "8px",
              padding: "16px",
              scrollSnapAlign: "start",
              backgroundColor: "#fff",
            }}
          >
            <div style={{ paddingTop: "100px", paddingLeft: "42px" }}>
              <PetComponent
                onSuccess={() => window.location.reload()}
                user={user}
                mode="create"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#1E3769",
  borderWidth: "0px",
  height: "44px",
  marginRight: "12px",
  borderRadius: "7px",
  color: "white",
  padding: "0 12px",
};
