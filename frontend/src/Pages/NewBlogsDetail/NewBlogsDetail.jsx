import React from "react";
import { useParams } from "react-router-dom";
import { blogPosts } from "../../Data/blogs.jsx";

export default function NewBlogsDetail() {
  const { blogId } = useParams();
  const post = blogPosts.find((b) => b.id === blogId);

  if (!post) return <p>Blog not found</p>;

  return (
    <section style={{ width: "1012px" }}>
      <div style={{ width: "662px" }}>
        <div style={{ padding: "40px" }}>
          <h1>{post.title}</h1>

          <p>
            <i>{post.date}</i>
          </p>

          <img
            src={post.thumbnail}
            alt={post.title}
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <div>{post.content}</div>
        </div>
      </div>
      <div style={{width:"310px"}}>

      </div>
    </section>
  );
}
