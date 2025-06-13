import { useState, useEffect } from "react";
import * as profileService from "../../services/profileService";

export default function ProfileForm({ profile, setProfile }) {
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
    ],
  });

  const [isEditing, setIsEditing] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (profile) {
      setProfileData(profile);
      setIsEditing(false); // show the completed card if profile exists
    } else {
      setIsEditing(true);
    }
  }, [profile]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }

  function handlePetChange(evt, index) {
    const { name, value } = evt.target;
    const updatedPets = [...profileData.pet];
    updatedPets[index] = { ...updatedPets[index], [name]: value };
    setProfileData((prev) => ({ ...prev, pet: updatedPets }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setErrorMsg("");
    try {
      let updatedProfile;
      if (!profile?._id) {
        updatedProfile = await profileService.create(profileData);
      } else {
        updatedProfile = await profileService.update({
          ...profileData,
          _id: profile._id,
        });
      }
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setErrorMsg("Please try again.");
    }
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
          <button onClick={() => setIsEditing(true)}>Update</button>
        </div>
      )}
    </>
  );
}
