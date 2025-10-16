import { useState } from "react";
import CommentForm from "../../Components/CommentForm/CommentForm"; // Ensure this path is correct relative to NestedComment


export default function NestedComment({
  comment,
  handleAddComment,
  depth = 0,
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Toggles the visibility of the reply form
  const toggleReplyForm = () => setShowReplyForm((prev) => !prev);

  // Calculate indentation based on the depth
  const indentStyle = {
    marginLeft: `${depth * 24}px`, // Indent by 24px for each level of depth
    paddingLeft: "12px", // Add some padding for visual separation from the left border
    borderLeft: depth > 0 ? "1px solid #E9E9E9" : "none", // Add a subtle vertical line for replies
    marginTop: "12px", // Space between nested comments
  };

  return (
    // This div acts as the container for the nested comment, applying the indentation
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
            parentId={comment._id} // Pass the current comment's ID as the parent for the new reply
            onCancel={toggleReplyForm} // Allows cancelling the reply form
          />
        </div>
      )}

      {/* Recursively render replies using NestedComment itself */}
      <div style={{ marginTop: "12px" }}>
        {comment.replies?.map((reply) => (
          <NestedComment
            key={reply._id}
            comment={reply}
            handleAddComment={handleAddComment}
            depth={depth + 1} // Increment depth for deeper nesting
          />
        ))}
      </div>
    </div>
  );
}
