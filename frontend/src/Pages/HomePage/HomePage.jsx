import Header from "../../components/Header/Header.jsx";
import SearchComponent from "../../components/SearchComponent/SearchComponent.jsx";
import Gallery from "../../components/Gallery/Gallery.jsx";
import Resources from "../../components/Resources/Resources.jsx";
import Marketplace from "../../components/Marketplace/Marketplace.jsx";
import Articles from "../../components/Articles/Articles.jsx";

import RedditPostList from "../../components/RedditPostList/RedditPostList.jsx";
import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      <section className="home">
        <SearchComponent />
        <Gallery />
        <Resources />
        <RedditPostList />
        <Marketplace />
        <Articles />
      </section>
    </>
  );
}
