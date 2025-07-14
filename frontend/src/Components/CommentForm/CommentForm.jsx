// src/components/CommentForm/CommentForm.jsx
import { useState } from "react";

const CommentForm = ({ handleAddComment, parentId = null, onCancel }) => {
  const [formData, setFormData] = useState({ text: "" });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const dataToSend = { ...formData };
    if (parentId) dataToSend.parentId = parentId; // ✅ Add parentId if replying

    handleAddComment(dataToSend);
    setFormData({ text: "" });

    if (onCancel) onCancel(); // Optional: collapse reply form after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginLeft: parentId ? "60px" : "42px", marginBottom: "22px" }}
    >
      <label htmlFor="text-input" hidden>
        Comment
      </label>
      <div style={{ display: "flex", width: "100%" }}>
        <textarea
          required
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
          style={{
            flex: 1,
            borderWidth: "1px",
            borderColor: "#BCC7D4",
            padding: "8px",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#1E3769",
            border: "none",
            height: "44px",
            padding: "12px",
            marginLeft: "12px",
            width: "150px",
            color: "#fff",
            borderRadius: "4px",
          }}
        >
          {parentId ? "Reply" : "Comment"}
        </button>
      </div>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          style={{
            marginTop: "4px",
            marginLeft: "8px",
            fontSize: "12px",
            background: "none",
            border: "none",
            color: "#666",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default CommentForm;
