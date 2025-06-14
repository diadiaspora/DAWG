import { useState } from "react";
import { useNavigate } from "react-router";
import * as blogService from "../../services/blogService";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";

export default function NewBlogPage() {
  const [title, setTitle] = useState(""); 
  const [content, setContent] = useState(""); 
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
    
      await blogService.create({ title, content });
      navigate("/blogs");
    } catch (err) {
      setErrorMsg("Adding Blog Failed");
    }
  }

  return (
    <>
      <Header />
      <SearchComponent />
      <h2>Share Your Experiences</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>{" "}
        <input
          type="text"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          required
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "15px",
            width: "calc(100% - 16px)",
            boxSizing: "border-box",
          }}
        />
        <label>Content</label>{" "}
        <textarea
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          required
          rows="8"
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            width: "calc(100% - 16px)",
            boxSizing: "border-box",
            resize: "vertical",
          }}
        ></textarea>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ADD Blog
        </button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}
