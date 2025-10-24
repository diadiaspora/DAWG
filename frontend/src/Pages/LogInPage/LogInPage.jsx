import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as authService from "../../services/authService";
import "./LoginPage.css";

export default function LogInPage({ setUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      setSuccessMsg("✅ Your account has been verified! Please log in.");
    }
  }, [searchParams]);

  // --- Handle form submit ---
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.logIn(formData);
      setUser(user);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data?.message?.toLowerCase().includes("verify")) {
        setErrorMsg("Your account is not verified. Please check your email.");
      } else {
        setErrorMsg("Log In Failed - Try Again");
      }
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg("");
    setSuccessMsg("");
  }

  return (
    <div className="screen">
      {/* Logo Section */}
      <img
        src="./dawgmoney.png"
        className="dogmoney"
        alt="dog logo with money eyes"
        style={{ width: "100px" }}
      />
      <img src="./dawg.png" className="doglogo" alt="dawg logo letters" />

      {/* Login Card */}
      <div
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "#d9d9d9",
          borderRadius: "7px",
          padding: "42px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2>Log In!</h2>

        {successMsg && (
          <p style={{ color: "green", marginBottom: "16px" }}>{successMsg}</p>
        )}

        {errorMsg && (
          <p style={{ color: "red", marginBottom: "16px" }}>{errorMsg}</p>
        )}

        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />

          <label style={{ marginTop: "16px" }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />

          <button
            type="submit"
            style={{
              height: "44px",
              borderRadius: "7px",
              marginTop: "42px",
              backgroundColor: "#1E3769",
              borderWidth: "0px",
              color: "#fff",
            }}
          >
            LOG IN
          </button>
          <hr style={{ marginTop: "16px" }} />
        </form>
      </div>
    </div>
  );
}

const socialButtonStyle = {
  marginTop: "16px",
  borderRadius: "7px",
  borderColor: "#1E3769",
  borderWidth: "2px",
  backgroundColor: "#ffffff",
  color: "#1E3769",
  height: "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};
