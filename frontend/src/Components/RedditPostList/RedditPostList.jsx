import { useState, useEffect } from "react";
import * as postService from "../../services/postService";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await postService.index();
      const updatedPosts = posts.map((post) => ({
        ...post,
        likes: 0,
        showComments: false,
        comments: [],
      }));
      setPosts(updatedPosts);
    }
    fetchPosts();
  }, []);

  function toggleComments(postId) {
    setPosts(
      posts.map((post) =>
        post._id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  }

  function addLike(postId) {
    setPosts(
      posts.map((post) =>
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }

  function addComment(postId, comment) {
    setPosts(
      posts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  }

  return (
    <>
      <div
        style={{ marginTop: "-340px", marginLeft: "42px", marginRight: "42px" }}
      >
        <h1 style={{textAlign: "left" }}>Post List</h1>
        <div style={{ display: "flex" }}>
          {posts.length ? (
            <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
              {posts.map((post) => (
                <li
                  key={post._id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "16px",
                    backgroundColor: "#f9f9f9",
                    width: "350px",
                    margin: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      marginBottom: "8px",
                    }}
                  >
                    <strong>{post.user?.username || "Anonymous"}</strong> •{" "}
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                  <p>{post.title}</p>
                  <div style={{ fontSize: "16px", marginBottom: "12px" }}>
                    {post.content}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "10px",
                    }}
                  >
                    <button
                      onClick={() => toggleComments(post._id)}
                      style={buttonStyle}
                    >
                      {post.showComments ? "Hide Comments" : "View Comments"}
                    </button>
                    <button
                      onClick={() => addLike(post._id)}
                      style={buttonStyle}
                    >
                      👍 {post.likes}
                    </button>
                    <button
                      onClick={() =>
                        navigator.share?.({ text: post.content }) ||
                        alert("Sharing not supported.")
                      }
                      style={buttonStyle}
                    >
                      🔗 Share
                    </button>
                  </div>

                  {post.showComments && (
                    <div style={{ marginTop: "10px" }}>
                      <h4 style={{ fontSize: "14px" }}>Comments</h4>
                      {post.comments.map((comment, index) => (
                        <div
                          key={index}
                          style={{
                            padding: "6px 8px",
                            backgroundColor: "#fff",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            marginBottom: "5px",
                          }}
                        >
                          {comment}
                        </div>
                      ))}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const commentText = e.target.elements.comment.value;
                          if (commentText.trim()) {
                            addComment(post._id, commentText.trim());
                            e.target.reset();
                          }
                        }}
                        style={{
                          marginTop: "8px",
                          display: "flex",
                          gap: "6px",
                        }}
                      >
                        <input
                          name="comment"
                          type="text"
                          placeholder="Add a comment..."
                          style={{
                            flex: 1,
                            padding: "6px",
                            borderRadius: "4px",
                            border: "1px solid #aaa",
                          }}
                        />
                        <button
                          type="submit"
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#0079d3",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                          }}
                        >
                          Comment
                        </button>
                      </form>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No Posts Yet!</p>
          )}
        </div>
      </div>
    </>
  );
}

const buttonStyle = {
  background: "none",
  border: "none",
  color: "#0079d3",
  cursor: "pointer",
  fontSize: "14px",
};