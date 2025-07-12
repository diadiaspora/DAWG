import "./HootForm.css";
import GiphyPicker from "../GiphyPicker/GiphyPicker"; 
import { useState } from "react";

const HootForm = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "General",
    gifUrl: "", 
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log("formData", formData);

    try {
      await props.handleAddHoot(formData);

      
      setFormData({
        title: "",
        text: "",
        category: "News",
        gifUrl: "", 
      });
    } catch (err) {
      console.error("Error submitting hoot:", err);
    }
  };

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "320px",
          backgroundColor: "#1e37691f",
          borderRadius: "7px",
          padding: "20px",
        }}
      >
        <p style={{ marginBottom: "0px", marginTop: "0px" }}>Create a Post</p>

        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
          className="custom-input"
        />

        <label htmlFor="text-input">Text</label>
        <textarea
          required
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
          className="custom-input"
        />

        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
          className="custom-input"
        >
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>

    
        <GiphyPicker
          onSelect={(url) => setFormData({ ...formData, gifUrl: url })}
        />

       
        {formData.gifUrl && (
          <div style={{ marginTop: "12px" }}>
            <img
              src={formData.gifUrl}
              alt="Selected GIF"
              style={{
                maxWidth: "100%",
                borderRadius: "6px",
                boxShadow: "0 0 6px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: "#1E3769",
            height: "44px",
            borderWidth: "0px",
            color: "#fff",
            borderRadius: "6px",
            marginTop: "16px",
          }}
        >
          SUBMIT
        </button>
      </form>
    </main>
  );
};

export default HootForm;
