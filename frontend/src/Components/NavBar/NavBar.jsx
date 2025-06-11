import { NavLink, Link, useNavigate } from "react-router";
import { logOut } from "../../services/authService";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    // The <Link> that was clicked will navigate to "/"
  }

  return (
    <nav className="NavBar">
      <img
        src="./dawgmoney.png"
        className="dogmoney"
        alt="dog logo with money eyes"
      ></img>
      <NavLink to="/">
        <img src="./dawg.png" className="doglogo" alt="dawg logo letters"></img>
      </NavLink>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <NavLink to="/flights" end>
            Flights
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/plans">Plan</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/blog">Write</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/marketplace">Shop</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/profiles">Profile</NavLink>
          &nbsp; | &nbsp;
          <Link to="/" onClick={handleLogOut}>
            Log Out
          </Link>
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <NavLink to="/login">Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}
