import { useState } from "react";
import CommentForm from "../../Components/CommentForm/CommentForm";
import NestedComments from "../NestedComments/NestedComments";

export default function CommentThread({
  comment,
  handleAddComment,

}) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleReplyForm = () => setShowReplyForm((prev) => !prev);

  return (
    <article
      style={{
        border: "1px solid #E9E9E9",
        borderRadius: "7px",
        padding: "12px",
        backgroundColor: "#fff",
        marginLeft: "42px", 
        marginTop: "12px",
      }}
    >
      <header>
        <p style={{ fontSize: "14px", marginBottom: "6px" }}>
          <strong>{comment.author?.name || "Anonymous"}</strong> —{" "}
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </header>

      <p style={{ marginBottom: "8px" }}>{comment.text}</p>

      <button
        onClick={toggleReplyForm}
        style={{
          fontSize: "12px",
          background: "none",
          border: "none",
          color: "#1E3769",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {showReplyForm ? "Cancel" : "Reply"}
      </button>

      {showReplyForm && (
        <div style={{ marginTop: "8px" }}>
          <CommentForm
            handleAddComment={handleAddComment}
            parentId={comment._id}
            onCancel={toggleReplyForm}
          />
        </div>
      )}

      {/* Replies inside the same card */}
      <div style={{ marginTop: "12px" }}>
        {comment.replies?.map((reply) => (
          <NestedComments
            key={reply._id}
            comment={reply}
            handleAddComment={handleAddComment}
            depth={1} 
          />
        ))}
      </div>
    </article>
  );
}
