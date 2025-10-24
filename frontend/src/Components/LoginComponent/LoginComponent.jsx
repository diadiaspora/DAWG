import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./LoginComponent.css";

export default function LoginComponent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  console.log("Rendering LoginComponent");
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.logIn(formData);

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
    <>
      <div className="screen">
        <img
          src="./dawgmoney.png"
          className="dogmoney"
          alt="dog logo with money eyes"
          style={{ width: "100px" }}
        ></img>
        <img src="./dawg.png" className="doglogo" alt="dawg logo letters"></img>
        <div
          style={{
            borderStyle: "solid",
            borderwidth: "1px",
            borderColor: "#d9d9d9",
            borderRadius: "7px",
            padding: "42px",
          }}
        >
          <h2>Log In!</h2>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label style={{ marginLeft: "0px" }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
            <label style={{ marginLeft: "0px", marginTop: "16px" }}>
              Password
            </label>
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
              }}
            >
              LOG IN
            </button>
            <span style={{ marginTop: "16px" }}>
              <hr />
            </span>
          </form>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              style={{
                marginTop: "16px",
                borderRadius: "7px",
                borderColor: "#1E3769",
                borderWidth: "2px",
                backgroundColor: "#ffffff",
                color: "#1E3769",
                height: "44px",
              }}
            >
              <FaGoogle />
              Log in with Google
            </button>
            <button
              style={{
                marginTop: "16px",
                borderRadius: "7px",
                borderColor: "#1E3769",
                borderWidth: "2px",
                backgroundColor: "#ffffff",
                color: "#1E3769",
                height: "44px",
              }}
            >
              <FaApple />
              Log in with Apple
            </button>
            <button
              style={{
                marginTop: "16px",
                borderRadius: "7px",
                borderColor: "#1E3769",
                borderWidth: "2px",
                backgroundColor: "#ffffff",
                color: "#1E3769",
                height: "44px",
              }}
            >
              <FaFacebook />
              Log in with Facebook
            </button>
          </div>
          <p className="error-message">&nbsp;{errorMsg}</p>
        </div>
      </div>
    </>
  );
}
