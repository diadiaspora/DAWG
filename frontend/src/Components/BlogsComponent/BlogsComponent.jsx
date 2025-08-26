import React, { useState, useEffect } from "react";

import { blogPosts } from "../../Data/blogs.jsx"; // Assuming this is your static blog data
import BlogCard from "../../Components/BlogCard/BlogCard.jsx";
import { Link } from "react-router-dom"; 
import "./BlogsComponent.css"; 

export default function BlogsComponent() {
  const [hover, setHover] = useState(false);
  const [shuffledBlogs, setShuffledBlogs] = useState([]);

  useEffect(() => {
   
    const shuffled = [...blogPosts].sort(() => 0.5 - Math.random());

    setShuffledBlogs(shuffled);
  }, []);

 

  return (
    <>
      <div className="blogs-component-container">
        <Link to="/blogs">
          <div className="bluelabel">
            <h2 className="tea">All The Pet Travel Tea</h2>

            <div>
              <button
                className="buttdiss"
              
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
          </div>
        </Link>

        <div className="blog-scroll-container">
          <div
            style={{
              display: "flex",
              gap: "16px",
              minWidth: `${shuffledBlogs.length * 280}px`, // Or any reasonable card width
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
    </>
  );
}
