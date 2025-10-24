import BlogsComponent from "../../Components/BlogsComponent/BlogsComponent";
import Articles from "../../Components/Articles/Articles";

export default function BlogPage() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Latest Blog Posts</h1>
      <BlogsComponent />
      <Articles />
    </div>
  );
}
