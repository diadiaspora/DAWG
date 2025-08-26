import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";
import { Link, useNavigate } from "react-router-dom";
import "./BlogList.css";

export default function BlogList({ user }) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); // ✅
  const [hoverLatest, setHoverLatest] = useState(false);
  const [hoverCreate, setHoverCreate] = useState(false);
  

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
      className="blog-list"
  
    >
      <div className="blg-container">
        <div className="realstories">
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
                className="latest-button"
                style={{
                  width: "140px",
                  height: "44px",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "Roboto",
                  border: "1px solid",
                  borderColor: hoverLatest ? "#4AA692" : "#1E3769",
                  color: hoverLatest ? "#347567" : "#1E3769",
                  borderRadius: "7px",
                }}
                onMouseEnter={() => setHoverLatest(true)}
                onMouseLeave={() => setHoverLatest(false)}
              >
                Latest Stories
              </button>
            </div>
          </Link>
        </div>
        <div className="blg-scroll-container">
          {blogs.length ? (
            <ul className="ulflex">
              {blogs.map((blog) => (
                <div key={blog._id} className="blgdiv">
                  <li>
                    <div style={{ display: "flex" }}>
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
                    </div>

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
                      src={blog.contentOneImage}
                      alt="resources"
                      style={{
                        width: "331px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      }}
                    />

                    <p className="blog-snippet">{blog.contentOne}</p>
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No Blogs Yet!</p>
          )}
        </div>
      </div>

      {/* Sidebar Call to Action */}
      <div
        className="blog-sidebar"
        style={{ height: "350px", marginTop: "106px" }}
      >
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
                backgroundColor: "#ffffff",
                width: "240px",
                height: "44px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
                fontFamily: "Roboto",
                border: "1px solid",
                borderColor: hoverCreate ? "#4AA692" : "#1E3769",
                color: hoverCreate ? "#347567" : "#1E3769",
                borderRadius: "7px",
              }}
              onMouseEnter={() => setHoverCreate(true)}
              onMouseLeave={() => setHoverCreate(false)}
            >
              Share Your Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
