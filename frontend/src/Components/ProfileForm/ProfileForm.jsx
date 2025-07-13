import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as profileService from "../../services/profileService";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";

import "./ProfileForm.css";



export default function ProfileForm({ profile, setProfile }) {
  const [showForm, setShowForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  console.log({ profile });

  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [profileData, setProfileData] = useState({
    username: "",
    bio: "",
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        username: profile.username || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);


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
      setProfile(updated);
      const refreshedProfiles = await profileService.index();
      const refreshedProfile = refreshedProfiles.find(
        (p) => p._id === updated._id
      );
      if (refreshedProfile) {
        setProfile(refreshedProfile);
      }

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
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "white",
              height: "350px",
              marginLeft: "42px",
              width: "662px",
              display: "grid",
              gap: "1.2vmin",
              padding: "4vmin",
              border: "1px solid #e9e9e9",
              borderRadius: "7px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", marginLeft: "42px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ marginLeft: "0px" }}>Username</label>
                  <input
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    style={{
                      width: "180px",
                      height: "44px",
                      backgroundColor: "#F2F4F7",
                      borderWidth: "1px",
                      borderColor: "#BCC7D4",
                    }}
                  />

                  <label style={{ alignContent: "center" }}>Upload Photo</label>
                  <input
                    style={{
                      borderRadius: "150px",
                      paddingTop: "50px",
                      height: "150px",
                      width: "150px",
                      backgroundColor: "#F2F4F7",
                      borderWidth: "1px",
                      borderColor: "#BCC7D4",
                    }}
                    name="avatar"
                    type="file"
                    accept=".png, .gif, .jpg, .jpeg"
                    ref={avatarImageRef}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "42px",
                  }}
                >
                  <label>Bio</label>
                  <input
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    style={{
                      width: "280px",
                      height: "200px",
                      backgroundColor: "#F2F4F7",
                      borderWidth: "1px",
                      borderColor: "#BCC7D4",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginLeft: "0px", display: "flex" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ margin: "0px" }}>Upload Passport</label>
                  <input
                    style={{
                      borderRadius: "7px",
                      padding: "10px",
                      height: "44px",
                      width: "150px",
                      backgroundColor: "#F2F4F7",
                      borderWidth: "1px",
                      borderColor: "#BCC7D4",
                    }}
                    name="passport"
                    type="file"
                    accept=".png, .gif, .jpg, .jpeg"
                    ref={passportImageRef}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ margin: "0px" }}>Upload Important Docs</label>
                  <input
                    style={{
                      borderRadius: "7px",
                      padding: "10px",
                      height: "44px",
                      width: "150px",
                      backgroundColor: "#F2F4F7",
                      borderWidth: "1px",
                      borderColor: "#BCC7D4",
                    }}
                    name="importantDocs"
                    type="file"
                    accept=".png, .gif, .jpg, .jpeg"
                    ref={importantDocsImageRef}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: "150px",
                    height: "44px",
                    borderWidth: "0px",
                    backgroundColor: "#1E3769",
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
          <p className="error-message">&nbsp;{errorMsg}</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "632px",
            height: "350px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "#d9d9d9",
            borderRadius: "7px",
            padding: "21px",
              marginLeft: "42px",
            backgroundColor: "#ffffff"
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
              <div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {profileData.username}
                </div>
                <div
                  style={{
                    width: "200px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <img
                    src={profile.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png"}
                    alt="avatar"
                    style={{
                      width: "200px",
                      borderRadius: "500px",
                    }}
                  />
                  <button
                    onClick={() => setShowForm(true)}
                    style={{
                      color: "#1E3769",
                      backgroundColor: "#ffffff",
                      borderColor: "#ffffff",
                      textDecoration: "underline",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
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
                width: "262px",
                marginTop: "4px",
                marginLeft: "21px",
                height: "140px",
              }}
            >
              <div>{profileData.bio}</div>
            </div>
            <div style={{ display: "flex", marginTop: "21px" }}>
              <button
                style={{
                  height: "44px",
                  width: "120px",
                  borderRadius: "7px",
                  backgroundColor: "#1E3769",
                  borderWidth: "0px",
                  marginLeft: "21px",
                }}
              >
                Passport
              </button>
              <button
                style={{
                  height: "44px",
                  width: "120px",
                  borderRadius: "7px",
                  backgroundColor: "#1E3769",
                  borderWidth: "0px",
                  marginLeft: "21px",
                }}
              >
                Important Docs
              </button>
            </div>
            <div>
              <button
                onClick={() => navigate("/addpet")}
                style={{
                  height: "44px",
                  marginLeft: "21px",
                  marginTop: "21px",
                  width: "262px",
                  backgroundColor: "#1E3769",
                  borderWidth: "0px",
                  borderRadius: "7px",
                }}
              >
                Add Pet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
