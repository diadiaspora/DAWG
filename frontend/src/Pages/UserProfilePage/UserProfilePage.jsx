import ProfileForm from "../../Components/ProfileForm/ProfileForm.jsx";
import UserCarousel from "../../Components/UserCarousel/UserCarousel.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import * as profileService from "../../services/profileService";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";
import BlogList from "../../Components/BlogList/BlogList.jsx";
import PetComponent from "../../Components/PetComponent/PetComponent.jsx";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import UsersBlogs from "../../Components/UsersBlogs/UsersBlogs"; // new import
import UsersPlans from "../../Components/UsersPlans/UsersPlans";
<<<<<<< HEAD
import UsersPlansShort from "../../Components/UsersPlansShort/UsersPlansShort";
=======
>>>>>>> cac93826394fd5e51c9651df9435e4a7be503893
import UsersPets from "../../Components/UsersPets/UsersPets";
import Destinations from "../../Components/Destinations/Destinations.jsx";




import "./UserProfilePage.css";

export default function UserProfilePage({ user }) {
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    profileService.show(id).then(setProfile).catch(console.error);
  }, [id]);

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
        <Header />
        <SearchComponent />
        <div
          style={{
            display: "flex",
            width: "1012px",
          }}
        ></div>
        <div style={{ width: "1012px", display: "flex" }}>
<<<<<<< HEAD
          <ProfileForm profile={profile} setProfile={setProfile} user={user} />
        
            
            <UsersPets user={user} />
         
          <UsersPlansShort user={user} />
=======
          <ProfileForm profile={profile} setProfile={setProfile} />
          <UsersPets user={user} />
>>>>>>> cac93826394fd5e51c9651df9435e4a7be503893
        </div>

        <div
          style={{ width: "1012px", marginLeft: "42px", marginTop: "100px" }}
        >
          <UserCarousel user={user} profile={profile} />
        </div>
<<<<<<< HEAD
      
        <div style={{ marginTop: "75px" }}>
          <Destinations />
        </div>
=======
        <div style={{ display: "flex", marginTop: "75px" }}>
          <UsersPlans user={user} />
        </div>
        <div style={{marginTop:"75px"}}>
          <Destinations />
        </div>
      
>>>>>>> cac93826394fd5e51c9651df9435e4a7be503893

        <div style={{ marginLeft: "-42px" }}>
          <UsersBlogs user={user} />

          <Articles />
        </div>
      </section>
    </>
  );
}
