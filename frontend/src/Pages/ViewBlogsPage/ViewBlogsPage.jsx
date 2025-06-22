import BlogList from "../../Components/BlogList/BlogList.jsx";
import Articles from "../../Components/Articles/Articles.jsx";
import BlogsComponent from "../../Components/BlogsComponent/BlogsComponent";
import { NavLink } from "react-router-dom";

export default function ViewBlogsPage() {
  return (
    <>
      <section style={{width: "100%"}}>
        <h1>Your Blogs</h1>
        <BlogsComponent />
        <Articles />
        <BlogList />
      </section>
    </>
  );
}
