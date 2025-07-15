import { useState, useRef, useEffect } from "react";
import * as petService from "../../services/petService";
import { toast } from "react-toastify";

export default function UserPetComponent({
  onSuccess,
  user,
  mode = "edit",
  pet,
}) {
  const [formData, setFormData] = useState({
    petName: "",
    bio: "",
    breed: "",
    age: "",
    weight: "",
  });

  const [previewPetPhoto, setPreviewPetPhoto] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const petPhotoImageRef = useRef();
  const microchipImageRef = useRef();
  const vaccineImageRef = useRef();
  const healthCertificateImageRef = useRef();

  useEffect(() => {
    if (pet) {
      setFormData({
        petName: pet.petName || "",
        bio: pet.bio || "",
        breed: pet.breed || "",
        age: pet.age || "",
        weight: pet.weight || "",
      });
      setPreviewPetPhoto(pet.petPhoto || null);
    }
  }, [pet]);

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

      await petService.update(pet._id, newPetData);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error updating pet:", err);
      setErrorMsg(`Failed to update pet: ${err.message || "Unknown error"}`);
    }
  }

  async function confirmDeletePet() {
    try {
      await petService.deletePet(pet._id);
      toast.success("Pet deleted successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error deleting pet:", err);
      toast.error("Failed to delete pet.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <label>Pet Photo:</label>
      <input
        type="file"
        accept="image/*"
        ref={petPhotoImageRef}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) setPreviewPetPhoto(URL.createObjectURL(file));
        }}
      />
      {previewPetPhoto && (
        <img src={previewPetPhoto} alt="Preview" style={{ width: "100px" }} />
      )}

      <label>Pet Name:</label>
      <input
        type="text"
        name="petName"
        value={formData.petName}
        onChange={handleChange}
      />

      <label>Bio:</label>
      <textarea name="bio" value={formData.bio} onChange={handleChange} />

      <label>Breed:</label>
      <input
        type="text"
        name="breed"
        value={formData.breed}
        onChange={handleChange}
      />

      <label>Age:</label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />

      <label>Weight:</label>
      <input
        type="text"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
      />

      <label>Vaccine:</label>
      <input type="file" accept=".pdf,image/*" ref={vaccineImageRef} />

      <label>Microchip:</label>
      <input type="file" accept=".pdf,image/*" ref={microchipImageRef} />

      <label>Health Certificate:</label>
      <input
        type="file"
        accept=".pdf,image/*"
        ref={healthCertificateImageRef}
      />

      <button type="submit">Update Pet</button>

      <button
        type="button"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this pet?")) {
            confirmDeletePet();
          }
        }}
        style={{ marginLeft: "12px", color: "red" }}
      >
        Delete Pet
      </button>
    </form>
  );
}
