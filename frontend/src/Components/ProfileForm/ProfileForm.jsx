import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as profileService from "../../services/profileService";


import "./ProfileForm.css";

export default function ProfileForm({ profile, setProfile, user }) {
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
      <div style={{display:"flex"}}>
        <section style={{ width: "310px", marginRight: "21px" }}>
          {showForm ? (
            <div>
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: "white",
                  height: "350px",
                  marginLeft: "42px",
                  width: "310px",
                  display: "grid",
                  paddingTop: "22px",
                  paddingLeft: "0px",
                  border: "1px solid #e9e9e9",
                  borderRadius: "7px",
                  marginRight: "0px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", marginLeft: "21px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "0px",
                      }}
                    >
                      <label
                        style={{
                          marginLeft: "0px",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Username
                      </label>
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

                      <label
                        style={{
                          marginLeft: "0px",
                          fontSize: "14px",
                          fontWeight: "600",
                          marginTop: "12px",
                        }}
                      >
                        Upload Photo
                      </label>
                      <input
                        style={{
                          width: "180px",
                          height: "44px",
                          backgroundColor: "#F2F4F7",
                          borderWidth: "1px",
                          borderColor: "#BCC7D4",
                        }}
                        name="avatar"
                        type="file"
                        accept=".png, .gif, .jpg, .jpeg"
                        ref={avatarImageRef}
                      />
                      <label
                        style={{
                          margin: "0px",
                          fontSize: "14px",
                          fontWeight: "600",
                          marginTop: "12px",
                        }}
                      >
                        Upload Passport
                      </label>
                      <input
                        style={{
                          borderRadius: "7px",
                          padding: "10px",
                          height: "44px",
                          width: "180px",
                          backgroundColor: "#F2F4F7",
                          borderWidth: "1px",
                          borderColor: "#BCC7D4",
                        }}
                        name="passport"
                        type="file"
                        accept=".png, .gif, .jpg, .jpeg"
                        ref={passportImageRef}
                      />
                      <label
                        style={{
                          margin: "0px",
                          fontSize: "14px",
                          fontWeight: "600",
                          marginTop: "12px",
                        }}
                      >
                        Upload Important Docs
                      </label>
                      <input
                        style={{
                          borderRadius: "7px",
                          padding: "10px",
                          height: "44px",
                          width: "180px",
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "42px",
                      }}
                    >
                      <label
                        style={{
                          margin: "0px",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Bio
                      </label>
                      <input
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        style={{
                          width: "320px",
                          height: "210px",
                          backgroundColor: "#F2F4F7",
                          borderWidth: "1px",
                          borderColor: "#BCC7D4",
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          width: "320px",
                          height: "44px",
                          borderWidth: "0px",
                          backgroundColor: "#1E3769",
                          marginTop: "18px",
                          borderRadius: "7px",
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <p className="error-message">&nbsp;{errorMsg}</p>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                width: "310px",
                height: "350px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#d9d9d9",
                borderRadius: "7px",
                padding: "0px",
                marginLeft: "42px",
                backgroundColor: "#DFE2E7",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: "180px",
                    padding: "0px",
                    height: "180px",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: "180px",
                      display: "block",
                    }}
                  >
                    <img
                      src={
                        profile.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png"
                      }
                      alt="avatar"
                      style={{
                        width: "80px",
                        borderRadius: "500px",
                        marginLeft: "21px",
                      }}
                    />

                    <button
                      onClick={() => setShowForm(true)}
                      style={{
                        color: "#1E3769",
                        backgroundColor: "#DFE2E7",
                        borderColor: "#DFE2E7",
                        textDecoration: "underline",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      Update
                    </button>
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: "42px",
                    }}
                  >
                    {profileData.username}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "#1E3769",
                    borderRadius: "7px",
                    width: "290px",

                    height: "180px",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <div>{profileData.bio}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "21px",
                    marginLeft: "43px",
                  }}
                >
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
              </div>
            </div>
          )}
        </section>
        
      </div>
    </>
  );
}
