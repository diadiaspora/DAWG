import ProfileForm from "../../Components/ProfileForm/ProfileForm.jsx";
import Carousel from "../../Components/Carousel/Carousel.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import * as profileService from "../../services/profileService";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";
import BlogList from "../../Components/BlogList/BlogList.jsx";
import { useState, useEffect } from "react";
import "./UserProfilePage.css";

export default function UserProfilePage({ user }) {
  const [profile, setProfile] = useState(null);

   useEffect(() => {
     async function fetchProfile() {
       try {
         const profileData = await profileService.show(user._id);
         console.log(profileData)
         setProfile(profileData);
       } catch (err) {}
     }
     fetchProfile();
   }, [user]);
  console.log(profile);
   useEffect(
     () => {
       console.log("profileUpdated");
     }, [profile]
   );

  return (
    <>
      <section style={{paddingTop: "100px"}}>
        <div
          style={{
            display: "flex",
            width: "1012px",
          }}
        >
          <div style={{ width: "300px" }}>
            <img
              src="https://i.ibb.co/5x5Td7ks/av-1.png"
              alt="avatar"
              style={{ width: "200px" }}
            />
            <h1>
              {user.name} & {user.petName}
            </h1>
          </div>
          <div style={{ width: "650px", marginLeft: "42px" }}>
            <Carousel />
          </div>
        </div>

        <ProfileForm profile={profile} setProfile={setProfile} />
        <div style={{ margin: "0px", width: "1012px" }}>
          <h3> Important Documents</h3>
          <p>
            These documents are only accessible to be seen by you and your dog
          </p>
          <div className="headbuttons" style={{ marginLeft: "0px" }}>
          
          <button
            style={{
              width: "200px",
              borderRadius: "50px",
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
              borderRadius: "50px",
              backgroundColor: "#1E3769",
              color: "white",
              height: "44px",
            }}
          >
            {" "}
            Upload Vaccine Record
          </button>
          <button
            style={{
              width: "200px",
              borderRadius: "50px",
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
              borderRadius: "50px",
              backgroundColor: "#1E3769",
              color: "white",
              height: "44px",
            }}
          >
            Upload Microchip Info
              </button>
          
            </div>
        </div>

        <div style={{marginLeft: "-42px"}}>
          
          <BlogList />
          <Articles />
        </div>
      </section>
    </>
  );
}
