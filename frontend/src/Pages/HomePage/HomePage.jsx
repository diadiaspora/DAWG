import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Gallery from "../../Components/Gallery/Gallery.jsx";
import BlogList from "../../Components/BlogList/BlogList.jsx";
import Marketplace from "../../Components/Marketplace/Marketplace.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import { useState } from "react";


import RedditPostList from "../../Components/RedditPostList/RedditPostList.jsx";
import "./HomePage.css";

export default function HomePage({ user, setUser }) {
  const [isHome, setIsHome] = useState(true);

  return (
    <>
      <section className="home">
        <Header user={user} setUser={setUser} />
        <SearchComponent />
        <Gallery />
        <Articles />
        <div >
          <BlogList/>
        </div>
        <div style={{ marginTop: "400px" }}>
          <RedditPostList />
        </div>
        <Marketplace />
      </section>
    </>
  );
}
