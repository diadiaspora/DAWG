import { useState } from "react";
import { useNavigate } from "react-router";
import * as postService from "../../services/postService";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await postService.create({ title, content });
      navigate("/posts");
    } catch (err) {
      setErrorMsg("Adding Post Failed");
    }
  }

  const formStyle = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    fontFamily: "sans-serif",
  };

  const labelStyle = {
    display: "block",
    margin: "10px 0 5px",
    fontWeight: "bold",
    fontSize: "14px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#0079d3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const errorStyle = {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Create a Post</h2>

        <label style={labelStyle}>Post Title</label>
        <input
          type="text"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          required
          placeholder="e.g. My first post"
          style={inputStyle}
        />

        <label style={labelStyle}>Post Content</label>
        <textarea
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          required
          placeholder="What's on your mind?"
          style={textareaStyle}
        />

        <button type="submit" style={buttonStyle}>
          Post
        </button>

        {errorMsg && <p style={errorStyle}>{errorMsg}</p>}
      </form>
    </>
  );
}
