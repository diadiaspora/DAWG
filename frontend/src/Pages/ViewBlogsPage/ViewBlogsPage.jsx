import BlogListAd from "../../Components/BlogListAd/BlogListAd.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";
import BlogsComponent from "../../Components/BlogsComponent/BlogsComponent";
import BlogFeature from "../../Components/BlogFeature/BlogFeature";

export default function ViewBlogsPage({ user, setUser }) {
  return (
    <>
      <section className="home">
        <div >
          <div>
            <div style={{ marginLeft: "-3vw" }}>
              <Header user={user} setUser={setUser} />
            </div>
            <SearchComponent />
          </div>
        </div>
        <div className="page-content">
        <BlogFeature />
        <div style={{ marginLeft: "42px" }}>
          <BlogsComponent />
        </div>
        
          <BlogListAd />
          </div>
      
      </section>
    </>
  );
}
