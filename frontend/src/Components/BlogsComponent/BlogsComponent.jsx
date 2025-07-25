import React, { useState, useEffect } from "react";

<<<<<<< HEAD
import { blogPosts } from "../../Data/blogs.jsx"; // Assuming this is your static blog data
=======
import { blogPosts } from "../../Data/blogs"; // Assuming this is your static blog data
>>>>>>> cac93826394fd5e51c9651df9435e4a7be503893
import BlogCard from "../../Components/BlogCard/BlogCard.jsx";
import { Link } from "react-router"; 
import "./BlogsComponent.css"; 

export default function BlogsComponent() {
  const [hover, setHover] = useState(false);
  const [shuffledBlogs, setShuffledBlogs] = useState([]);

  useEffect(() => {
   
    const shuffled = [...blogPosts].sort(() => 0.5 - Math.random());

    setShuffledBlogs(shuffled);
  }, []);

 

  return (
    <div className="blogs-component-container" style={{ marginTop: "125px" }}>
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
            color: "#ffffff",
            fontSize: "18px",
            marginTop: "10px",
            marginRight: "630px",
          }}
        >
          All The Pet Travel Tea
        </h2>
        <Link to="/blogs">
          <div>
            <button
              // onClick={handlePostClick}
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
              Recent Articles
            </button>
          </div>
        </Link>
      </div>

      <div
        style={{
          marginLeft: "42px",

          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          paddingBottom: "20px",
          scrollbarWidth: "thin",
          scrollbarColor: "#1E3769 #f0f0f0",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          {shuffledBlogs.map((post) => (
            <Link
              key={post.id}
              to={`/articles/${post.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                flexShrink: 0,
              }}
            >
              <BlogCard blog={post} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
