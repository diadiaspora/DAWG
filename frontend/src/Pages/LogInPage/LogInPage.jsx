import { useState } from "react";
import { useNavigate } from "react-router";
import * as authService from "../../services/authService";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";


export default function LogInPage({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.logIn(formData);
      setUser(user);
      navigate("/");
    } catch (err) {
      setErrorMsg("Log In Failed - Try Again");
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg("");
  }

  return (
    <>
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
          borderwidth: "2px",
          borderColor: "black",
          borderRadius: "50px",
          padding: "42px",
        }}
      >
        <h2>Log In!</h2>
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
            style={{ width: "400px", height: "44px", borderRadius: "50px" }}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "400px", height: "44px", borderRadius: "50px" }}
          />
          <button
            type="submit"
            style={{ height: "44px", borderRadius: "50px", marginTop: "42px" }}
          >
            LOG IN
          </button>
          <span>
            <hr />
          </span>
        </form>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            style={{
              borderRadius: "50px",
              backgroundColor: "#1E3769",
              color: "white",
              height: "44px",
            }}
          >
            <FaGoogle />
            Log in with Google
          </button>
          <button
            style={{
              borderRadius: "50px",
              backgroundColor: "#1E3769",
              color: "white",
              height: "44px",
            }}
          >
            <FaApple />
            Log in with Apple
          </button>
          <button
            style={{
              borderRadius: "50px",
              backgroundColor: "#1E3769",
              color: "white",
              height: "44px",
            }}
          >
            <FaFacebook />
             Log in with Facebook
          </button>
        </div>
        <p className="error-message">&nbsp;{errorMsg}</p>
      </div>
    </>
  );
}
