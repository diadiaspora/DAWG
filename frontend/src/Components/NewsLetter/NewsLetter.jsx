import { useState } from "react";
import "./NewsLetter.css";

export default function NewsLetter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    consent: false,
  });
  const [hover, setHover] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Email is required.");
      return;
    }

    if (!formData.consent) {
      setError("You must agree to receive our newsletter.");
      return;
    }

    setError("");
    setSubmitted(true);

    console.log("Form Submitted:", formData);
  };

  if (submitted) {
    return <p>✅ Thank you for signing up!</p>;
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#1E3769",
          width: "310px",
          borderRadius: "7px",
          height: "350px",
          marginTop: "42px",
          padding: "24px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ width: "310px", marginTop: "16px", marginLeft: "16px" }}
        >
          <h2 style={{ color: "#ffffff" }}>Join Our Newsletter</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#ffffff", marginLeft: "0px" }}>Name:</label>
            <input
              className="input-field"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <br />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "#ffffff", marginLeft: "0px" }}>
              Email*:
            </label>
            <input
              className="input-field"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: "flex" }}>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            <p style={{ fontSize: "14px", color: "#ffffff" }}>
              I agree to receive the newsletter
            </p>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            type="submit"
            style={{
              borderWidth: "1px",
              backgroundColor: "#ffffff",
              width: "240px",
              height: "44px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px",
              fontFamily: "Roboto",
              borderColor: hover ? "#4AA692" : "#1E3769",
              color: hover ? "#347567" : "#1E3769",
              borderRadius: "7px",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Subscribe
          </button>
        </form>
      </div>
    </>
  );
}
