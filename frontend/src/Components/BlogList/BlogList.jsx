import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";
import { Link, useNavigate } from "react-router-dom";
import "./BlogList.css";

export default function BlogList({ user }) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); 
  const [hover, setHover] = useState(false);
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

  const blogListHead = (
    <div className="blog-list-header">
      <h1>Real Stories</h1>
      <Link to="/blogs">
        <button
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderWidth: "1px",
            backgroundColor: hover ? "#4AA692" : "#ffffff",
            width: "240px",
            height: "44px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
            fontFamily: "Roboto",
            borderColor: hover ? "#4AA692" : "#1E3769",
            color: hover ? "#1E3769" : "#1E3769",
            borderRadius: "7px",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Latest Stories
        </button>
      </Link>
    </div>
  );

  return (
    <div className="blog-list">
      <div className="blg-container">
        <div className="realstories">
   {blogListHead}
         
        </div>
        <div className="blg-scroll-container">
          {blogs.length ? (
            <ul className="ulflex">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="blgdiv"
                  style={{ width: "648px", borderRadius: "7px" }}
                >
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
                      <p
                        style={{
                          fontSize: "16px",
                          marginLeft: "6px",
                          paddingBottom: "6px",
           
                        }}
                      >
                        <strong>
              
                          {blog.author?.username || "Anonymous"}
                        </strong>
                      </p>
                      <div style={{ marginLeft: "auto" }}>
                        <p style={{ fontSize: "12px" }}>
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
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
                        width: "100vw",
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

      <div
        className="blog-sidebar"
        style={{ height: "500px", marginTop: "75px" }}
      >
        <div
          style={{
            backgroundColor: "#1E3769",
            width: "310px",
            borderRadius: "7px",
            height: "550px",
            marginTop: "0px",
            paddingTop: "12px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <h3 style={{ color: "#ffffff" }}>Share Your Experiences</h3>
          <h4 style={{ color: "#ffffff" }}>
            You can inspire & help other people!
          </h4>
          <p style={{ color: "#ffffff" }}>
            Dawg app was created to connect people and share information so that
            people can travel safely and easily with their pets.
          </p>
          <p style={{ color: "#ffffff" }}>
            We are constantly doing reseaarch to find and fact check on the
            internet.
          </p>
          <p style={{ color: "#ffffff" }}>
            But the best way to really know is by hearing first hand stories
            from fellow travelers. By sharing your experiences you help other
            people and their pets travel safely.
          </p>
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
