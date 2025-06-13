import { useState, useEffect } from "react";
import * as profileService from "../../services/profileService";

export default function ProfileForm({ profileId }) {

  const [profileData, setProfileData] = useState({

    id: profileId,
    bio: "",
    pets: "",
    posts: "",
    blogs: "",
    passportNumber: "",
    gallery: "",
    dogName:"",
    breed: "",
    age:"",
    weight: "",
    microchipNumber:"",
    vaccineNumber:"",

  });

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => { }, [profileId]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setProfileData((prev) => ({ ...prev, [name]: value, id: profileId }));
  }
  async function handleSubmit(evt) {
    evt.preventDefault();
    setShowForm(false);
    try {
      await profileService.update(profileData);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg("Failed to save location details. Please try again.");
    }
  }

  return (
    <>
      <h2>{profileData.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>Pet Name</label>
        <input
          name="petName"
          value={profileData.petName}
          onChange={handleChange}
          style={{ width: "180px" }}
        />
        <label>Pet Breed</label>
        <input
          name="breed"
          value={profileData.breed}
          onChange={handleChange}
          style={{ width: "180px" }}
        />
        <label>Pet Age</label>
        <input
          name="age"
          value={profileData.age}
          onChange={handleChange}
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
    </>
  );
};

