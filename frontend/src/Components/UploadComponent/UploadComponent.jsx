import { useState, useRef} from "react";
import * as profileService from "../../services/profileService";
import { useNavigate, Link } from "react-router-dom";



export default function UploadComponent({ profile, setProfile }) {
    const [showForm, setShowForm] = useState(profile ? false : true);
    
    const [errorMsg, setErrorMsg] = useState("");

      const [profileData, setProfileData] = useState({

      });
    
      const profileId = profile?._id;

  const avatarImageRef = useRef();
  const passportImageRef = useRef();
  const microchipImageRef = useRef();
  const vaccineImageRef = useRef();
const healthCertificateImageRef = useRef();
    
    function handleChange(evt) {
      const { name, value } = evt.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        console.log({ profile });

      if (!profile || !profile._id) {
        setErrorMsg("Profile ID is missing. Please try again later.");
        console.error("Profile is undefined or missing _id");
        return;
      }
      
    try {
      const formData = new FormData();

      // Append all text fields from blogData state
      for (const key in profileData) {
        formData.append(key, profileData[key]);
      }

      // Append contentOneImage (required)
      if (passportImageRef.current && passportImageRef.current.files[0]) {
        formData.append("passport", passportImageRef.current.files[0]);
      }

      // Append other optional image files if they are selected
      if (
        microchipImageRef.current &&
        microchipImageRef.current.files.length > 0
      ) {
        formData.append(
          "microchip",
          microchipImageRef.current.files[0]
        );
      }
        
      if (vaccineImageRef.current && vaccineImageRef.current.files.length > 0) {
          formData.append("vaccine", vaccineImageRef.current.files[0]);
          formData.append("petId", profile.pet[0]._id);
      }
        
      if (
        healthCertificateImageRef.current &&
        healthCertificateImageRef.current.files.length > 0
      ) {
        formData.append(
          "healthCertificate",
          healthCertificateImageRef.current.files[0]
        );
      }

     


        const updatedProfile = await profileService.update(profile._id, formData);
        console.log("profile._id:", profile?._id);
      setErrorMsg("");
      setProfile({ ...updatedProfile });
      setShowForm(false); 
    } catch (err) {
      const errorDetail = err.message || "Unknown error";
      console.error("Adding Doc Failed:", errorDetail, err);
      setErrorMsg(`Adding Doc Failed: ${errorDetail}. Please try again.`);
    }
  }

  return (
    <>
      <div style={{ margin: "0px", width: "1012px", borderStyle: "solid" }}>
        {showForm ? (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <img
                    src="https://i.ibb.co/5x5Td7ks/av-1.png"
                    alt="avatar"
                    style={{ width: "200px" }}
                  />
                  <label>Pet Name</label>
                  <input
                    name="breed"
                    // value={profileData.pet[0].breed}
                    // onChange={(evt) => handlePetChange(evt, 0)}
                    style={{ width: "180px" }}
                  />
                  <label>Bio</label>
                  <input
                    name="breed"
                    // value={profileData.pet[0].breed}
                    // onChange={(evt) => handlePetChange(evt, 0)}
                    style={{ width: "180px" }}
                  />
                  <label>Breed</label>
                  <input
                    name="breed"
                    // value={profileData.pet[0].breed}
                    // onChange={(evt) => handlePetChange(evt, 0)}
                    style={{ width: "180px" }}
                  />
                  <label>Breed</label>
                  <input
                    name="breed"
                    // value={profileData.pet[0].breed}
                    // onChange={(evt) => handlePetChange(evt, 0)}
                    style={{ width: "180px" }}
                  />
                </div>

                <div>
                  <strong>Important Documents</strong>
                  <div style={{ display: "flex" }}>
                    <p>
                      These documents are only accessible to be seen by you and
                      your dog
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div>
                    <label>Upload Vaccine</label>
                    <input
                      style={{
                        width: "200px",
                        borderRadius: "7px",
                        color: "white",
                        height: "44px",
                      }}
                      name="vaccine"
                      type="file"
                      accept=".png, .gif, .jpg, .jpeg"
                      ref={vaccineImageRef}
                    />
                  </div>

                  <div>
                    <label>Upload Microchip</label>
                    <input
                      style={{
                        width: "200px",
                        borderRadius: "7px",
                        color: "white",
                        height: "44px",
                      }}
                      name="microchip"
                      type="file"
                      accept=".png, .gif, .jpg, .jpeg"
                      ref={microchipImageRef}
                    />
                  </div>

                  <div>
                    <label>Upload Health Certificate</label>
                    <input
                      style={{
                        width: "200px",
                        borderRadius: "7px",
                        color: "white",
                        height: "44px",
                      }}
                      name="healthCertificate"
                      type="file"
                      accept=".png, .gif, .jpg, .jpeg"
                      ref={healthCertificateImageRef}
                    />
                  </div>

                  <div>
                    <label>Upload Passport</label>
                    <input
                      style={{
                        width: "200px",
                        borderRadius: "7px",
                        color: "white",
                        height: "44px",
                      }}
                      name="passport"
                      type="file"
                      accept=".png, .gif, .jpg, .jpeg"
                      ref={passportImageRef}
                    />
                  </div>
                </div>

                {errorMsg && <p className="error">{errorMsg}</p>}
              </div>
              <div>
                <button type="submit"> Upload Documents</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div>
              <strong>
                These documents are only accessible to be seen by you and your
                dog
              </strong>
              <button onClick={() => setShowForm(true)}>Update Doc</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}



  {/* <div>
          <strong>
            These documents are only accessible to be seen by you and your dog
          </strong>
          <button> Update Documments</button>
        </div>
        <div className="headbuttons" style={{ marginLeft: "0px" }}>
          <button
            style={{
              width: "200px",
              borderRadius: "7px",
              backgroundColor: "#1E3769",
              color: "white",
              height: "44px",
            }}
          >
            Upload Health Certificate
          </button>
          <button
            style={{
              width: "200px",
              borderRadius: "7x",
              backgroundColor: "#1E3769",
              color: "white",
              height: "44px",
            }}
          >
            Upload Vaccine Record
          </button>
          <button
            style={{
              width: "200px",
              borderRadius: "7px",
              backgroundColor: "#1E3769",
              color: "white",
              height: "44px",
            }}
          >
            Upload Your Passport
          </button>
          <button
            style={{
              width: "200px",
              borderRadius: "7px",
              backgroundColor: "#1E3769",
              color: "white",
              height: "44px",
            }}
          >
            Upload Microchip Info
          </button>
        </div>
      </div> */}