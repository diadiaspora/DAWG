import { useState, useRef, useEffect } from "react";
import * as petService from "../../services/petService"; 
import { useNavigate } from "react-router-dom"; 

export default function PetComponent({ onSuccess, user, mode = "edit" }) {
  const [previewPetPhoto, setPreviewPetPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSuccess = () => window.location.reload();

  const [petData, setPetData] = useState(null);

  const [formData, setFormData] = useState({
    petName: "",
    bio: "",
    breed: "",
    age: "",
    weight: "",
  });

  const [showForm, setShowForm] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const [loading, setLoading] = useState(true);

  const petPhotoImageRef = useRef();
  const microchipImageRef = useRef();
  const vaccineImageRef = useRef();
  const healthCertificateImageRef = useRef();

  useEffect(() => {
    if (mode === "create") {
      setLoading(false);
      setShowForm(true); 
      return;
    }

    async function getPet() {
      try {
        setLoading(true);

        const pets = await petService.index();
        if (pets && pets.length > 0) {
          const existingPet = pets[0];
          setPetData(existingPet);
          setFormData({
            petName: existingPet.petName || "",
            bio: existingPet.bio || "",
            breed: existingPet.breed || "",
            age: existingPet.age || "",
            weight: existingPet.weight || "",
          });
          setShowForm(false);
        } else {
          setShowForm(true);
        }
      } catch (err) {
        console.error("Error fetching pet data:", err);
        setErrorMsg("Failed to load pet data.");
        setShowForm(true);
      } finally {
        setLoading(false);
      }
    }

    getPet();
  }, [mode]); 

  useEffect(() => {
    if (petData?.petPhoto) {
      setPreviewPetPhoto(petData.petPhoto);
    }
  }, [petData?.petPhoto]);
 
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setErrorMsg(""); 

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
      setShowForm(false); 
    } catch (err) {
      console.error("Error submitting pet form:", err);
      setErrorMsg(`Failed to save pet: ${err.message || "Unknown error"}.`);
    }

    if (onSuccess) {
      onSuccess(); 
    }
  }

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this pet profile?")) {
      try {
        await petService.deletePet(petData._id);
        setPetData(null); 
        setFormData({
   
          petName: "",
          bio: "",
          breed: "",
          age: "",
          weight: "",
        });
        setShowForm(true); 
        setErrorMsg("");
        navigate("/my-pets"); 
      } catch (err) {
        console.error("Error deleting pet:", err);
        setErrorMsg("Failed to delete pet profile.");
      }
    }
  }

  return (
    <div >
      <div >
        {errorMsg && <p>{errorMsg}</p>}

        {showForm ? (
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "white",
              height: "280px",
              marginLeft: "42px",
              width: "310px",
              display: "grid",
              paddingTop: "22px",
              paddingLeft: "0px",
              border: "1px solid #e9e9e9",
              borderRadius: "7px",
              marginRight: "0px",
            }}
          >
            <h2 style={{ marginTop: "24px" }}>Add Pet</h2>
            <div style={{ display: "flex" }}>
  

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "12px",
                }}
              >
                <label htmlFor="petName" style={{ marginLeft: "0px" }}>
                  Pet Name
                </label>
                <input
                  type="text"
                  name="petName" 
                  id="petName"
                  style={{ width: "200px" }}
                  value={formData.petName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
           
            <div style={{ display: "flex" }}>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "12px",
                  }}
                >
        
                </div>
              </div>
              <div>
   
                  </div>
        
                  </div>
              

            <div>
              <button type="submit">Add Pet</button>
            </div>
          </form>
        ) : (
          <div style={{ marginTop: "100px", marginLeft: "42px" }}>
            <h2>My Pets</h2>
            {petData && (
              <div
                style={{
                  width: "463px",
                  borderStyle: "solid",
                  borderColor: "#BCC7D4",
                  borderRadius: "7px",
                  padding: "12px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      src={
                        previewPetPhoto ||
                        petData.petPhoto ||
                        "https://i.ibb.co/5x5Td7ks/av-1.png"
                      }
                      style={{
                        width: "150px",
                        borderRadius: "7px",
                      }}
                      alt={`${petData.petName}'s photo`}
                    />
                  </div>
                  <div>
                    <h3>{petData.petName}</h3>
                    <div>
                      <span>Breed:</span>
                      <span>{petData.breed}</span>
                    </div>
                    <div>
                      <span>Age:</span>
                      <span>{petData.age} years</span>
                    </div>
                    <div>
                      <span>Weight:</span>
                      <span>{petData.weight}</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: "14px" }}>{petData.bio}</p>
                <div></div>

                <div>
                  <h4>{petData.petName}'s Documents</h4>
                  <button
                    style={{
                      backgroundColor: "#1E3769",
                      borderWidth: "0px",
                      height: "44px",
                      width: "130px",
                      marginRight: "12px",
                    }}
                  >
                    Vaccine
                  </button>
                  <button
                    style={{
                      backgroundColor: "#1E3769",
                      borderWidth: "0px",
                      height: "44px",
                      width: "130px",
                      marginRight: "12px",
                    }}
                  >
                    Health Certificate
                  </button>
                  <button
                    style={{
                      backgroundColor: "#1E3769",
                      borderWidth: "0px",
                      height: "44px",
                      width: "130px",
                    }}
                  >
                    Microchip
                  </button>
                  <div>
                    {petData.vaccine &&
                      petData.vaccine !== "https://i.imgur.com/KTEjbsw.png" && (
                        <a
                          href={petData.vaccine}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-white text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg px-4 py-2 shadow hover:shadow-md transition-all duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414L14.586 5A2 2 0 0115 5.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h7V5.414L12.414 4H6zM8 7a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Vaccine Record</span>
                        </a>
                      )}
                    {petData.microchip &&
                      petData.microchip !==
                        "https://i.imgur.com/KTEjbsw.png" && (
                        <a
                          href={petData.microchip}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-white text-green-600 hover:text-green-800 border border-green-300 rounded-lg px-4 py-2 shadow hover:shadow-md transition-all duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.293 2.293a1 1 0 001.414-1.414L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Microchip Info</span>
                        </a>
                      )}
                    {petData.healthCertificate &&
                      petData.healthCertificate !==
                        "https://i.imgur.com/KTEjbsw.png" && (
                        <a
                          href={petData.healthCertificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-white text-purple-600 hover:text-purple-800 border border-purple-300 rounded-lg px-4 py-2 shadow hover:shadow-md transition-all duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Health Certificate</span>
                        </a>
                      )}
                  </div>
                </div>

                <div>
                  <button
                    style={{
                      backgroundColor: "#ffffff00",
                      borderWidth: "0px",
                      color: "#1E3769",
                    }}
                    onClick={() => setShowForm(true)}
                  >
                    Update Pet Information
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
