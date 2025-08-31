import React, { useState, useEffect } from "react";

import { blogPosts } from "../../Data/blogs.jsx"; 
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

  const bloghead = (
    <div className="blog-header">
      <h1>All The Pet Travel Tea</h1>
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
          Recent Articles
        </button>
      </Link>
    </div>
  );

 

  return (
    <>
      <div className="blogs-component-container">
  {bloghead}

        <div className="blog-scroll-container">
          <div
            style={{
              display: "flex",
              gap: "16px",
              minWidth: `${Math.max(shuffledBlogs.length * 280, 1012)}px`,
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
