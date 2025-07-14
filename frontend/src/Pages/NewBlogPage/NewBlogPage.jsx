import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import * as blogService from "../../services/blogService"; // Assuming this service exists
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Header from "../../Components/Header/Header.jsx";
import VerticleHootList from "../../Components/VerticleHootList/VerticleHootList";


import "./NewBlogPage.css";
import { NavLink } from "react-router-dom";

export default function NewBlogPage({ user, setUser, hoots }) {
  const [errorMsg, setErrorMsg] = useState("");
  const klookWidgetRef = useRef(null);

  


  const handleClickOne = () => contentOneImageRef.current.click();
  const handleClickTwo = () => contentTwoImageRef.current.click();
  const handleClickThree = () => contentThreeImageRef.current.click();
  const handleClickFour = () => contentFourImageRef.current.click();
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };


  const [blogData, setBlogData] = useState({
    title: "",
    contentOne: "",
    contentTwo: "",
    contentThree: "",
    contentFour: "",
  });

  const contentOneImageRef = useRef();
  const contentTwoImageRef = useRef();
  const contentThreeImageRef = useRef();
  const contentFourImageRef = useRef();

  const navigate = useNavigate();

  const handleAddHoot = async (newHootData) => {
    const createdHoot = await hootService.create(newHootData);
    console.log("New hoot created:", createdHoot);
    navigate("/"); // or refresh the list, or update props.hoots
  };

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

  useEffect(() => {
    if (klookWidgetRef.current) {
      // Prevent duplicate script injection
      if (
        !document.querySelector(
          'script[src="https://affiliate.klook.com/widget/fetch-iframe-init.js"]'
        )
      ) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://affiliate.klook.com/widget/fetch-iframe-init.js";
        document.body.appendChild(script);
      }

      klookWidgetRef.current.innerHTML = `
        <ins class="klk-aff-widget" 
             data-wid="93395" 
             data-bgtype="Play" 
             data-adid="1085833" 
             data-lang="en" 
             data-prod="banner" 
             data-width="300"
             style="border-radius: 7px; overflow: hidden; display: block;"
             data-height="250">
          <a href="//www.klook.com/?aid=">Klook.com</a>
        </ins>
      `;
    }
  }, []);

  return (
    <>
      <section>
        <Header />
        <SearchComponent />
        <div>
          <div
            style={{
              width: "1032px",
              display: "flex",
              marginRight: "0px" ,
              paddingRight: "0px",
            }}
          >
            <div style={{ width: "632px", marginLeft: "42px", marginRight: "0px" }}>
              <h2 style={{ fontSize: "24px" }}> Tell Us Your Story</h2>
              <div
                style={{
                  border: "1px solid #e9e9e9",
                  borderRadius: "7px",
                  width: "662px",
                  backgroundColor: "white",
                  padding: "21px",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <label style={{ marginLeft: "0px" }}>Title</label>
                  <input
                    type="text"
                    value={blogData.title}
                    onChange={(evt) =>
                      setBlogData((prev) => ({
                        ...prev,
                        title: evt.target.value,
                      }))
                    }
                    required // Title is required
                    style={{
                      padding: "8px",
                      borderRadius: "7px",

                      marginBottom: "15px",
                      width: "calc(100% - 16px)",
                      boxSizing: "border-box",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "#BCC7D4",
                      backgroundColor: "#F2F4F7",
                    }}
                  />
                  <div style={{ display: "flex" }}>
                    <label style={{ marginLeft: "0px", marginTop: "9px" }}>
                      How Did It Start?
                    </label>

                    <div>
                      <input
                        type="file"
                        accept=".png, .gif, .jpg, .jpeg"
                        ref={contentOneImageRef}
                        required
                        style={{ marginBottom: "20px", display: "none" }}
                      />
                      <button
                        type="button"
                        onClick={handleClickOne}
                        className="upload-button"
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
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
                      borderRadius: "7px",
                      marginBottom: "20px",
                      width: "calc(100% - 16px)",
                      boxSizing: "border-box",
                      resize: "vertical",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "#BCC7D4",
                      backgroundColor: "#F2F4F7",
                    }}
                  ></textarea>
                  <div style={{ display: "flex" }}>
                    <label style={{ marginLeft: "0px", marginTop: "9px" }}>
                      What Happened?
                    </label>
                    <div>
                      <input
                        type="file"
                        accept=".png, .gif, .jpg, .jpeg"
                        ref={contentTwoImageRef}
                        // Removed 'required' attribute
                        style={{ marginBottom: "20px", display: "none" }}
                      />

                      <button
                        type="button"
                        onClick={handleClickTwo}
                        className="upload-button"
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
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
                      borderRadius: "7px",

                      marginBottom: "20px",
                      width: "calc(100% - 16px)",
                      boxSizing: "border-box",
                      resize: "vertical",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "#BCC7D4",
                      backgroundColor: "#F2F4F7",
                    }}
                  ></textarea>
                  <div style={{ display: "flex" }}>
                    <label style={{ marginLeft: "0px", marginTop: "9px" }}>
                      How Did It End?
                    </label>
                    <div>
                      <input
                        type="file"
                        accept=".png, .gif, .jpg, .jpeg"
                        ref={contentThreeImageRef}
                        style={{ marginBottom: "20px", display: "none" }}
                      />
                      <button
                        type="button"
                        onClick={handleClickThree}
                        className="upload-button"
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={blogData.contentThree}
                    onChange={(evt) =>
                      setBlogData((prev) => ({
                        ...prev,
                        contentThree: evt.target.value,
                      }))
                    }
                    rows="8"
                    style={{
                      padding: "8px",
                      borderRadius: "7px",

                      marginBottom: "20px",
                      width: "calc(100% - 16px)",
                      boxSizing: "border-box",
                      resize: "vertical",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "#BCC7D4",
                      backgroundColor: "#F2F4F7",
                    }}
                  ></textarea>
                  <div style={{ display: "flex" }}>
                    <label style={{ marginLeft: "0px", marginTop: "9px" }}>
                      What Does It Mean?
                    </label>
                    <div>
                      <input
                        type="file"
                        accept=".png, .gif, .jpg, .jpeg"
                        ref={contentFourImageRef}
                        style={{ marginBottom: "20px", display: "none" }}
                      />
                      <button
                        type="button"
                        onClick={handleClickFour}
                        className="upload-button"
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
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
                      borderRadius: "7px",

                      marginBottom: "20px",
                      width: "calc(100% - 16px)",
                      boxSizing: "border-box",
                      resize: "vertical",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "#BCC7D4",
                      backgroundColor: "#F2F4F7",
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

                        color: "white",
                        border: "none",
                        borderRadius: "7px",
                        cursor: "pointer",
                        fontSize: "16px",
                        backgroundColor: "#1E3769",
                      }}
                    >
                      Publish Your Story
                    </button>
                  </div>
                </form>
                <p>&nbsp;{errorMsg}</p>
              </div>
            </div>

            <div style={{ width: "310px", marginLeft: "26px" }}>
              <VerticleHootList
                user={user}
                setUser={setUser}
                hoots={hoots}
                handleAddHoot={handleAddHoot}
              />
              <div
                style={{
                  width: "310px",
                  backgroundColor: "#1E3769",
                  marginLeft: "42px",
                  borderRadius: "7px",
                  paddingTop: "2px",
                  marginTop: "22px",
                }}
              >
                <div ref={klookWidgetRef} style={{ padding: "6px" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
