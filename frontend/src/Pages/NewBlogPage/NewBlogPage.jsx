import { useState } from "react";
import { useNavigate } from "react-router";
import * as blogService from "../../services/blogService";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";
import "./NewBlogPage.css";

export default function NewBlogPage() {
  const [title, setTitle] = useState(""); 
  
  const [errorMsg, setErrorMsg] = useState("");
  const [blogData, setBlogData] = useState({
    title: "",
    contentOne: "",
    contentTwo: "",
    contentThree: "",
    contentFour: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
    
      const blog = await blogService.create(blogData);
      navigate("/blogs");
    } catch (err) {
      setErrorMsg("Adding Blog Failed");
    }
  }

  return (
    <>
      <section>
        <Header />
        <SearchComponent />
        <div style={{ margin: "42px" }}>
          <h2 style={{ fontSize: "24px" }}> Tell Us Your Story</h2>
          <form onSubmit={handleSubmit}>
            <label style={{ marginLeft: "0px" }}>Title</label>
            <input
              type="text"
              value={blogData.title}
              onChange={(evt) =>
                setBlogData((prev) => ({ ...prev, title: evt.target.value }))
              }
              required
              style={{
                padding: "8px",
                borderRadius: "20px",
                border: "1px solid #000000",
                marginBottom: "15px",
                width: "calc(100% - 16px)",
                boxSizing: "border-box",
              }}
            />
            <label style={{ marginLeft: "0px" }}>How Did It Start?</label>
            <textarea
              value={blogData.contentOne}
              onChange={(evt) =>
                setBlogData((prev) => ({
                  ...prev,
                  contentOne: evt.target.value,
                }))
              }
              required
              rows="8"
              style={{
                padding: "8px",
                borderRadius: "20px",
                border: "1px solid #000000",
                marginBottom: "20px",
                width: "calc(100% - 16px)",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            ></textarea>
            <label style={{ marginLeft: "0px" }}>What Happened?</label>{" "}
            <textarea
              value={blogData.contentTwo}
              onChange={(evt) =>
                setBlogData((prev) => ({
                  ...prev,
                  contentTwo: evt.target.value,
                }))
              }
              required
              rows="8"
              style={{
                padding: "8px",
                borderRadius: "20px",
                border: "1px solid #000000",
                marginBottom: "20px",
                width: "calc(100% - 16px)",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            ></textarea>
            <label style={{ marginLeft: "0px" }}>How Did It End?</label>{" "}
            <textarea
              value={blogData.contentThree}
              onChange={(evt) =>
                setBlogData((prev) => ({
                  ...prev,
                  contentThree: evt.target.value,
                }))
              }
              required
              rows="8"
              style={{
                padding: "8px",
                borderRadius: "20px",
                border: "1px solid #000000",
                marginBottom: "20px",
                width: "calc(100% - 16px)",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            ></textarea>
            <label style={{ marginLeft: "0px" }}>What Does It Mean?</label>
            <textarea
              value={blogData.contentFour}
              onChange={(evt) =>
                setBlogData((prev) => ({
                  ...prev,
                  contentFour: evt.target.value,
                }))
              }
              required
              rows="8"
              style={{
                padding: "8px",
                borderRadius: "20px",
                border: "1px solid #000000",
                marginBottom: "20px",
                width: "calc(100% - 16px)",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            ></textarea>
            <div
              style={{
                display: "flex",
                justifyContent: "End",
                marginRight: "21px",
              }}
            >
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#1E3769",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Publish Your Blog
              </button>
            </div>
          </form>
          <p>&nbsp;{errorMsg}</p>
        </div>
      </section>
    </>
  );
}
