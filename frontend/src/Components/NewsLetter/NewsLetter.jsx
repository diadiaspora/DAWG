import { useState } from "react";

export default function NewsLetter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    consent: false,
  });

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

    // Replace this with actual API call
    console.log("Form Submitted:", formData);
  };

  if (submitted) {
    return <p>✅ Thank you for signing up!</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "350px", marginTop:"42px", marginLeft: "42px" }}>
      <h2>Join Our Newsletter</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ width: "200px" }}
        />
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Email*:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: "200px" }}
          required
        />
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Comment:</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          style={{ width: "200px" }}
        />
      </div>
      <br />

     
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
        onChange={handleChange}
        style={{fontSize: "10px"}}
        />
        I agree to receive the newsletter 
        
       
        
   

      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button style={{height: "44px", width: "200px"}}type="submit">Subscribe</button>
    </form>
  );
}
