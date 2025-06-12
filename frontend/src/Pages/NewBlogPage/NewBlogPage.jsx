import { useState } from "react";
import { useNavigate } from "react-router";
import * as postService from "../../services/postService";

export default function NewPostPage() {
  const [title, setTitle] = useState(""); // New state for the title
  const [content, setContent] = useState(""); // Existing state for content, now used by textarea
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // Send both title and content to the service
      await postService.create({ title, content });
      navigate("/posts");
    } catch (err) {
      setErrorMsg("Adding Post Failed");
    }
  }

  return (
    <>
      <h2>Share Your Experiences</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>{" "}
        {/* Added htmlFor for accessibility */}
        <input
          id="title-input" // Added id to match htmlFor
          type="text"
          value={title} // Bound to the new title state
          onChange={(evt) => setTitle(evt.target.value)}
          required
          style={{
            // Inline style for consistency
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "15px",
            width: "calc(100% - 16px)", // Full width minus padding
            boxSizing: "border-box", // Include padding in width
          }}
        />
        <label htmlFor="content-textarea">Content</label>{" "}
        {/* Corrected typo to "Content" and added htmlFor */}
        <textarea
          id="content-textarea" // Added id to match htmlFor
          value={content} // Bound to the content state
          onChange={(evt) => setContent(evt.target.value)}
          required
          rows="8" // Set a default number of rows for the textarea
          style={{
            // Inline style for consistency
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            width: "calc(100% - 16px)", // Full width minus padding
            boxSizing: "border-box", // Include padding in width
            resize: "vertical", // Allow vertical resizing
          }}
        ></textarea>
        <button
          type="submit"
          style={{
            // Inline style for the button
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ADD POST
        </button>
      </form>
      <p className="error-message" style={{ color: "red", marginTop: "10px" }}>
        &nbsp;{errorMsg}
      </p>{" "}
      {/* Added inline style for error message */}
    </>
  );
}
