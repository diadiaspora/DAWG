import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";
import { Link, useNavigate } from "react-router-dom";

export default function BlogListAd({ user }) {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
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

  useEffect(() => {
    // Append the widget script inside the div with id 'tpwidget-container'
    const container = document.getElementById("tpwidget-container");
    if (container) {
      container.innerHTML = ""; // Clear previous content if any

      const script = document.createElement("script");
      script.src =
        "https://tpwidg.com/content?currency=usd&trs=428421&shmarker=639991&powered_by=true&locale=en&from_name=JFK&to_name=MEX&campaign_id=111&promo_id=4484";
      script.async = true;
      script.charset = "utf-8";
      container.appendChild(script);
    }
  }, []); // Run once on mount

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
                style={{
                  width: "140px",
                  height: "44px",
                  backgroundColor: "#ffffff",
                  borderWidth: "1px",
                  borderColor: hover ? "#4AA692" : "#1E3769",
                  color: hover ? "#347567" : "#1E3769",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontFamily: "Roboto",
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
                  border: "1px solid #BCC7D4",
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

      {/* Sidebar with the widget */}
      <div style={{ height: "350px", marginLeft: "42px", marginTop: "85px" }}>
        <div
          style={{
            backgroundColor: "#1E3769",
            width: "330px",
            borderRadius: "7px",
            height: "380px",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            id="tpwidget-container"
            style={{
              width: "100%",
              height: "350px",
              borderRadius: "7px",
              overflow: "hidden",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
