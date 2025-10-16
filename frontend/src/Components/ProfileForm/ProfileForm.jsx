import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as profileService from "../../services/profileService";
import { RxAvatar } from "react-icons/rx";
import { LiaUserEditSolid } from "react-icons/lia";

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
      <div style={{ display: "flex" }}>
        <section style={{ width: "310px", marginRight: "21px" }}>
          {showForm ? (
            <div>
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: "white",
                  height: "280px",
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginLeft: "0px",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <label
                            htmlFor="avatar-upload"
                            style={{ cursor: "pointer" }}
                          >
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
                              }}
                            >
                              <LiaUserEditSolid size={40} color="#1E3769" />
                            </div>
                          </label>

                          <input
                            id="avatar-upload"
                            name="avatar"
                            type="file"
                            accept=".png, .gif, .jpg, .jpeg"
                            ref={avatarImageRef}
                            style={{ display: "none" }}
                            onChange={(e) => {
                              console.log(e.target.files[0]);
                            }}
                          />

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: "21px",
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
                              pattern="^[a-z0-9._]+$"
                              title="Username must be lowercase and can only include letters, numbers, dots (.), and underscores (_). No spaces."
                              oninput="this.value = this.value.toLowerCase();"
                              style={{
                                width: "162px",
                                height: "44px",
                                backgroundColor: "#F2F4F7",
                                borderWidth: "1px",
                                borderColor: "#BCC7D4",
                              }}
                            />
                          </div>
                        </div>
                        <label
                          style={{
                            marginTop: "10px",
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
                            width: "268px",

                            height: "110px",
                            borderStyle: "solid",
                            backgroundColor: "#F2F4F7",
                            borderWidth: "1px",
                            borderColor: "#BCC7D4",
                            borderRadius: "7px",
                            display: "flex",
                          }}
                        />
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
                      </div>
                      {/* <label
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
                      /> */}
                      {/* <label
                        style={{
                          margin: "0px",
                          fontSize: "14px",
                          fontWeight: "600",
                          marginTop: "12px",
                        }}
                      >
                        Upload Important Docs
                      </label> */}
                      {/* <input
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
                      /> */}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "42px",
                      }}
                    ></div>
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
                height: "280px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#d9d9d9",
                borderRadius: "7px",
               
                marginLeft: "42px",
                backgroundColor: "#DFE2E7",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                padding: "21px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: "268px",
                    padding: "0px",
                    height: "180px",
                    display: "flex",
                    marginBottom: "0px",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      display: "block",
                    }}
                  >
                    <img
                      src={
                        profile.avatar || (
                          <RxAvatar
                            htmlFor="avatar-upload"
                            style={{
                              width: "80px",
                              height: "80px",
                              backgroundColor: "#F2F4F7",
                              border: "1px solid #BCC7D4",
                              borderRadius: "200px",
                              textAlign: "center",
                              lineHeight: "44px",
                              cursor: "pointer",
                            }}
                          />
                        )
                      }
                      alt="avatar"
                      style={{
                        width: "80px",
                        borderRadius: "500px",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      className="username"
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: "0px",
                        width: "100px",
                        marginLeft: "21px",
                        marginBottom: "8px",
                      }}
                    >
                      {profileData.username}
                      </div>
                      <div style={{marginLeft: "21px"}}> <button>Your Passport</button></div>
                  </div>
                </div>

                <div style={{ marginTop: "50px" }}>
                  <div
                    style={{
                      display: "flex",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "#1E3769",
                      borderRadius: "7px",
                      width: "268px",
                      marginTop: "-40px",
                      height: "120px",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <div>{profileData.bio}</div>
                  </div>

                  <div
                    style={{
                      width: "268px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={() => setShowForm(true)}
                      style={{
                        color: "#1E3769",
                        backgroundColor: "#DFE2E7",
                        borderColor: "#DFE2E7",
                        textDecoration: "underline",
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "-20px",
                    marginTop: "12px",
                  }}
                >
                  <Link to="https://ektatraveling.tpx.gr/hVLd6uOc">
                    <div
                      style={{
                          height: "215px",
                        width: "310px",
                        borderStyle: "solid",
                        marginTop: "21px",
                        borderRadius: "7px",
                        marginBottom: "21px",
                        borderColor: "#d9d9d9",
                      }}
                    >
                      You need insurance
                    </div>
                  </Link>
                  {/* <div>
                    <strong style={{ fontSize: "14px" }}>
                      {profile.username}'s Passport
                    </strong>
                    <div style={{ display: "flex" }}>
                      <div>
                        <a
                          href={profile.passport || "#"}
                          target={profile.passport ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: "#1E3769",
                            border: "none",
                            borderRadius: "7px",
                            color: "white",
                            padding: "6px",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: "600",
                            width: "144px",
                            height: "34px",
                            display: "inline-block",
                            textAlign: "center",
                            pointerEvents: profile.passport ? "auto" : "none",
                            opacity: profile.passport ? 1 : 0.5,
                          }}
                        >
                          {profile.passport ? "View" : "Add"}
                        </a>
                      </div>
                      <div>
                        <label
                          htmlFor="passport-upload"
                          style={{
                            backgroundColor: "#1E3769",
                            border: "none",
                            borderRadius: "7px",
                            color: "white",
                            padding: "6px",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: "600",
                            width: "144px",
                            display: "inline-block",
                            textAlign: "center",
                            height: "34px",
                            marginLeft: "21px",
                          }}
                        >
                          {profile.passport ? "Replace" : "Upload"}
                        </label>
                        <input
                          id="passport-upload"
                          name="passport"
                          type="file"
                          accept=".png, .gif, .jpg, .jpeg, .pdf"
                          style={{ display: "none" }}
                          ref={passportImageRef}
                        />
                      </div>
                    </div>
                  </div> */}

                  {/* <div>
                    <strong style={{ fontSize: "14px" }}>
                      {profile.username}'s Important Docs
                    </strong>
                    <div style={{ display: "flex" }}>
                      <div>
                        <a
                          href={profile.importantDocs || "#"}
                          target={profile.importantDocs ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: "#1E3769",
                            border: "none",
                            borderRadius: "7px",
                            color: "white",
                            padding: "6px",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: "600",
                            width: "144px",
                            height: "34px",
                            display: "inline-block",
                            textAlign: "center",
                            pointerEvents: profile.importantDocs
                              ? "auto"
                              : "none",
                            opacity: profile.importantDocs ? 1 : 0.5,
                          }}
                        >
                          {profile.importantDocs ? "View" : "Add"}
                        </a>
                      </div>
                      <div>
                        <label
                          htmlFor="importantDocs-upload"
                          style={{
                            backgroundColor: "#1E3769",
                            border: "none",
                            borderRadius: "7px",
                            color: "white",
                            padding: "6px",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: "600",
                            width: "144px",
                            display: "inline-block",
                            textAlign: "center",
                            height: "34px",
                            marginLeft: "21px",
                          }}
                        >
                          {profile.importantDocs ? "Replace" : "Upload"}
                        </label>
                        <input
                          id="importantDocs-upload"
                          name="importantDocs"
                          type="file"
                          accept=".png, .gif, .jpg, .jpeg, .pdf"
                          style={{ display: "none" }}
                          ref={importantDocsImageRef}
                        />
                      </div> */}
                  {/* </div> */}
                  {/* </div> */}
                </div>

                {/* <button
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
                  </button> */}
                {/* <button
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
                  </button> */}
                {/* </div> */}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
