import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as authService from "../../services/authService";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import "./LoginPage.css";

export default function LogInPage({ setUser }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // --- Automatic login after verification ---
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // Save token (e.g., localStorage or cookies)
      localStorage.setItem("token", token);

      // Optionally decode JWT to get user info
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);

      navigate("/"); // Redirect to homepage
    }
  }, [searchParams, setUser, navigate]);

  // --- Manual login ---
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.logIn(formData);
      setUser(user);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      if (err.message.includes("verify your email")) {
        setErrorMsg(
          "Your account is not verified. Please check your email to verify your account."
        );
      } else {
        setErrorMsg("Log In Failed - Try Again");
      }
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg("");
  }

  return (
    <div className="screen">
      <img src="./dawgmoney.png" className="dogmoney" alt="dog logo with money eyes" style={{ width: "100px" }} />
      <img src="./dawg.png" className="doglogo" alt="dawg logo letters" />
      <div style={{ borderStyle: "solid", borderWidth: "1px", borderColor: "#d9d9d9", borderRadius: "7px", padding: "42px" }}>
        <h2>Log In!</h2>
        <form autoComplete="off" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" />
          <label style={{ marginTop: "16px" }}>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="input-field" />
          <button type="submit" style={{ height: "44px", borderRadius: "7px", marginTop: "42px", backgroundColor: "#1E3769", borderWidth: "0px" }}>
            LOG IN
          </button>
          <hr style={{ marginTop: "16px" }} />
        </form>

        {/* Social Login Buttons */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button style={socialButtonStyle}><FaGoogle /> Log in with Google</button>
          <button style={socialButtonStyle}><FaApple /> Log in with Apple</button>
          <button style={socialButtonStyle}><FaFacebook /> Log in with Facebook</button>
        </div>

        <p className="error-message">&nbsp;{errorMsg}</p>
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
