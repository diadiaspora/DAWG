import BlogListAd from "../../Components/BlogListAd/BlogListAd.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import BlogsComponent from "../../Components/BlogsComponent/BlogsComponent";
import BlogFeature from "../../Components/BlogFeature/BlogFeature";
// import HotelComponent from "../../Components/HotelComponent/HotelComponent";
import { NavLink } from "react-router-dom";

export default function ViewBlogsPage({ user, setUser }) {
  return (
    <section style={{ width: "100%" }}>
      <div className="top">
        <Header user={user} setUser={setUser} />
        <SearchComponent />
      </div>

      <BlogFeature />
      <div style={{marginLeft: "42px"}}>
        <BlogsComponent />
      </div>
      {/* <HotelComponent /> */}
      <BlogListAd />
      {/* <Articles /> */}
    </section>
  );
}
