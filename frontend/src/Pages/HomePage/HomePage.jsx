import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Gallery from "../../Components/Gallery/Gallery.jsx";
import Resources from "../../Components/Resources/Resources.jsx";
// import Marketplace from "../../Components/Marketplace/Marketplace.jsx";
import Articles from "../../Components/Articles/Articles.jsx";


import RedditPostList from "../../Components/RedditPostList/RedditPostList.jsx";
import "./HomePage.css";

export default function HomePage() {
  return (
    <>
      <section className="home">
        <Header />
        <SearchComponent />
        <Gallery />
        <Resources />
        <RedditPostList />
        {/* <Marketplace /> */}
        <Articles />
      </section>
    </>
  );
}
