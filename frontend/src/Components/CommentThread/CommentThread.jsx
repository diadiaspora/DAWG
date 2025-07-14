import { useState } from "react";
import CommentForm from "../CommentForm/CommentForm";

export default function CommentThread({
  comment,
  handleAddComment,
  depth = 0,
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleReplyForm = () => setShowReplyForm((prev) => !prev);

  return (
    <div style={{ marginLeft: depth * 40 + 42, marginTop: "12px" }}>
      <article
        style={{
          border: "1px solid #E9E9E9",
          borderRadius: "7px",
          padding: "12px",
          backgroundColor: "#fff",
        }}
      >
        <header>
          <p>
            {comment.author?.name || "Anonymous"} —{" "}
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </header>
        <p>{comment.text}</p>
        <button
          onClick={toggleReplyForm}
          style={{
            fontSize: "12px",
            background: "none",
            border: "none",
            color: "#1E3769",
            cursor: "pointer",
          }}
        >
          {showReplyForm ? "Cancel" : "Reply"}
        </button>
        {showReplyForm && (
          <CommentForm
            handleAddComment={handleAddComment}
            parentId={comment._id}
            onCancel={toggleReplyForm}
          />
        )}
      </article>

      {comment.replies?.map((reply) => (
        <CommentThread
          key={reply._id}
          comment={reply}
          handleAddComment={handleAddComment}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}
