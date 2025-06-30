import ProfileForm from "../../Components/ProfileForm/ProfileForm.jsx";
import Carousel from "../../Components/Carousel/Carousel.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import * as profileService from "../../services/profileService";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";
import BlogList from "../../Components/BlogList/BlogList.jsx";
import PetComponent from "../../Components/PetComponent/PetComponent.jsx";
import { useState, useEffect } from "react";
import "./UserProfilePage.css";

export default function UserProfilePage({ user }) {
  const [profile, setProfile] = useState(null);

    // const avatar = useRef();
    // const passport = useRef();
    // const microchip = useRef();
    // const vaccine = useRef();
    // const healthCertificate = useRef();
  
    // async function handleSubmit(evt) {
    //   evt.preventDefault();
    //   try {
    //     const formData = new FormData();
  
    
    //     for (const key in blogData) {
    //       formData.append(key, blogData[key]);
    //     }
  
    //     // Append contentOneImage (required)
    //     if (contentOneImageRef.current && contentOneImageRef.current.files[0]) {
    //       formData.append("contentOneImage", contentOneImageRef.current.files[0]);
    //     } else {
    //       // This case should ideally be caught by browser's HTML5 validation
    //       console.warn("Content One Image is required but not provided.");
    //     }
  
    //     // Append other optional image files if they are selected
    //     if (
    //       contentTwoImageRef.current &&
    //       contentTwoImageRef.current.files.length > 0
    //     ) {
    //       formData.append("contentTwoImage", contentTwoImageRef.current.files[0]);
    //     }
    //     if (
    //       contentThreeImageRef.current &&
    //       contentThreeImageRef.current.files.length > 0
    //     ) {
    //       formData.append(
    //         "contentThreeImage",
    //         contentThreeImageRef.current.files[0]
    //       );
    //     }
    //     if (
    //       contentFourImageRef.current &&
    //       contentFourImageRef.current.files.length > 0
    //     ) {
    //       formData.append(
    //         "contentFourImage",
    //         contentFourImageRef.current.files[0]
    //       );
    //     }
  
    //     // Log FormData contents for debugging
    //     for (const pair of formData.entries()) {
    //       console.log(`${pair[0]}: ${pair[1]}`);
    //     }
  
    //     const blog = await blogService.create(formData);
    //     navigate("/blogs");
    //   } catch (err) {
    //     const errorDetail = err.message || "Unknown error";
    //     console.error("Adding Blog Failed:", errorDetail, err);
    //     setErrorMsg(`Adding Blog Failed: ${errorDetail}. Please try again.`);
    //   }
    // }
  
  

  

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
          {/* <PetComponent profile={profile} setProfile={setProfile} /> */}
        </div>
        <Carousel />
        <div style={{ marginLeft: "-42px" }}>
          <BlogList />
          <Articles />
        </div>
      </section>
    </>
  );
}
