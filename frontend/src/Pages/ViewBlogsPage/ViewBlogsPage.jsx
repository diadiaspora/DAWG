import BlogListAd from "../../Components/BlogListAd/BlogListAd.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";
import BlogsComponent from "../../Components/BlogsComponent/BlogsComponent";
import BlogFeature from "../../Components/BlogFeature/BlogFeature";
import "./ViewBlogsPage.css";

export default function ViewBlogsPage({ user, setUser }) {
  return (
    <section className="home">
      {/* Consistent header + search */}
      <div className="page-container">
        <div className="header-wrapper">
          <Header user={user} setUser={setUser} />
        </div>
        <SearchComponent />
      </div>

      
      <div className="wide-blog">
        <main className="mainly-blog">
          <BlogFeature />
          <BlogsComponent />
          <BlogListAd />
        </main>
      </div>
    </section>
  );
}
