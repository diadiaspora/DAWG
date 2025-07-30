import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../../Data/blogs"; // or wherever your blog data is
import MapSmall from "../../Components/MapSmall/MapSmall.jsx";

export default function BlogFeature() {
  const [featuredBlog, setFeaturedBlog] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * blogPosts.length);
    setFeaturedBlog(blogPosts[randomIndex]);
  }, []);

  if (!featuredBlog) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: "24px",
        marginLeft: "42px",
        marginBottom: "48px",
      }}
    >
      {/* Featured Blog Card */}
      <div
        style={{
          width: "662px",
          borderRadius: "12px",
          border: "1px solid #BCC7D4",
          overflow: "hidden",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
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

      {/* Sidebar - no widget */}
      <div
        style={{
          backgroundColor: "#1E3769",
          width: "320px",
          borderRadius: "7px",
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
   <MapSmall />
      </div>
    </div>
  );
}
