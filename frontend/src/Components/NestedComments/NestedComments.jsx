import { useState } from "react";
import CommentForm from "../../Components/CommentForm/CommentForm";

export default function NestedComment({
  comment,
  handleAddComment,
  depth = 0,
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleReplyForm = () => setShowReplyForm((prev) => !prev);

  const indentStyle = {
    marginLeft: `${depth * 24}px`,
    paddingLeft: "12px",
    borderLeft: depth > 0 ? "1px solid #E9E9E9" : "none",
    marginTop: "12px",
  };

  return (
    <div style={indentStyle}>
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

      <div style={{ marginTop: "12px" }}>
        {comment.replies?.map((reply) => (
          <NestedComment
            key={reply._id}
            comment={reply}
            handleAddComment={handleAddComment}
            depth={depth + 1}
          />
        ))}
      </div>
    </div>
  );
}
