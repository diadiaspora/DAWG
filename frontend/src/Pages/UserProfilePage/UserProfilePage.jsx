import ProfileForm from "../../Components/ProfileForm/ProfileForm.jsx";
import Carousel from "../../Components/Carousel/Carousel.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import * as profileService from "../../services/profileService";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx"; 
import Header from "../../Components/Header/Header.jsx";
import { useState } from "react";

export default function UserProfilePage({ user }) {
  const [profile, setProfile] = useState(null); 


  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <img
            src="./Avatar.png"
            className="avatar"
            alt="human avatar"
            style={{ width: "200px" }}
          ></img>
        </div>
        <div>
          <h1>
            {user.name} & {user.petName}
          </h1>
        </div>
      </div>

      <ProfileForm profile={profile} setProfile={setProfile} />

      <div style={{ margin: "0px", width: "1012px" }}>
        <h3> Important Documents</h3>
        <p>
          These documents are only accessible to and seen by you and your dog
        </p>
        <div style={{display: "flex"}}>
          <button
            style={{
              width: "200px",
              backgroundColor: "#1E3769",
              height: "44px",
              borderRadius: "50px",
              borderColor: "#1E3769",
            }}
          >
            {" "}
            Upload Health Certificate
          </button>
          <button
            style={{
              width: "200px",
              backgroundColor: "#1E3769",
              height: "44px",
              borderRadius: "50px",
              borderColor: "#1E3769",
            }}
          >
            {" "}
            Upload Vaccine Record
          </button>
          <button
            style={{
              width: "200px",
              backgroundColor: "#1E3769",
              height: "44px",
              borderRadius: "50px",
              borderColor: "#1E3769",
            }}
          >
            {" "}
            Upload Your Passport
          </button>
          <button
            style={{
              width: "200px",
              backgroundColor: "#1E3769",
              height: "44px",
              borderRadius: "50px",
              borderColor: "#1E3769",
            }}
          >
            {" "}
            Upload Microchip Info
          </button>
        </div>
      </div>
      <h1>Gallery</h1>
      <div style={{ width: "1012px" }}>
        <Carousel />
      </div>

      <h1>Users Post</h1>
      <Articles />
    </>
  );
}
