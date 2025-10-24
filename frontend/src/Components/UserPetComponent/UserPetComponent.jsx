import { useState, useRef, useEffect } from "react";
import * as petService from "../../services/petService";
import { toast } from "react-toastify";
import { LiaUserEditSolid } from "react-icons/lia";

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
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "white",
        paddingTop: "22px",
        height: "280px",
        width: "310px",
        border: "1px solid #e9e9e9",
        borderRadius: "7px",
        padding: "21px",
      }}
    >
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <div style={{ display: "flex" }}>
        <label htmlFor="avatar-pet" style={{ cursor: "pointer" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#F2F4F7",
              border: "1px solid #BCC7D4",
              borderRadius: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {previewPetPhoto ? (
              <img
                src={previewPetPhoto}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <LiaUserEditSolid size={40} color="#1E3769" />
            )}
          </div>
        </label>

        <input
          id="avatar-pet"
          name="pet"
          type="file"
          accept=".png, .gif, .jpg, .jpeg"
          ref={petPhotoImageRef}
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) setPreviewPetPhoto(URL.createObjectURL(file));
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Pet Name:</label>
          <input
            type="text"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Breed:</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            style={{ width: "100px" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{ width: "84px" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Weight:</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            style={{ width: "84px" }}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Bio:</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} />
      </div>

      <div
        style={{
          width: "268px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="submit"
          style={{
            color: "#1E3769",
            backgroundColor: "#ffffff",
            borderColor: "#fffffff",
            textDecoration: "underline",
            borderWidth: "0px",
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this pet?")) {
              confirmDeletePet();
            }
          }}
          style={{
            marginLeft: "12px",
            color: "#1E3769",
            backgroundColor: "#ffffff",
            borderColor: "#fffffff",
            textDecoration: "underline",
            borderWidth: "0px",
          }}
        >
          Delete Pet
        </button>
      </div>
    </form>
  );
}
