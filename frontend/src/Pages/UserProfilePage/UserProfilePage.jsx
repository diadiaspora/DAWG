import { useState, useEffect } from "react";
import ProfileForm from "../../Components/ProfileForm/ProfileForm.jsx";
import UserCarousel from "../../Components/UserCarousel/UserCarousel.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import * as profileService from "../../services/profileService";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";

import { useParams } from "react-router-dom";
import UsersBlogs from "../../Components/UsersBlogs/UsersBlogs";

import UsersPlansShort from "../../Components/UsersPlansShort/UsersPlansShort";
import UsersPets from "../../Components/UsersPets/UsersPets";
import Destinations from "../../Components/Destinations/Destinations.jsx";

import "./UserProfilePage.css";

export default function UserProfilePage({ user }) {
  const [profile, setProfile] = useState(null);
  const [pets, setPets] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { id } = useParams();

  useEffect(() => {
    profileService.show(id).then(setProfile).catch(console.error);
  }, [id]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await profileService.show(user._id);
        setProfile(profileData);
      } catch (err) {}
    }
    fetchProfile();
  }, [user]);


  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

        <div className="profilecards">
          <div className="userprofile">
            <ProfileForm
              profile={profile}
              setProfile={setProfile}
              user={user}
            />
          </div>
          <div className="userpets">
            <UsersPets user={user} pets={pets} setPets={setPets} />
          </div>
          <div className="userplans">
            <UsersPlansShort user={user} />
          </div>
        </div>

        <div style={{ width: "1012px", marginLeft: "42px" }}>
          <UserCarousel user={user} profile={profile} />
        </div>

        <div style={{ marginTop: "75px" }}>{!isMobile && <Destinations />}</div>

        <div style={{ marginLeft: "-42px" }}>
          <UsersBlogs user={user} />
          {/* <Articles /> */}
        </div>
      </section>
    </>
  );
}
