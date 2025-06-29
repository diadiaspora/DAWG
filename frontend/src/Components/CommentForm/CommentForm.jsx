// src/components/CommentForm/CommentForm.jsx

import { useState } from "react";

const CommentForm = (props) => {
  const [formData, setFormData] = useState({ text: "" });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  // src/components/CommentForm/CommentForm.jsx

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddComment(formData);
    setFormData({ text: "" });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="text-input"></label>
          <div style={{display: "flex", width: "662px", marginLeft: "42px", marginBottom: "22px"}}>
            <textarea
              required
              type="text"
              name="text"
              id="text-input"
              value={formData.text}
              onChange={handleChange}
              style={{
                width: "662px",
                borderwidth: "1px",
                borderColor: "#BCC7D4",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#1E3769",
                borderWidth: "0px",
                height: "44px",
                padding: "12px",
                width: "200px"
              }}
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
