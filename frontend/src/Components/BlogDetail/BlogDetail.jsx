import { useState, useEffect, useRef } from "react"; // Import useRef
import * as blogService from "../../services/blogService";
import { useParams, useNavigate } from "react-router-dom"; // Use react-router-dom for consistent imports

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Refs for image file inputs in editing mode
  const contentOneImageRef = useRef();
  const contentTwoImageRef = useRef();
  const contentThreeImageRef = useRef();
  const contentFourImageRef = useRef();

  useEffect(() => {
    async function fetchBlog() {
      // Changed function name for clarity
      try {
        const fetchedBlog = await blogService.show(id);
        console.log("Fetched Blog Data:", fetchedBlog);
        setBlog(fetchedBlog);
        setFormData({
          title: fetchedBlog.title || "",
          contentOne: fetchedBlog.contentOne || "",
          contentTwo: fetchedBlog.contentTwo || "",
          contentThree: fetchedBlog.contentThree || "",
          contentFour: fetchedBlog.contentFour || "",
          // Initialize image URLs in formData for display (though they won't be edited directly here)
          // These are just for the initial state if you wanted to display existing images in edit mode,
          // but for file inputs, we just rely on refs.
        });
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        // Handle error, e.g., navigate to an error page or show a message
        navigate("/error"); // Example: navigate to an error page
      }
    }
    fetchBlog();
  }, [id, navigate]); // Added navigate to dependency array

  const handleDeleteBlog = async (blogId) => {
    try {
      // Add a confirmation dialog before deleting
      if (!window.confirm("Are you sure you want to delete this blog post?")) {
        return; // Stop if user cancels
      }
      await blogService.deleteBlog(blogId);
      navigate(`/blogs`); // Navigate to the blogs list or home page after deletion
    } catch (err) {
      console.error("Failed to delete blog:", err);
      // Display a user-friendly error message
      alert("Failed to delete blog. Please try again."); // Using alert for simplicity, but a custom modal is better
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateBlog = async () => {
    try {
      const updateFormData = new FormData();

      // Append text fields
      for (const key in formData) {
        updateFormData.append(key, formData[key]);
      }

      // Append image files if new ones are selected
      if (contentOneImageRef.current && contentOneImageRef.current.files[0]) {
        updateFormData.append(
          "contentOneImage",
          contentOneImageRef.current.files[0]
        );
      }
      if (contentTwoImageRef.current && contentTwoImageRef.current.files[0]) {
        updateFormData.append(
          "contentTwoImage",
          contentTwoImageRef.current.files[0]
        );
      }
      if (
        contentThreeImageRef.current &&
        contentThreeImageRef.current.files[0]
      ) {
        updateFormData.append(
          "contentThreeImage",
          contentThreeImageRef.current.files[0]
        );
      }
      if (contentFourImageRef.current && contentFourImageRef.current.files[0]) {
        updateFormData.append(
          "contentFourImage",
          contentFourImageRef.current.files[0]
        );
      }

      const updatedBlog = await blogService.update(id, updateFormData);
      console.log("Updated Blog:", updatedBlog);
      setBlog(updatedBlog);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update blog:", err);
      alert("Failed to update blog. Please try again."); // Using alert for simplicity
    }
  };

  if (!blog) return <main>Loading Blog...</main>; // Indicate loading state

  return (
    <>
      <section
        style={{
          margin: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        {isEditing ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />

            <label>Content One:</label>
            <textarea
              name="contentOne"
              value={formData.contentOne}
              onChange={handleChange}
              rows="5"
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                resize: "vertical",
              }}
            />
            <label>Upload Image for Section One (Optional):</label>
            <input
              type="file"
              accept=".png, .gif, .jpg, .jpeg"
              ref={contentOneImageRef}
            />
            {blog.contentOneImage &&
              blog.contentOneImage !== "https://i.imgur.com/KTEjbsw.png" && (
                <img
                  src={blog.contentOneImage}
                  alt="Content One"
                  style={{
                    maxWidth: "200px",
                    marginTop: "10px",
                    borderRadius: "4px",
                  }}
                />
              )}

            <label>Content Two:</label>
            <textarea
              name="contentTwo"
              value={formData.contentTwo}
              onChange={handleChange}
              rows="5"
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                resize: "vertical",
              }}
            />
            <label>Upload Image for Section Two (Optional):</label>
            <input
              type="file"
              accept=".png, .gif, .jpg, .jpeg"
              ref={contentTwoImageRef}
            />
            {blog.contentTwoImage &&
              blog.contentTwoImage !== "https://i.imgur.com/KTEjbsw.png" && (
                <img
                  src={blog.contentTwoImage}
                  alt="Content Two"
                  style={{
                    maxWidth: "200px",
                    marginTop: "10px",
                    borderRadius: "4px",
                  }}
                />
              )}

            <label>Content Three:</label>
            <textarea
              name="contentThree"
              value={formData.contentThree}
              onChange={handleChange}
              rows="5"
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                resize: "vertical",
              }}
            />
            <label>Upload Image for Section Three (Optional):</label>
            <input
              type="file"
              accept=".png, .gif, .jpg, .jpeg"
              ref={contentThreeImageRef}
            />
            {blog.contentThreeImage &&
              blog.contentThreeImage !== "https://i.imgur.com/KTEjbsw.png" && (
                <img
                  src={blog.contentThreeImage}
                  alt="Content Three"
                  style={{
                    maxWidth: "200px",
                    marginTop: "10px",
                    borderRadius: "4px",
                  }}
                />
              )}

            <label>Content Four:</label>
            <textarea
              name="contentFour"
              value={formData.contentFour}
              onChange={handleChange}
              rows="5"
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                resize: "vertical",
              }}
            />
            <label>Upload Image for Section Four (Optional):</label>
            <input
              type="file"
              accept=".png, .gif, .jpg, .jpeg"
              ref={contentFourImageRef}
            />
            {blog.contentFourImage &&
              blog.contentFourImage !== "https://i.imgur.com/KTEjbsw.png" && (
                <img
                  src={blog.contentFourImage}
                  alt="Content Four"
                  style={{
                    maxWidth: "200px",
                    marginTop: "10px",
                    borderRadius: "4px",
                  }}
                />
              )}
          </div>
        ) : (
          <div>
            <h1>{blog.title}</h1>
            {/* Conditional rendering for author and date to prevent null errors */}
            {blog.author && blog.author.username ? (
              <p>
                {`${blog.author.username} posted on ${new Date(
                  blog.createdAt
                ).toLocaleDateString()}`}
              </p>
            ) : (
              <p>Posted on {new Date(blog.createdAt).toLocaleDateString()}</p>
            )}
            <p>{blog.contentOne}</p>
            {blog.contentOneImage &&
              blog.contentOneImage !== "https://i.imgur.com/KTEjbsw.png" && (
                <img
                  src={blog.contentOneImage}
                  alt="Content One"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "8px",
                  }}
                />
              )}
            <p>{blog.contentTwo}</p>
            {blog.contentTwoImage &&
              blog.contentTwoImage !== "https://i.imgur.com/KTEjbsw.png" && (
                <img
                  src={blog.contentTwoImage}
                  alt="Content Two"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "8px",
                  }}
                />
              )}
            <p>{blog.contentThree}</p>
            {blog.contentThreeImage &&
              blog.contentThreeImage !== "https://i.imgur.com/KTEjbsw.png" && (
                <img
                  src={blog.contentThreeImage}
                  alt="Content Three"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "8px",
                  }}
                />
              )}
            <p>{blog.contentFour}</p>
            {blog.contentFourImage &&
              blog.contentFourImage !== "https://i.imgur.com/KTEjbsw.png" && (
                <img
                  src={blog.contentFourImage}
                  alt="Content Four"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    marginTop: "10px",
                    borderRadius: "8px",
                  }}
                />
              )}
          </div>
        )}
        <h2>Comments</h2> {/* Placeholder for comments section */}
      </section>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        {isEditing ? (
          <button
            onClick={handleUpdateBlog}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#008CBA",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Update
          </button>
        )}
        <button
          onClick={() => handleDeleteBlog(blog._id)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete Blog
        </button>
      </div>
    </>
  );
}
