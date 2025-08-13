import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/authService";

import "./SignUpPage.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    petName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    try {
      await signUp(formData); // Don't set user or store token
      alert("Check your email to verify your account");
      navigate("/login");
    } catch (err) {
      console.error("Sign Up Error:", err);
      setErrorMsg(
        err?.message || "Sign Up Failed - Please check your info and try again"
      );
    } finally {
      setLoading(false);
    }
  }

  const disable = formData.password !== formData.confirm || loading;

  return (
    <div className="signupp">
      <div style={{ display: "flex" }}>
        <img
          src="./dawgmoney.png"
          className="dogmoney"
          alt="dog logo with money eyes"
          style={{ height: "50px" }}
        />
        <img
          src="./dawg.png"
          className="doglogo"
          alt="dawg logo letters"
          style={{ height: "50px" }}
        />
      </div>

      <div
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "#d9d9d9",
          borderRadius: "7px",
          padding: "42px",
        }}
      >
        <h2>Sign Up!</h2>

        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />

          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
            className="input-field"
          />

          <button
            type="submit"
            disabled={disable}
            style={{
              height: "44px",
              borderRadius: "7px",
              marginTop: "42px",
              backgroundColor: "#1E3769",
              borderWidth: "0px",
            }}
          >
            {loading ? "Signing Up..." : "SIGN UP"}
          </button>
        </form>

        <p className="error-message">&nbsp;{errorMsg}</p>
      </div>
    </div>
  );
}
