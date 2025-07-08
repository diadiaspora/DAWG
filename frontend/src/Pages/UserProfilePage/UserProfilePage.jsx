import ProfileForm from "../../Components/ProfileForm/ProfileForm.jsx";
import Carousel from "../../Components/Carousel/Carousel.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import * as profileService from "../../services/profileService";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";
import BlogList from "../../Components/BlogList/BlogList.jsx";
import PetComponent from "../../Components/PetComponent/PetComponent.jsx";
import { useState, useEffect } from "react";
import UsersBlogs from "../../Components/UsersBlogs/UsersBlogs"; // new import
import UsersPlans from "../../Components/UsersPlans/UsersPlans";
import UsersPets from "../../Components/UsersPets/UsersPets";


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
      <section style={{ paddingTop: "100px" }}>
        <div
          style={{
            display: "flex",
            width: "1012px",
          }}
        >
          <div style={{ width: "650px", marginLeft: "42px" }}></div>
        </div>

        <ProfileForm profile={profile} setProfile={setProfile} />

        <div style={{ display: "flex" }}>
          <PetComponent profile={profile} setProfile={setProfile} />
        </div>
        {/* <Carousel /> */}
        <div style={{ marginLeft: "-42px" }}>
          <UsersPets user={user} />
          <UsersBlogs user={user} />
          <UsersPlans user={user} />
          <Articles />
        </div>
      </section>
    </>
  );
}
