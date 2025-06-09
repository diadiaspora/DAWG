import Header from "../../components/Header/Header.jsx";
import SearchComponent from "../../components/SearchComponent/SearchComponent.jsx";
import Gallery from "../../components/Gallery/Gallery.jsx";
import Resources from "../../components/Resources/Resources.jsx";
import Marketplace from "../../components/Marketplace/Marketplace.jsx";
import Articles from "../../components/Articles/Articles.jsx";

import People from "../../components/RedditPostList/RedditPostList.jsx";

export default function HomePage() {
  return (
    <>
      <section>
        <h1>Home Page</h1>;
        <Header />
        <SearchComponent />
        <Gallery />
        <Resources />
        <People />
        <Marketplace />
        <Articles />
      </section>
    </>
  );
}
