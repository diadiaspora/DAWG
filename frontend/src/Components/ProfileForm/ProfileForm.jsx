import { useState, useEffect } from "react";
import * as profileService from "../../services/profileService";

export default function ProfileForm({ profile }) {
  console.log({ profile });
  const [showForm, setShowForm] = useState(profile ? false : true);

  const [profileData, setProfileData] = useState({
    bio: profile?.bio || "",
    pets: profile?.pets || "",
    posts: profile?.post || "",
    blogs: profile?.blogs || "",
    passportNumber: profile?.passportNumber || "",
    gallery: profile?.gallery || "",
    pet: [
      {
        breed: profile?.pet[0].breed || "",
        age: profile?.pet[0].age || "",
        weight: profile?.pet[0].weight || "",
        microchipNumber: profile?.pet[0].microchipNumber || "",
        vaccineNumber: profile?.pet[0].vaccineNumber || "",
        document: profile?.pet[0].document || "",
      },
    ],
  });



  // const [isEditing, setIsEditing] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {

  }, [profile]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }

  function handlePetChange(evt, index) {
    const { name, value } = evt.target;

    setProfileData((prev) => ({
      ...prev,
      pet: [{ ...prev.pet[0], [name]: value }],
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    // setErrorMsg("");

        try {
          await profileService.update(profile?._id, profileData);
          setErrorMsg("");
          setShowForm(false);
        } catch (err) {
          setErrorMsg("Failed to save profile details. Please try again.");
          console.error("Error updating plan:", err);
        }
    // try {
    //   let updatedProfile;
    //   if (!profile?._id) {
    //     updatedProfile = await profileService.create(profileData);
    //   } else {
    //     updatedProfile = await profileService.update({
    //       ...profileData,
    //       _id: profile._id,
    //     });
    //   }
    //   setProfile(updatedProfile);
    //   setIsEditing(false);
    // } catch (err) {
    //   console.error(err);
    //   setErrorMsg("Please try again.");
    // }
  }
  if (!profile) {
    return <div> loading...</div>;
  }
  return (
    <>
      {showForm ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>Pet Breed</label>
            <input
              name="breed"
              value={profileData.pet[0].breed}
              onChange={(evt) => handlePetChange(evt, 0)}
              style={{ width: "180px" }}
            />
            <label>Pet Age</label>
            <input
              name="age"
              type="number"
              value={profileData.pet[0].age}
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
          <h4>{profileData.pet[0].breed}</h4>
          <p>
            <strong>Age:</strong> {profileData.pet[0].age}
          </p>
          <p>
            <strong>Notes:</strong> {profileData.bio}
          </p>
          {/* <button onClick={() => setIsEditing(true)}>Update</button> */}
          <button onClick={() => setShowForm(true)}>Update</button>
        </div>
      )}
    </>
  );
}
