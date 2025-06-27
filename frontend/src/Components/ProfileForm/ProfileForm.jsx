import { useState, useEffect } from "react";
import * as profileService from "../../services/profileService";
import "./ProfileForm.css";



export default function ProfileForm({ profile, setProfile }) {
  const [showForm, setShowForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

console.log(profile);

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

  // Update form data once profile is fetched
  useEffect(() => {
    if (profile) {
      const hasExistingData =
        profile.bio || (profile.pet && profile.pet[0]?.breed);

      if (hasExistingData) {
        setShowForm(false);
      } else {
        setShowForm(true);
      }

      setProfileData({
        bio: profile.bio || "",
        pets: profile.pets || "",
        posts: profile.posts || "",
        blogs: profile.blogs || "",
        passportNumber: profile.passportNumber || "",
        gallery: profile.gallery || "",
        pet: [
          {
            breed: profile.pet?.[0]?.breed || "",
            age: profile.pet?.[0]?.age || "",
            weight: profile.pet?.[0]?.weight || "",
            microchipNumber: profile.pet?.[0]?.microchipNumber || "",
            vaccineNumber: profile.pet?.[0]?.vaccineNumber || "",
            document: profile.pet?.[0]?.document || "",
          },
        ],
      });
    }
  }, [profile]);

    const [isGallery, setIsGallery] = useState(true);
    

  function handleChange(evt) {
    const { name, value } = evt.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }

  // function handlePetChange(evt, index) {
  //   const { name, value } = evt.target;
  //   setProfileData((prev) => ({
  //     ...prev,
  //     pet: [{ ...prev.pet[0], [name]: value }],
  //   }));
  // }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const updated = await profileService.update(profile?._id, profileData);
      setErrorMsg("");
      setShowForm(false);
      setProfile(updated); // Let parent update
    } catch (err) {
      setErrorMsg("Failed to save profile details. Please try again.");
      console.error("Error updating profile:", err);
    }
  }

  if (!profile) return <div>Loading...</div>;

  return (
    <>
      {showForm ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              name="username"
              value={profileData.username}
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
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "1012px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "#d9d9d9",
            borderRadius: "7px",
            padding: "21px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                width: "300px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#d9d9d9",
                borderRadius: "7px",
                padding: "20px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <strong> Bio </strong>
              <div>
                <div style={{ width: "300px" }}>
                  <img
                    src="https://i.ibb.co/5x5Td7ks/av-1.png"
                    alt="avatar"
                    style={{ width: "200px" }}
                  />
                  <h1></h1>
                </div>
              </div>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  borderRadius: "7px",
                  height: "44px",
                  backgroundColor: "#1E3769",
                }}
              >
                Update
              </button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#d9d9d9",
                borderRadius: "7px",
                width: "640px",
                marginTop: "24px",
                marginLeft: "21px",
              }}
            >
              <div>{profileData.bio}</div>

       
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong
                style={{
                  marginLeft: "21px",
                  marginTop: "21px",
                  marginBottom: "6px",
                }}
              >
                Upcoming Trips
              </strong>
              <div
                style={{
                  backgroundColor: "#d9d9d9",
                  borderRadius: "7px",
                  width: "640px",
                  marginLeft: "21px",
                  height: "110px",
                }}
              >
                <div style={{ marginTop: "42px" }}>
                  {/* <PlanIndex />  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
