import ProfileForm from "../../Components/ProfileForm/ProfileForm.jsx";
import UserCarousel from "../../Components/UserCarousel/UserCarousel.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import * as profileService from "../../services/profileService";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UsersBlogs from "../../Components/UsersBlogs/UsersBlogs";

import UsersPlansShort from "../../Components/UsersPlansShort/UsersPlansShort";
import UsersPets from "../../Components/UsersPets/UsersPets";
import Destinations from "../../Components/Destinations/Destinations.jsx";

import "./UserProfilePage.css";

export default function UserProfilePage({ user }) {
  const [profile, setProfile] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    profileService.show(id).then(setProfile).catch(console.error);
  }, [id]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await profileService.show(user._id);
        console.log(profileData);
        setProfile(profileData);
      } catch (err) {}
    }
    fetchProfile();
  }, [user]);
  console.log(profile);
  useEffect(() => {
    console.log("profileUpdated");
  }, [profile]);

  return (
    <>
      <section style={{ paddingTop: "100px" }}>
        <div
          style={{
            backgroundColor: "#1E3769",
            width: "1012px",
            display: "flex",
            borderRadius: "7px",
            height: "70px",
            alignItems: "center",
            marginBottom: "60px",
            padding: "12px",
            gap: "20px",
            marginLeft: "42px",
            color: "#ffffff",
          }}
        >
          Profile
        </div>
        {/* <Header />
        <SearchComponent /> */}
        <div
          style={{
            display: "flex",
            width: "1012px",
          }}
        ></div>
        <div style={{ width: "1012px", display: "flex" }}>
          <ProfileForm profile={profile} setProfile={setProfile} user={user} />

          <UsersPets user={user} />

          <UsersPlansShort user={user} />
        </div>

        <div
          style={{ width: "1012px", marginLeft: "42px", marginTop: "100px" }}
        >
          <UserCarousel user={user} profile={profile} />
        </div>

        <div style={{ marginTop: "75px" }}>
          <Destinations />
        </div>

        <div style={{ marginLeft: "-42px" }}>
          <UsersBlogs user={user} />

          {/* <Articles /> */}
        </div>
      </section>
    </>
  );
}
