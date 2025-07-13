import BlogListAd from "../../Components/BlogListAd/BlogListAd.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import BlogsComponent from "../../Components/BlogsComponent/BlogsComponent";
import BlogFeature from "../../Components/BlogFeature/BlogFeature";
import HotelComponent from "../../Components/HotelComponent/HotelComponent";
import { NavLink } from "react-router-dom";

export default function ViewBlogsPage(user, setUser) {
  return (
    <>
      <section style={{ width: "100%" }}>
        <Header user={user} setUser={setUser} />
        <SearchComponent />
        <h1>Your Blogs</h1>
        <BlogFeature />

        <BlogsComponent />
        <HotelComponent />
        <BlogListAd />
        <Articles />
      </section>
    </>
  );
}
