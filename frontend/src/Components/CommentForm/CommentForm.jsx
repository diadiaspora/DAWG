import { useState, useEffect } from "react";

const CommentForm = ({ handleAddComment, parentId = null, onCancel }) => {
  const [formData, setFormData] = useState({ text: "" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const dataToSend = { ...formData };
    if (parentId) dataToSend.parentId = parentId;
    handleAddComment(dataToSend);
    setFormData({ text: "" });
    if (onCancel) onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginLeft: parentId ? "60px" : "42px", marginBottom: "22px" }}
    >
      <div>
        <label htmlFor="text-input" hidden>
          Comment
        </label>
        <div
          className="commdiv"
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            width: "100%",
            marginLeft: "-40px",
            gap: isMobile ? "8px" : "0",
          }}
        >
          <textarea
            className="texta"
            required
            name="text"
            id="text-input"
            value={formData.text}
            onChange={handleChange}
            style={{
              flex: 1,
              borderWidth: "1px",
              borderColor: "#BCC7D4",
              padding: "8px",
              borderRadius: "4px",
              width: isMobile ? "calc(100% + 20px)" : "auto",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#1E3769",
              border: "none",
              height: "44px",
              padding: "12px",
              marginLeft: isMobile ? "0" : "12px",
              width: isMobile ? "calc(100% + 20px)" : "170px",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          >
            {parentId ? "Reply" : "Comment"}
          </button>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              marginTop: "4px",
              marginLeft: "8px",
              fontSize: "12px",
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
              width: isMobile ? "calc(100% + 20px)" : "170px",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
