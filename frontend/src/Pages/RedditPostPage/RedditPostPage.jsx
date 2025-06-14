// RedditPostPage.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as postService from "../../services/postService";

export default function RedditPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const posts = await postService.index();
      setAllPosts(posts.filter((p) => p._id !== postId));
      const current = posts.find((p) => p._id === postId);
      setPost(current);
    }
    fetchData();
  }, [postId]);

  const handleComment = () => {
    if (!commentText.trim()) return;
    setPost({
      ...post,
      comments: [
        ...post.comments,
        {
          _id: Math.random().toString(36).substr(2),
          text: commentText,
          replies: [],
        },
      ],
    });
    setCommentText("");
  };

  const handleReply = (commentId, replyText) => {
    if (!replyText.trim()) return;
    setPost({
      ...post,
      comments: post.comments.map((comment) =>
        comment._id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                { _id: Math.random().toString(36).substr(2), text: replyText },
              ],
            }
          : comment
      ),
    });
    setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
  };

  if (!post) return <p>Loading post...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <div style={{ marginTop: "20px" }}>
        <h4>Comments</h4>
        {post.comments?.map((comment) => (
          <div key={comment._id} style={{ marginBottom: "10px" }}>
            <p>{comment.text}</p>
            {comment.replies?.map((reply) => (
              <div
                key={reply._id}
                style={{ marginLeft: "20px", fontSize: "14px" }}
              >
                └ {reply.text}
              </div>
            ))}
            <input
              type="text"
              placeholder="Reply..."
              value={replyInputs[comment._id] || ""}
              onChange={(e) =>
                setReplyInputs((prev) => ({
                  ...prev,
                  [comment._id]: e.target.value,
                }))
              }
            />
            <button
              onClick={() =>
                handleReply(comment._id, replyInputs[comment._id] || "")
              }
            >
              Reply
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleComment}>Comment</button>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h4>More Posts</h4>
        {allPosts.map((p) => (
          <div
            key={p._id}
            style={{ borderTop: "1px solid #ccc", paddingTop: "10px" }}
          >
            <a href={`/posts/${p._id}`}>
              <strong>{p.title}</strong>
            </a>
            <p>{p.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
