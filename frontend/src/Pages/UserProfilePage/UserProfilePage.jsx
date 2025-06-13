import ProfileForm from "../../Components/ProfileForm/ProfileForm.jsx";
import Carousel from "../../Components/Carousel/Carousel.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import * as profileService from "../../services/profileService";
import { useState } from "react";

export default function UserProfilePage({ user }) {
  const [profile, setProfile] = useState(null); 
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <img src="./Avatar.png" className="avatar" alt="human avatar"></img>
        </div>
        <h1>
          {user.name} & {user.petName}
        </h1>
      </div>

      <ProfileForm profile={profile} setProfile={setProfile} />

      <div style={{ margin: "0px", width: "1012px" }}>
        <h3> Important Documents</h3>
        <p>
          These documents are only accessible to and seen by you and your dog
        </p>
        <button style={{ width: "200px" }}> Upload Health Certificate</button>
        <button style={{ width: "200px" }}> Upload Vaccine Record</button>
        <button style={{ width: "200px" }}> Upload Your Passport</button>
        <button style={{ width: "200px" }}> Upload Microchip Info</button>
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
