import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Gallery from "../../Components/Gallery/Gallery.jsx";
import BlogList from "../../Components/BlogList/BlogList.jsx";
import Marketplace from "../../Components/Marketplace/Marketplace.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import { useState, useEffect } from "react"; // useState is here, but not used for 'hoots' in HomePage currently
import { NavLink, useNavigate } from "react-router-dom";
import BlogsComponent from "../../Components/BlogsComponent/BlogsComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RedditPostList from "../../Components/RedditPostList/RedditPostList.jsx";
import "./HomePage.css";

import * as hootService from "../../services/hootService";

import HootList from "../../Components/HootList/HootList";
import HootLongList from "../../Components/HootLongList/HootLongList";
import HotelComponent from "../../Components/HotelComponent/HotelComponent";
// src/App.jsx

import HootForm from "../../Components/HootForm/HootForm";

// ADD setHoots to the props destructured from the parent
export default function HomePage({ user, setUser, hoots, setHoots }) {
  // <-- ADDED setHoots here

  const navigate = useNavigate();
  const handleAddHoot = async (newHootData) => {
    const createdHoot = await hootService.create(newHootData);
    console.log("New hoot created:", createdHoot);
    // You might want to update the hoots state here as well if a new hoot is added
    // If you add a new hoot, you should use setHoots to update the list:
    // setHoots(prevHoots => [createdHoot, ...prevHoots]);
    navigate("/");
  };

  useEffect(() => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "https://affiliate.klook.com/widget/fetch-iframe-init.js";
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script); // Cleanup on unmount
  };
}, []);


  return (
    <>
      <section className="home">
        <div>
          <Header user={user} setUser={setUser} />
          <SearchComponent />

          <Gallery />
        </div>
        <div>
          <BlogsComponent />
        </div>
        <div style={{ marginTop: "125px" }}>
          <HotelComponent />
        </div>
        {/* <HootList
          user={user}
          setUser={setUser}
          hoots={hoots}
          handleAddHoot={handleAddHoot}
        /> */}

        <HootLongList
          user={user}
          setUser={setUser}
          hoots={hoots}
          setHoots={setHoots}
          handleAddHoot={handleAddHoot}
        />

        <Marketplace />
        <div>
          <BlogList user={user} setUser={setUser} />
        </div>
      </section>
    </>
  );
}
