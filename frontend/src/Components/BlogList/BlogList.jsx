import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";
import { Link, useNavigate } from "react-router-dom";

export default function BlogList({ user }) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); // ✅
    const [hover, setHover] = useState(false);

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
      navigate("/write");
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
        marginTop: "125px",
      }}
    >
      <div style={{ width: "662px", marginRight: "42px" }}>
        <div
          style={{
            backgroundColor: "#1E3769",
            width: "1012px",
            marginLeft: "42px",
            display: "flex",
            borderRadius: "7px",
            height: "70px",
            alignItems: "baseline",
            marginBottom: "24px",
            padding: "12px",
          }}
        >
          <h2
            style={{
              marginLeft: "21px",
              marginTop: "8px",
              marginRight: "720px",
              color: "#ffffff",
              fontSize: "18px",
            }}
          >
            Real Stories
          </h2>
          <Link to="/blogs">
            <div>
              <button
                // onClick={handlePostClick}
                style={{
                  width: "140px",
                  height: "44px",
                  backgroundColor: "#ffffff",
                  borderWidth: "0px",
                  color: "#1E3769",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "Roboto",
                  borderWidth: "1px",
                  borderColor: hover ? "#4AA692" : "#1E3769",
                  color: hover ? "#347567" : "#1E3769",
                  borderRadius: "7px",
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Latest Stories
              </button>
            </div>
          </Link>
        </div>
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
            backgroundColor: "#1E3769",
            width: "310px",
            borderRadius: "7px",
            height: "350px",
            marginTop: "0px",
            padding: "24px",
          }}
        >
          <h3 style={{ color: "#ffffff" }}>Share Your Experiences</h3>
          <h4 style={{ color: "#ffffff" }}>
            You can inspire and help other people!
          </h4>
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
                borderWidth: "1px",
                backgroundColor: "#ffffff",
                borderRadius: "7px",
                borderColor: "#1E3769",
                width: "200px",
                height: "44px",
                color: "#1E3769",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
                fontFamily: "Roboto",
                borderColor: hover ? "#4AA692" : "#1E3769",
                color: hover ? "#347567" : "#1E3769",
                borderRadius: "7px",
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Create a post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
