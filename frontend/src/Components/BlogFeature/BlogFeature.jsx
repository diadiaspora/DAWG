import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../../Data/blogs"; // or wherever your blog data is
import MapSmall from "../../Components/MapSmall/MapSmall.jsx";
import "./BlogFeature.css"; 

export default function BlogFeature() {
  const [featuredBlog, setFeaturedBlog] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * blogPosts.length);
    setFeaturedBlog(blogPosts[randomIndex]);
  }, []);

  if (!featuredBlog) return null;

  return (
    <div
      
      className="bigdiv"
   
    >
   
      <div
        className="featcard"
 
      >
        <img
          src={featuredBlog.thumbnail}
          alt={featuredBlog.title}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
          }}
        />
        <div style={{ padding: "24px" }}>
          <h2
            style={{
              fontSize: "24px",
              marginBottom: "12px",
              color: "#1E3769",
            }}
          >
            {featuredBlog.title}
          </h2>
          <p style={{ fontSize: "16px", color: "#333", lineHeight: "1.6em" }}>
            {featuredBlog.excerpt}
          </p>
          <div style={{ textAlign: "right", marginTop: "24px" }}>
            <Link
              to={`/articles/${featuredBlog.id}`}
              style={{
                fontSize: "16px",
                color: "#1E3769",
                fontWeight: "bold",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#4AA692")}
              onMouseLeave={(e) => (e.target.style.color = "#1E3769")}
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>

     
      <div
        className="flight-deals-sidebar"
    
      >
        <h2 >
       
          Flight Deals
        </h2>
        <MapSmall />
      </div>
    </div>
  );
}
