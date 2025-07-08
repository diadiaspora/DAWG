import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";
import { Link } from "react-router-dom";

export default function UserBlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchUserBlogs() {
      const userBlogs = await blogService.getUserBlogs();
      setBlogs(userBlogs);
    }
    fetchUserBlogs();
  }, []);

  return (
    <div style={{ marginTop: "42px" }}>
      <h2 style={{ marginLeft: "42px" }}>Your Blogs</h2>
      {blogs.length ? (
        <ul style={{ display: "flex", flexWrap: "wrap" }}>
          {blogs.map((blog) => (
            <li
              key={blog._id}
              style={{
                width: "331px",
                margin: "21px",
                border: "1px solid #BCC7D4",
                borderRadius: "7px",
              }}
            >
              <img
                src={blog.contentOneImage}
                alt="blog"
                style={{
                  width: "100%",
                  borderTopLeftRadius: "7px",
                  borderTopRightRadius: "7px",
                }}
              />
              <Link
                to={`/blogs/${blog._id}`}
                style={{
                  padding: "10px",
                  display: "block",
                  fontWeight: "bold",
                  color: "#1E3769",
                  textDecoration: "none",
                }}
              >
                {blog.title}
              </Link>
              <p style={{ paddingLeft: "10px" }}>
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginLeft: "42px" }}>You haven't written any blogs yet.</p>
      )}
    </div>
  );
}
