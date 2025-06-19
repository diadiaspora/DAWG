import BlogList from "../../Components/BlogList/BlogList.jsx";
import { NavLink } from "react-router-dom";

export default function ViewBlogsPage() {
  return (
    <>
      <h1>Your Blogs</h1>
      <BlogList />
    </>
  );
}
