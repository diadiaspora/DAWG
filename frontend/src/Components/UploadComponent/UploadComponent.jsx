import { useState, useRef, useEffect } from "react";
import * as petService from "../../services/petService"; // Corrected import path
import { useNavigate } from "react-router-dom"; // Keep useNavigate if you use it

export default function UploadComponent() {
  const [previewPetPhoto, setPreviewPetPhoto] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  
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
        setShowForm(true); // Default to showing the form if fetching fails
      } finally {
        setLoading(false);
      }
    }
    getPet();
  }, []); // Empty dependency array means this runs once on mount

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

  // Handles form submission (create or update)
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
      if (newPetData) {
        // If newPetData exists, it's an update operation
        updatedPet = await petService.update(petData._id, newPetData);
      } else {
        // Otherwise, it's a create operation
        updatedPet = await petService.create(newPetData);
      }

      setPetData(updatedPet); // Update the petData state with the new/updated pet
      setShowForm(false); // Hide the form and show the card
     
    } catch (err) {
      console.error("Error submitting pet form:", err);
      setErrorMsg(`Failed to save pet: ${err.message || "Unknown error"}.`);
    }
  }

  // Function to handle deleting the pet
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

  if (loading) {
    return <div className="p-4 text-center">Loading pet data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        {/* Error message display */}
        {errorMsg && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errorMsg}
          </p>
        )}

        {showForm ? (
          // Form for adding/updating pet info
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              {petData ? "Update Pet Information" : "Add Pet Information"}
            </h2>

            {/* Pet Photo Section */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={
                  previewPetPhoto ||
                  petData?.petPhoto ||
                  "https://i.ibb.co/5x5Td7ks/av-1.png"
                }
                alt="Pet Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md mb-4"
              />
              <label
                htmlFor="petPhoto"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload Pet Photo
              </label>
              <input
                id="petPhoto"
                name="petPhoto"
                type="file"
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

            {/* Basic Pet Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="petName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pet Name
                </label>
                <input
                  type="text"
                  name="petName" // Corrected name to 'petName'
                  id="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <input
                  type="text"
                  name="bio"
                  id="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="breed"
                  className="block text-sm font-medium text-gray-700"
                >
                  Breed
                </label>
                <input
                  type="text"
                  name="breed"
                  id="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  id="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Important Documents Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Important Documents
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                These documents are only accessible by you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Vaccine Upload */}
                <div>
                  <label
                    htmlFor="vaccine"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Upload Vaccine Record
                  </label>
                  <input
                    id="vaccine"
                    name="vaccine"
                    type="file"
                    accept=".png, .gif, .jpg, .jpeg, .pdf"
                    ref={vaccineImageRef}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {petData?.vaccine &&
                    petData.vaccine !== "https://i.imgur.com/KTEjbsw.png" && (
                      <a
                        href={petData.vaccine}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm mt-2 block"
                      >
                        View Current Vaccine Record
                      </a>
                    )}
                </div>

                {/* Microchip Upload */}
                <div>
                  <label
                    htmlFor="microchip"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Upload Microchip Info
                  </label>
                  <input
                    id="microchip"
                    name="microchip"
                    type="file"
                    accept=".png, .gif, .jpg, .jpeg, .pdf"
                    ref={microchipImageRef}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {petData?.microchip &&
                    petData.microchip !== "https://i.imgur.com/KTEjbsw.png" && (
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

                {/* Health Certificate Upload */}
                <div>
                  <label
                    htmlFor="healthCertificate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Upload Health Certificate
                  </label>
                  <input
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

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                {petData ? "Update Pet Information" : "Add Pet Information"}
              </button>
            </div>
          </form>
        ) : (
          // Pet Card View
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              My Pet Profile
            </h2>
            {petData && (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-lg flex flex-col items-center">
                <img
                  src={
                    previewPetPhoto ||
                    petData.petPhoto ||
                    "https://i.ibb.co/5x5Td7ks/av-1.png"
                  }
                  alt={`${petData.petName}'s photo`}
                  className="w-48 h-48 rounded-full object-cover border-4 border-purple-500 shadow-md mb-6"
                />
                <h3 className="text-4xl font-bold text-gray-800 mb-2">
                  {petData.petName}
                </h3>
                <p className="text-gray-600 text-lg mb-4">{petData.bio}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full max-w-sm">
                  <div className="flex items-center text-gray-700">
                    <span className="font-semibold w-24">Breed:</span>
                    <span>{petData.breed}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="font-semibold w-24">Age:</span>
                    <span>{petData.age} years</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="font-semibold w-24">Weight:</span>
                    <span>{petData.weight}</span>
                  </div>
                </div>

                <div className="mt-8 text-center w-full">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    Documents
                  </h4>
                  <div className="flex flex-wrap justify-center gap-4">
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

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Update Pet Information
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Delete Pet Profile
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
