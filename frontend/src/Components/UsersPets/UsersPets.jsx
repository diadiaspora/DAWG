// UserPets.jsx
import { useEffect, useState, useRef} from "react";
import * as petService from "../../services/petService";
import { useNavigate } from "react-router";

export default function UserPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [petData, setPetData] = useState(null);
  

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

  // if (loading) return <p>Loading pets...</p>;
  // if (!pets.length) return (
  //   <p>
  //     {" "}
  //     <div>
  //       <button
  //         onClick={() => navigate("/addpet")}
  //         style={{
  //           height: "44px",
  //           marginLeft: "21px",
  //           marginTop: "21px",
  //           width: "262px",
  //           backgroundColor: "#1E3769",
  //           borderWidth: "0px",
  //           borderRadius: "7px",
  //         }}
  //       >
  //         Add Pet
  //       </button>
  //     </div>
  //   </p>
  // );

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
                height: "345px",
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
            <form onSubmit={handleSubmit}>
              <h2>Add Pet</h2>

              <div style={{ display: "flex" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="petPhoto" style={{ marginLeft: "0px" }}>
                    Pet Photo
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
                    value={formData.petName}
                    onChange={handleChange}
                    style={{ width: "200px" }}
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
                  value={formData.bio}
                  onChange={handleChange}
                  style={{ width: "300px" }}
                />
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "12px",
                  }}
                >
                  <label htmlFor="breed" style={{ marginLeft: "0px" }}>
                    Breed
                  </label>
                  <input
                    type="text"
                    name="breed"
                    id="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    style={{ width: "100px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "12px",
                  }}
                >
                  <label htmlFor="age" style={{ marginLeft: "0px" }}>
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                    style={{ width: "100px" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="weight" style={{ marginLeft: "0px" }}>
                    Weight
                  </label>
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

              <div style={{ marginTop: "12px" }}>
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <label htmlFor="vaccine" style={{ marginLeft: "0px" }}>
                        Upload Vaccine Record
                      </label>
                    </div>
                    <input
                      id="vaccine"
                      name="vaccine"
                      type="file"
                      accept=".png, .gif, .jpg, .jpeg, .pdf"
                      ref={vaccineImageRef}
                      style={{ width: "150px" }}
                    />
                    {petData?.vaccine &&
                      petData.vaccine !== "https://i.imgur.com/KTEjbsw.png" && (
                        <a
                          href={petData.vaccine}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Current Vaccine Record
                        </a>
                      )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "12px",
                    }}
                  >
                    <div>
                      <label htmlFor="microchip" style={{ marginLeft: "0px" }}>
                        Upload Microchip Info
                      </label>
                    </div>
                    <input
                      id="microchip"
                      name="microchip"
                      type="file"
                      accept=".png, .gif, .jpg, .jpeg, .pdf"
                      ref={microchipImageRef}
                      style={{ width: "150px" }}
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

                  <div style={{ marginLeft: "12px" }}>
                    <label
                      htmlFor="healthCertificate"
                      style={{ marginLeft: "0px" }}
                    >
                      Upload Health Certificate
                    </label>
                    <input
                      id="healthCertificate"
                      name="healthCertificate"
                      type="file"
                      accept=".png, .gif, .jpg, .jpeg, .pdf"
                      ref={healthCertificateImageRef}
                      style={{ width: "150px" }}
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

              <div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "white",
                    color: "#1E3769",
                    borderWidth: "0px",
                    textDecoration: "underline",
                  }}
                >
                  Add Pet Information
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
