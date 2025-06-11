import { useState, useEffect } from "react";
import * as profileService from "../../services/profileService";

export default function ProfileForm({ profileId }) {

  const [profileData, setProfileData] = useState({

    id: profileId,
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
        <label>Name</label>
        <input
          name="name"
          value={profileData.name}
          onChange={handleChange}
          style={{ width: "180px" }}
        />
        <button type="submit">Save</button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
};

