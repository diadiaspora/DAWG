import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Gallery from "../../Components/Gallery/Gallery.jsx";
import BlogList from "../../Components/BlogList/BlogList.jsx";
import Marketplace from "../../Components/Marketplace/Marketplace.jsx";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import BlogsComponent from "../../Components/BlogsComponent/BlogsComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";
import * as hootService from "../../services/hootService";

import HootLongList from "../../Components/HootLongList/HootLongList";
import HotelComponent from "../../Components/HotelComponent/HotelComponent";





export default function HomePage({ user, setUser, hoots, setHoots,  profile }) {


  const navigate = useNavigate();
  const handleAddHoot = async (newHootData) => {
    const createdHoot = await hootService.create(newHootData);
    console.log("New hoot created:", createdHoot);

    navigate("/");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://affiliate.klook.com/widget/fetch-iframe-init.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
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
        {/* <div style={{ marginTop: "125px" }}>
          <HotelComponent />
        </div>
    */}

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
