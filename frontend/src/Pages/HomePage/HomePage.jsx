import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Gallery from "../../Components/Gallery/Gallery.jsx";
import BlogList from "../../Components/BlogList/BlogList.jsx";
import Marketplace from "../../Components/Marketplace/Marketplace.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import { useState, useNavigate } from "react";
import { NavLink } from "react-router-dom";
import BlogsComponent from "../../Components/BlogsComponent/BlogsComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RedditPostList from "../../Components/RedditPostList/RedditPostList.jsx";
import "./HomePage.css";


import HootList from '../../Components/HootList/HootList';
// src/App.jsx

import HootForm from '../../Components/HootForm/HootForm';


export default function HomePage({ user, setUser, hoots }) {
  // const [isHome, setIsHome] = useState(true);
  // src/App.jsx


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
        <HootList user={user} setUser={setUser} hoots={hoots} />
        <HootForm />
        <div>
          <BlogList />
        </div>

        <div style={{ marginTop: "400px" }}>
          <RedditPostList />
        </div>
        <Marketplace />
      </section>
    </>
  );
}
