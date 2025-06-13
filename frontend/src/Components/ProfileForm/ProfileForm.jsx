import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as profileService from "../../services/profileService";

export default function ProfileForm({ profileId, setProfileId }) {
  const [profileData, setProfileData] = useState({
    bio: "",
    pets: "",
    posts: "",
    blogs: "",
    passportNumber: "",
    gallery: "",
    pet: [
      {
        breed: "",
        age: "",
        weight: "",
        microchipNumber: "",
        vaccineNumber: "",
        document: "",
      },
    ]
  });

  const [isEditing, setIsEditing] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setProfileData({ ...profileData, [name]: value });
  }

  function handlePetChange(evt, index) {
    const { name, value } = evt.target;
    setProfileData((prevData) => {
      const updatedPets = [...prevData.pet];
      updatedPets[index] = {
        ...updatedPets[index],
        [name]: value,
      };
      return {
        ...prevData,
        pet: updatedPets,
      };
    });
  }
  
  

  async function handleSubmit(evt) {
    evt.preventDefault();
    setErrorMsg("");
    try {
      let profile;
      if (!profileId) {
        profile = await profileService.create(profileData);
        setProfileId(profile._id);
      } else {
        const updatedProfile = await profileService.update(
          profileId,
          profileData
        );
        if (!updatedProfile) throw new Error("Update failed");
      }
      setIsEditing(false);
    } catch (err) {
      setErrorMsg("Please try again.");
    }
  }

  function handleEditClick() {
    setIsEditing(true); 
  }



  return (
    <>
      {isEditing ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>Pet Breed</label>
            <input
              name="breed"
              value={profileData.pet[0]?.breed || ""}
              onChange={(evt) => handlePetChange(evt, 0)}
              style={{ width: "180px" }}
            />
            <label>Pet Age</label>
            <input
              name="age"
              value={profileData.pet[0]?.age || ""}
              onChange={(evt) => handlePetChange(evt, 0)}
              style={{ width: "180px" }}
            />

            <label>Bio</label>
            <input
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              style={{ width: "180px" }}
            />

            <button type="submit">Save</button>
          </form>
          <p className="error-message">&nbsp;{errorMsg}</p>
        </div>
      ) : (
        <div>
          <h4>{profileData.pet[0]?.breed}</h4>
          <p>
            <strong>Age:</strong> {profileData.pet[0]?.age}
          </p>
          <p>
            <strong>Notes:</strong> {profileData.bio}
          </p>
          <button onClick={handleEditClick}>Update</button>
        </div>
      )}

      {errorMsg && <p className="error">{errorMsg}</p>}
    </>
  );
};

