import BlogListAd from "../../Components/BlogListAd/BlogListAd.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";
import BlogsComponent from "../../Components/BlogsComponent/BlogsComponent";
import BlogFeature from "../../Components/BlogFeature/BlogFeature";



export default function ViewBlogsPage({ user, setUser }) {
  return (
    <>
      <section className="home">
        <div style={{ marginLeft: "6.8px" }}>
          <div style={{ marginLeft: "-3vw" }}>
            <Header user={user} setUser={setUser} />
          </div>
          <SearchComponent />
        </div>

        <BlogFeature />
        <div style={{ marginLeft: "42px" }}>
          <BlogsComponent />
        </div>
        {/* <HotelComponent /> */}
        <BlogListAd />
        {/* <Articles /> */}
      </section>
    </>
  );
}
