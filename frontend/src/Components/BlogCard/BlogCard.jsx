import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ blog }) {
  return (
    <div className="cardi">
      <img
        src={blog.thumbnail}
        alt={blog.title}
        style={{
          width: "100%",
          borderTopLeftRadius: "7px",
          borderTopRightRadius: "7px",
        }}
      />
      <div style={{ marginLeft: "16px", marginRight: "16px" }}>
        <h2
          style={{ fontSize: "18px", textAlign: "left", marginTop: "16px" }}
          className="truncate-title"
        >
          {blog.title}
        </h2>
        <p
          className="truncate-text"
          style={{ fontSize: "14px", textAlign: "justify" }}
        >
          {blog.excerpt}
        </p>
        <div
          style={{ fontSize: "16px", textAlign: "right", marginTop: "32px" }}
        >
          <Link
            to={`/articles/${blog.id}`}
            style={{
              color: "#1E3769", // default text color
              // textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#4AA692")} // hover color
            onMouseLeave={(e) => (e.target.style.color = "#1E3769")}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
