import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

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
      <div style={{display: "flex"}}>
        <img
          src="./dawgmoney.png"
          className="dogmoney"
          alt="dog logo with money eyes"
          style={{ height: "50px" }}
        ></img>
        <img src="./dawg.png" className="doglogo" alt="dawg logo letters" style={{height: "50px"}}></img>
      </div>
      <div
        style={{
          borderStyle: "solid",
          borderwidth: "2px",
          borderColor: "black",
          borderRadius: "50px",
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
            style={{ width: "400px", height: "44px", borderRadius: "50px" }}
          />
          <label>Pet Name</label>
          <input
            type="text"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            required
            style={{ width: "400px", height: "44px", borderRadius: "50px" }}
          />
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
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
            style={{ width: "400px", height: "44px", borderRadius: "50px" }}
          />
          <button
            type="submit"
            disabled={disable}
            style={{ height: "44px", borderRadius: "50px", marginTop: "42px" }}
          >
            SIGN UP
          </button>
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
