import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ blog }) {
  return (
    <div
      style={{
        height: "380px",
        width: "237px",
        borderRadius: "20px",
        border: "1px solid #ccc",
      }}
    >
      <img
        src={blog.thumbnail}
        alt={blog.title}
        style={{
          width: "100%",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      />
      <div style={{ marginLeft: "16px", marginRight: "16px" }}>
        <h2 style={{ fontSize: "18px", textAlign: "left", marginTop: "16px" }}>
          {blog.title}
        </h2>
        <p
          className="truncate-text"
          style={{ fontSize: "14px", textAlign: "justify" }}
        >
          {blog.excerpt}
        </p>
        <div style={{ fontSize: "16px", textAlign: "right", marginTop: "32px"}}>
          <Link to={`/articles/${blog.id}`}>Read More</Link>
        </div>
      </div>
    </div>
  );
}
