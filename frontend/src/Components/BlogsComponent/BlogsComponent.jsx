import React, { useState, useEffect } from "react";

import { blogPosts } from "../../Data/blogs.jsx"; // Assuming this is your static blog data
import BlogCard from "../../Components/BlogCard/BlogCard.jsx";
import { Link } from "react-router-dom"; // Assuming react-router-dom for Link
import "./BlogsComponent.css";

export default function BlogsComponent() {
  const [hover, setHover] = useState(false);
  const [shuffledBlogs, setShuffledBlogs] = useState([]);

  useEffect(() => {
    // Shuffle blogs once on component mount
    const shuffled = [...blogPosts].sort(() => 0.5 - Math.random());
    setShuffledBlogs(shuffled);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="blogs-component-container">
      {/* Header bar for "All The Pet Travel Tea" */}
      <div className="blogs-header-bar">
        <h2 className="blogs-header-title">All The Pet Travel Tea</h2>
        <Link to="/blogs">
          <div>
            <button
              className="recent-articles-button"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              // Keep hover styles inline as they depend on state
              style={{
                borderColor: hover ? "#4AA692" : "#1E3769",
                color: hover ? "#347567" : "#1E3769",
              }}
            >
              Recent Articles
            </button>
          </div>
        </Link>
      </div>

      {/* Scrollable container for blog cards */}
      <div className="blogs-scroll-wrapper">
        <div className="blogs-cards-flex-container">
          {shuffledBlogs.map((post) => (
            <Link
              key={post.id}
              to={`/articles/${post.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                flexShrink: 0, // Ensures cards don't shrink below their content
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
