import { useState, useRef, useEffect } from "react";
import * as petService from "../../services/petService"; // Corrected import path
import { useNavigate } from "react-router"; // Keep useNavigate if you use it

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
      setShowForm(true); // show the form right away for creation
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
  }, [mode]); // Empty dependency array means this runs once on mount

  useEffect(() => {
    if (petData?.petPhoto) {
      setPreviewPetPhoto(petData.petPhoto);
    }
  }, [petData?.petPhoto]);
  // Handles changes to text input fields
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      setPetData(updatedPet); // Update the petData state with the new/updated pet
      setShowForm(false); // Hide the form and show the card
    } catch (err) {
      console.error("Error submitting pet form:", err);
      setErrorMsg(`Failed to save pet: ${err.message || "Unknown error"}.`);
    }

    if (onSuccess) {
      onSuccess(); // Triggers redirect or re-fetch logic
    }
  }

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this pet profile?")) {
      try {
        await petService.deletePet(petData._id);
        setPetData(null); // Clear pet data
        setFormData({
          // Reset form data
          petName: "",
          bio: "",
          breed: "",
          age: "",
          weight: "",
        });
        setShowForm(true); // Show the form for creating a new pet
        setErrorMsg("");
        navigate("/my-pets"); // Example: Navigate to a pets list page
      } catch (err) {
        console.error("Error deleting pet:", err);
        setErrorMsg("Failed to delete pet profile.");
      }
    }
  }

  return (
    <div style={{ marginTop: "-150px" }}>
      <div style={{ marginTop: "0px" }}>
        {errorMsg && <p>{errorMsg}</p>}

        {showForm ? (
          <form onSubmit={handleSubmit} style={{ marginTop: "0px" }}>
            <h2 style={{ marginTop: "0px" }}>Add Pet</h2>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="petPhoto" style={{ marginLeft: "0px" }}>
                  Upload Pet Photo
                </label>
                <input
                  id="petPhoto"
                  name="petPhoto"
                  type="file"
                  style={{ width: "100px" }}
                  accept=".png, .gif, .jpg, .jpeg"
                  ref={petPhotoImageRef}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPreviewPetPhoto(URL.createObjectURL(file));
                    }
                  }}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

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
                  name="petName" // Corrected name to 'petName'
                  id="petName"
                  style={{ width: "200px" }}
                  value={formData.petName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="bio" style={{ marginLeft: "0px" }}>
                Bio
              </label>
              <textarea
                type="text"
                name="bio"
                id="bio"
                style={{ width: "300px" }}
                value={formData.bio}
                onChange={handleChange}
              />
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
                  <div>
                    <label htmlFor="breed" style={{ marginLeft: "0px" }}>
                      Breed
                    </label>
                  </div>
                  <input
                    type="text"
                    name="breed"
                    id="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    style={{ width: "100px" }}
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "12px",
                  }}
                >
                  <div>
                    <label htmlFor="age" style={{ marginLeft: "0px" }}>
                      Age
                    </label>
                  </div>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                    style={{ width: "100px" }}
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "12px",
                  }}
                >
                  <div>
                    <label htmlFor="weight" style={{ marginLeft: "0px" }}>
                      Weight
                    </label>
                  </div>
                  <input
                    type="text"
                    name="weight"
                    id="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    style={{ width: "100px" }}
                  />
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "12px",
                  }}
                >
                  <div>
                    <label htmlFor="vaccine" style={{ marginLeft: "0px" }}>
                      Upload Vaccine
                    </label>
                  </div>
                  <div>
                    <input
                      style={{ width: "140px" }}
                      id="vaccine"
                      name="vaccine"
                      type="file"
                      accept=".png, .gif, .jpg, .jpeg, .pdf"
                      ref={vaccineImageRef}
                    />

                    {petData?.vaccine &&
                      petData.vaccine !== "https://i.imgur.com/KTEjbsw.png" && (
                        <a
                          href={petData.vaccine}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Current Vaccine
                        </a>
                      )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "12px",
                  }}
                >
                  <div>
                    <label htmlFor="microchip" style={{ marginLeft: "0px" }}>
                      Upload Microchip
                    </label>
                  </div>
                  <div>
                    <input
                      style={{ width: "140px" }}
                      id="microchip"
                      name="microchip"
                      type="file"
                      accept=".png, .gif, .jpg, .jpeg, .pdf"
                      ref={microchipImageRef}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {petData?.microchip &&
                      petData.microchip !==
                        "https://i.imgur.com/KTEjbsw.png" && (
                        <a
                          href={petData.microchip}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm mt-2 block"
                        >
                          View Current Microchip Info
                        </a>
                      )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "12px",
                  }}
                >
                  <div>
                    <label
                      htmlFor="healthCertificate"
                      style={{ marginLeft: "0px" }}
                    >
                      Upload
                    </label>
                  </div>
                  <div>
                    <input
                      style={{ width: "100px" }}
                      id="healthCertificate"
                      name="healthCertificate"
                      type="file"
                      accept=".png, .gif, .jpg, .jpeg, .pdf"
                      ref={healthCertificateImageRef}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {petData?.healthCertificate &&
                      petData.healthCertificate !==
                        "https://i.imgur.com/KTEjbsw.png" && (
                        <a
                          href={petData.healthCertificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm mt-2 block"
                        >
                          View Current Health Certificate
                        </a>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button type="submit">Add Pet Information</button>
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
