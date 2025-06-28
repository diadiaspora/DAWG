// src/components/HootForm/HootForm.jsx

import { useState } from "react";

const HootForm = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "News",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log("formData", formData);

    // Call the function passed via props
    try {
      await props.handleAddHoot(formData);

      // Optional: clear form after submission
      setFormData({
        title: "",
        text: "",
        category: "News",
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
          backgroundColor: "#d9d9d9",
          borderRadius: "7px",
          padding: "20px",
        }}
      >
        <p style={{marginBottom: "0px", marginTop: "0px"}}> Create a Post</p>

        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default HootForm;
