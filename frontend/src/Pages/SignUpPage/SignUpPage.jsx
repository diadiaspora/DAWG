import { useState, NavLink } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import "./SignUpPage.css";

export default function SignUpPage({ setUser }) {
  const [formData, setFormData] = useState({
    name: "",
    petName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await signUp(formData);
      setUser(user);
      navigate("/");
    } catch (err) {
      setErrorMsg("Sign Up Failed - Try Again");
    }
  }

  const disable = formData.password !== formData.confirm;

  return (
    <>
      <div style={{ display: "flex" }}>
        <img
          src="./dawgmoney.png"
          className="dogmoney"
          alt="dog logo with money eyes"
          style={{ height: "50px" }}
        ></img>
        <img
          src="./dawg.png"
          className="doglogo"
          alt="dawg logo letters"
          style={{ height: "50px" }}
        ></img>
      </div>
      <div
        style={{
          borderStyle: "solid",
          borderwidth: "1px",
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
          <label style={{ marginLeft: "0px" }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />

          <label style={{ marginLeft: "0px" }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <label style={{ marginLeft: "0px" }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />
          <label style={{ marginLeft: "0px" }}>Confirm</label>
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
            SIGN UP
          </button>
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
    </>
  );
}
