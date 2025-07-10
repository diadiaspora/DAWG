import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";
import { Link, useNavigate } from "react-router-dom";

export default function BlogList({ user }) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); // ✅

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.index();
      const shuffled = blogs.sort(() => 0.5 - Math.random()).slice(0, 2);
      setBlogs(shuffled);
    }
    fetchBlogs();
  }, []);

  const handleCreatePostClick = () => {
    if (user) {
      navigate("/posts/new");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div
      style={{
        marginLeft: "0px",
        width: "1012px",
        display: "flex",
        marginTop: "42px",
      }}
    >
      <div style={{ width: "662px", marginRight: "42px" }}>
        <h1 style={{ fontSize: "24px", marginLeft: "42px" }}>Blog List</h1>
        {blogs.length ? (
          <ul style={{ display: "flex" }}>
            {blogs.map((blog) => (
              <div
                key={blog._id}
                style={{
                  width: "331px",
                  borderRadius: "7px",
                  marginRight: "21px",
                  borderStyle: "solid",
                  borderColor: "#BCC7D4",
                  height: "350px",
                }}
              >
                <li>
                  <img
                    src={blog.contentOneImage}
                    alt="resources"
                    style={{
                      width: "331px",
                      borderTopLeftRadius: "7px",
                      borderTopRightRadius: "7px",
                    }}
                  />
                  <Link
                    to={`/blogs/${blog._id}`}
                    style={{
                      display: "block",
                      padding: "10px",
                      fontWeight: "bold",
                      textDecoration: "none",
                      color: "#1E3769",
                    }}
                  >
                    {blog.title}
                  </Link>

                  <img
                    src={
                      blog.author?.avatar ||
                      "https://i.ibb.co/5x5Td7ks/av-1.png"
                    }
                    alt="Author avatar"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                  <strong>{blog.author?.username || "Anonymous"}</strong>

                  <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                </li>
              </div>
            ))}
          </ul>
        ) : (
          <p>No Blogs Yet!</p>
        )}
      </div>

      {/* Sidebar Call to Action */}
      <div style={{ height: "350px", marginLeft: "42px", marginTop: "85px" }}>
        <div
          style={{
            backgroundColor: "#D9D9D7",
            width: "310px",
            borderRadius: "7px",
            height: "350px",
            marginTop: "0px",
            padding: "24px",
          }}
        >
          <h3>Share Your Experiences</h3>
          <h4>You can inspire and help other people!</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "36px",
            }}
          >
            <button
              onClick={handleCreatePostClick}
              style={{
                backgroundColor: "#1E3769",
                borderRadius: "7px",
                borderColor: "#1E3769",
                width: "200px",
                height: "44px",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
                fontFamily: "Roboto",
              }}
            >
              Create a post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
