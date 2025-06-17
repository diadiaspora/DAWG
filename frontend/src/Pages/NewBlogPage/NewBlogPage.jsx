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
        <h2>Share Your Experiences</h2>
        <form onSubmit={handleSubmit}>
          <label>Tell Us Your Story</label>
          <input
            type="text"
            value={blogData.title}
            onChange={(evt) =>
              setBlogData((prev) => ({ ...prev, title: evt.target.value }))
            }
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
          <label>How Did It Start?</label>
          <textarea
            value={blogData.contentOne}
            onChange={(evt) =>
              setBlogData((prev) => ({ ...prev, contentOne: evt.target.value }))
            }
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
          <label>What Happened?</label>{" "}
          <textarea
            value={blogData.contentTwo}
            onChange={(evt) =>
              setBlogData((prev) => ({ ...prev, contentTwo: evt.target.value }))
            }
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
          <label>How Did It End?</label>{" "}
          <textarea
            value={blogData.contentThree}
            onChange={(evt) =>
              setBlogData((prev) => ({ ...prev, contentThree: evt.target.value }))
            }
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
          <label>What Does It Mean?</label>
          <textarea
            value={blogData.contentFour}
            onChange={(evt) =>
              setBlogData((prev) => ({ ...prev, contentFour: evt.target.value }))
            }
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
        <p >&nbsp;{errorMsg}</p>
      </section>
    </>
  );
}
