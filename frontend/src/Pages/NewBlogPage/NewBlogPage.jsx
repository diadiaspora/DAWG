import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import * as blogService from "../../services/blogService"; // Assuming this service exists
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";
import "./NewBlogPage.css";
import { NavLink } from "react-router-dom";

export default function NewBlogPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [blogData, setBlogData] = useState({
    title: "",
    contentOne: "",
    contentTwo: "",
    contentThree: "",
    contentFour: "",
  });

  // Create refs for each image input
  const contentOneImageRef = useRef();
  const contentTwoImageRef = useRef();
  const contentThreeImageRef = useRef();
  const contentFourImageRef = useRef();

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const formData = new FormData();

      // Append all text fields from blogData state
      for (const key in blogData) {
        formData.append(key, blogData[key]);
      }

      // Append contentOneImage (required)
      if (contentOneImageRef.current && contentOneImageRef.current.files[0]) {
        formData.append("contentOneImage", contentOneImageRef.current.files[0]);
      } else {
        // This case should ideally be caught by browser's HTML5 validation
        console.warn("Content One Image is required but not provided.");
      }

      // Append other optional image files if they are selected
      if (
        contentTwoImageRef.current &&
        contentTwoImageRef.current.files.length > 0
      ) {
        formData.append("contentTwoImage", contentTwoImageRef.current.files[0]);
      }
      if (
        contentThreeImageRef.current &&
        contentThreeImageRef.current.files.length > 0
      ) {
        formData.append(
          "contentThreeImage",
          contentThreeImageRef.current.files[0]
        );
      }
      if (
        contentFourImageRef.current &&
        contentFourImageRef.current.files.length > 0
      ) {
        formData.append(
          "contentFourImage",
          contentFourImageRef.current.files[0]
        );
      }

      // Log FormData contents for debugging
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const blog = await blogService.create(formData);
      navigate("/blogs");
    } catch (err) {
      const errorDetail = err.message || "Unknown error";
      console.error("Adding Blog Failed:", errorDetail, err);
      setErrorMsg(`Adding Blog Failed: ${errorDetail}. Please try again.`);
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
              required // Title is required
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
              required // Content One is required
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
            <label>Upload Image for Section One</label>
            <input
              type="file"
              accept=".png, .gif, .jpg, .jpeg"
              ref={contentOneImageRef}
              required // Content One Image is required
              style={{ marginBottom: "20px" }}
            />

            <label style={{ marginLeft: "0px" }}>What Happened?</label>
            <textarea
              value={blogData.contentTwo}
              onChange={(evt) =>
                setBlogData((prev) => ({
                  ...prev,
                  contentTwo: evt.target.value,
                }))
              }
              // Removed 'required' attribute
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
            <label>Upload Image for Section Two</label>
            <input
              type="file"
              accept=".png, .gif, .jpg, .jpeg"
              ref={contentTwoImageRef}
              // Removed 'required' attribute
              style={{ marginBottom: "20px" }}
            />

            <label style={{ marginLeft: "0px" }}>How Did It End?</label>
            <textarea
              value={blogData.contentThree}
              onChange={(evt) =>
                setBlogData((prev) => ({
                  ...prev,
                  contentThree: evt.target.value,
                }))
              }
              // Removed 'required' attribute
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
            <label>Upload Image for Section Three</label>
            <input
              type="file"
              accept=".png, .gif, .jpg, .jpeg"
              ref={contentThreeImageRef}
              // Removed 'required' attribute
              style={{ marginBottom: "20px" }}
            />

            <label style={{ marginLeft: "0px" }}>What Does It Mean?</label>
            <textarea
              value={blogData.contentFour}
              onChange={(evt) =>
                setBlogData((prev) => ({
                  ...prev,
                  contentFour: evt.target.value,
                }))
              }
              // Removed 'required' attribute
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
            <label>Upload Image for Section Four</label>
            <input
              type="file"
              accept=".png, .gif, .jpg, .jpeg"
              ref={contentFourImageRef}
              // Removed 'required' attribute
              style={{ marginBottom: "20px" }}
            />

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
