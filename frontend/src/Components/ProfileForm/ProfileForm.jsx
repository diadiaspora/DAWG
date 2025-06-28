import { useState, useEffect, useRef } from "react";
import * as profileService from "../../services/profileService";
import "./ProfileForm.css";



export default function ProfileForm({ profile, setProfile }) {
  const [showForm, setShowForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  console.log({ profile });


  const fileInputRef = useRef();

  const [profileData, setProfileData] = useState({
    username: "",
    bio: "",
  });
  const avatarImageRef = useRef();
  const passportImageRef = useRef();
  const importantDocsImageRef = useRef();


    const [isGallery, setIsGallery] = useState(true);
    

  function handleChange(evt) {
    const { name, value } = evt.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }



  async function handleSubmit(evt) {
    evt.preventDefault();
    setErrorMsg(""); 
    console.log({ profile });

    try {

      const imageData = new FormData();

      for (const key in profileData) {
        imageData.append(key, profileData[key]);
      }
   
      if (avatarImageRef.current && avatarImageRef.current.files[0]) {
        imageData.append("avatar", avatarImageRef.current.files[0]);
      }
      if (passportImageRef.current && passportImageRef.current.files[0]) {
        imageData.append("passport", passportImageRef.current.files[0]);
      }
      if (
        importantDocsImageRef.current &&
        importantDocsImageRef.current.files[0]
      ) {
        imageData.append(
          "importantDocs",
          importantDocsImageRef.current.files[0]
        );
      }
     
      console.log({ profileData });
      console.log({ imageData });





      const updated = await profileService.update(profile?._id, imageData);
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

            <label style={{ margin: "0px" }}>Upload Photo</label>
            <input
              style={{
                borderRadius: "7px",
                padding: "10px",
                height: "44px",
                width: "150px",
              }}
              name="avatar"
              type="file"
              accept=".png, .gif, .jpg, .jpeg"
              ref={avatarImageRef}
            />
            <label style={{ margin: "0px" }}>Upload Passport</label>
            <input
              style={{
                borderRadius: "7px",
                padding: "10px",
                height: "44px",
                width: "150px",
              }}
              name="passport"
              type="file"
              accept=".png, .gif, .jpg, .jpeg"
              ref={passportImageRef}
            />
            <label style={{ margin: "0px" }}>Upload Important Docs</label>
            <input
              style={{
                borderRadius: "7px",
                padding: "10px",
                height: "44px",
                width: "150px",
              }}
              name="importantDocs"
              type="file"
              accept=".png, .gif, .jpg, .jpeg"
              ref={importantDocsImageRef}
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
                    src={profile.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png"}
                    alt="avatar"
                    style={{ width: "200px" }}
                  />
             
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
                <div style={{ marginTop: "42px" }}>{/* <PlanIndex />  */}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
