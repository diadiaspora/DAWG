import React, { useState, useEffect } from "react";

import { blogPosts } from "../../Data/blogs"; // Assuming this is your static blog data
import BlogCard from "../../Components/BlogCard/BlogCard.jsx";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./BlogsComponent.css"; 

export default function BlogsComponent() {
  const [shuffledBlogs, setShuffledBlogs] = useState([]);

  useEffect(() => {
   
    const shuffled = [...blogPosts].sort(() => 0.5 - Math.random());

    setShuffledBlogs(shuffled);
  }, []);

 

  return (
    <div className="blogs-component-container" style={{ marginTop: "75px" }}>
      <h2 style={{ marginLeft: "42px" }}>Latest Blogs</h2> 

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
