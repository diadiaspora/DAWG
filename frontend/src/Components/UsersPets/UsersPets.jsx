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
  const [vaccinePreviews, setVaccinePreviews] = useState({});

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

  async function handleVaccineUpload(petId, file) {
    try {
      const formData = new FormData();
      formData.append("vaccine", file);
      const updatedPet = await petService.update(petId, formData);
      setPets((prevPets) =>
        prevPets.map((p) => (p._id === petId ? updatedPet : p))
      );
    } catch (err) {
      console.error("Error uploading vaccine:", err);
    }
  }

  async function handleHealthCertificateUpload(petId, file) {
    try {
      const formData = new FormData();
      formData.append("healthCertificate", file);
      const updatedPet = await petService.update(petId, formData);
      setPets((prevPets) =>
        prevPets.map((p) => (p._id === petId ? updatedPet : p))
      );
    } catch (err) {
      console.error("Error uploading health certificate:", err);
    }
  }

  async function handleMicrochipUpload(petId, file) {
    try {
      const formData = new FormData();
      formData.append("microchip", file);
      const updatedPet = await petService.update(petId, formData);
      setPets((prevPets) =>
        prevPets.map((p) => (p._id === petId ? updatedPet : p))
      );
    } catch (err) {
      console.error("Error uploading microchip:", err);
    }
  }

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
    setErrorMsg(""); // Clear previous errors

    try {
      const newPetData = new FormData();

      for (const key in formData) {
        newPetData.append(key, formData[key]);
      }

      if (petPhotoImageRef.current && petPhotoImageRef.current.files[0]) {
        newPetData.append("petPhoto", petPhotoImageRef.current.files[0]);
      }
      if (vaccineImageRef.current && vaccineImageRef.current.files[0]) {
        newPetData.append("vaccine", vaccineImageRef.current.files[0]);
      }
      if (microchipImageRef.current && microchipImageRef.current.files[0]) {
        newPetData.append("microchip", microchipImageRef.current.files[0]);
      }
      if (
        healthCertificateImageRef.current &&
        healthCertificateImageRef.current.files[0]
      ) {
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
      await fetchPets();
      setShowForm(false);
    } catch (err) {
      console.error("Error submitting pet form:", err);
      setErrorMsg(`Failed to save pet: ${err.message || "Unknown error"}.`);
    }

    if (onSuccess) {
      onSuccess();
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
    <div>
      <div
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: "16px",
          width: "310px",
          height: "520px",
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
                  height: "280px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#d9d9d9",
                  borderRadius: "7px",
                  padding: "16px",
                  scrollSnapAlign: "start",
                  backgroundColor: "#DFE2E7",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex" }}>
                    <img
                      src={
                        pet.petPhoto || (
                          <RxAvatar
                            htmlFor="avatar-upload"
                            style={{
                              width: "80px",
                              height: "80px",
                              backgroundColor: "#F2F4F7",
                              border: "1px solid #BCC7D4",
                              borderRadius: "200px",
                              textAlign: "center",
                              lineHeight: "44px",
                              cursor: "pointer",
                            }}
                          />
                        )
                      }
                      alt={pet.petName}
                      style={{ width: "80px", borderRadius: "100px" }}
                    />
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: "21px",
                        width: "100px",
                        marginLeft: "21px",
                        marginBottom: "21px",
                      }}
                    >
                      {pet.petName}
                    </div>
                  </div>
                  <div style={{ marginTop: "62px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderColor: "#1E3769",
                        borderRadius: "7px",
                        width: "268px",
                        marginTop: "-40px",
                        height: "120px",
                        backgroundColor: "#ffffff",
                        fontSize: "14px",
                      }}
                    >
                      <div>
                        {pet.petName} is a {pet.age} year old {pet.breed}. He
                        weighs {pet.weight}.
                      </div>
                      <div>{pet.bio}</div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "268px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={() => setEditingPetId(pet._id)}
                    style={{
                      color: "#1E3769",
                      backgroundColor: "#DFE2E7",
                      borderColor: "#DFE2E7",
                      textDecoration: "underline",
                    }}
                  >
                    Update
                  </button>
                </div>

                <div style={{ marginLeft: "-16px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "20px",
                      gap: "12px",
                      // alignItems: "left",
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: "14px" }}>
                        {pet.petName}'s Vaccine
                      </strong>
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "310px" }}>
                          <a
                            href={pet.vaccine || "#"}
                            target={pet.vaccine ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: "#1E3769",
                              border: "none",
                              borderRadius: "7px",
                              color: "white",
                              padding: "6px",
                              textDecoration: "none",
                              fontSize: "14px",
                              fontWeight: "600",
                              width: "144px",
                              height: "34px",
                              display: "inline-block",
                              textAlign: "center",
                              pointerEvents: pet.vaccine ? "auto" : "none",
                              opacity: pet.vaccine ? 1 : 0.5,
                            }}
                          >
                            {pet.vaccine ? "View" : "Add"}
                          </a>
                        </div>

                        <div>
                          <label
                            htmlFor={`vaccine-${pet._id}`}
                            style={{
                              backgroundColor: "#1E3769",
                              border: "none",
                              borderRadius: "7px",
                              color: "white",
                              padding: "6px",
                              textDecoration: "none",
                              fontSize: "14px",
                              fontWeight: "600",
                              width: "144px",
                              display: "inline-block",
                              textAlign: "center",
                              height: "34px",
                              marginLeft: "21px",
                            }}
                          >
                            {pet.vaccine ? "Replace " : "Upload "}
                          </label>
                          <input
                            id={`vaccine-${pet._id}`}
                            name="vaccine"
                            type="file"
                            accept=".png, .gif, .jpg, .jpeg, .pdf"
                            style={{ display: "none" }}
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                await handleVaccineUpload(pet._id, file);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <strong style={{ fontSize: "14px" }}>
                        {pet.petName}'s Health Certificate
                      </strong>
                      <div style={{ display: "flex" }}>
                        {/* Health Certificate */}
                        <div>
                       
                            <a
                              href={pet.vaccine || "#"}
                              target={pet.vaccine ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: "#1E3769",
                                border: "none",
                                borderRadius: "7px",
                                color: "white",
                                padding: "6px",
                                textDecoration: "none",
                                fontSize: "14px",
                                fontWeight: "600",
                                width: "144px",
                                height: "34px",
                                display: "inline-block",
                                textAlign: "center",
                                pointerEvents: pet.vaccine ? "auto" : "none", // disable link if no doc
                                opacity: pet.vaccine ? 1 : 0.5, // faded if no doc
                              }}
                            >
                              {pet.vaccine ? "View" : "Add"}
                            </a>
                       
                        </div>
                        <div>
                          <label
                            htmlFor={`healthCertificate-${pet._id}`}
                            style={{
                              backgroundColor: "#1E3769",
                              border: "none",
                              borderRadius: "7px",
                              color: "white",
                              padding: "6px",
                              textDecoration: "none",
                              fontSize: "14px",
                              fontWeight: "600",
                              width: "144px",
                              display: "inline-block",
                              textAlign: "center",
                              height: "34px",
                              marginLeft: "21px",
                            }}
                          >
                            {pet.healthCertificate ? "Replace" : "Upload "}
                          </label>
                          <input
                            id={`healthCertificate-${pet._id}`}
                            name="healthCertificate"
                            type="file"
                            accept=".png, .gif, .jpg, .jpeg, .pdf"
                            style={{ display: "none" }}
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                await handleHealthCertificateUpload(
                                  pet._id,
                                  file
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <strong style={{ fontSize: "14px" }}>
                        {pet.petName}'s Health Microchip
                      </strong>
                      <div style={{ display: "flex" }}>
                        <div>
                       
                            <a
                              href={pet.vaccine || "#"}
                              target={pet.vaccine ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: "#1E3769",
                                border: "none",
                                borderRadius: "7px",
                                color: "white",
                                padding: "6px",
                                textDecoration: "none",
                                fontSize: "14px",
                                fontWeight: "600",
                                width: "144px",
                                height: "34px",
                                display: "inline-block",
                                textAlign: "center",
                                pointerEvents: pet.vaccine ? "auto" : "none", // disable link if no doc
                                opacity: pet.vaccine ? 1 : 0.5, // faded if no doc
                              }}
                            >
                              {pet.vaccine ? "View" : "Add"}
                            </a>
                         
                        </div>
                        <div>
                          <label
                            htmlFor={`microchip-${pet._id}`}
                            style={{
                              backgroundColor: "#1E3769",
                              border: "none",
                              borderRadius: "7px",
                              color: "white",
                              padding: "6px",
                              textDecoration: "none",
                              fontSize: "14px",
                              fontWeight: "600",
                              width: "144px",
                              display: "inline-block",
                              textAlign: "center",
                              height: "34px",
                              marginLeft: "21px",
                            }}
                          >
                            {pet.microchip ? "Replace " : "Upload "}
                          </label>
                          <input
                            id={`microchip-${pet._id}`}
                            name="microchip"
                            type="file"
                            accept=".png, .gif, .jpg, .jpeg, .pdf"
                            style={{ display: "none" }}
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                await handleMicrochipUpload(pet._id, file);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          <div>
            <div>
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
  padding: "12px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "12px",
  width: "300px",
};

const viewButtonStyle = {
  backgroundColor: "#1E3769",
  borderWidth: "0px",
  height: "44px",
  marginRight: "12px",
  borderRadius: "7px",
  color: "white",
  padding: "12px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "12px",
  width: "300px",
};

const uploadLabelStyle = {
  backgroundColor: "#1E3769",
  borderWidth: "0px",
  height: "44px",
  marginRight: "12px",
  borderRadius: "7px",
  color: "white",
  padding: "12px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "12px",
  width: "300px",
};
