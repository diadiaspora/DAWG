import { NavLink, Link, useNavigate } from "react-router-dom";
import { logOut } from "../../services/authService";
import "./NavBar.css";

export default function NavBar({ user, setUser, profile }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
  }
  console.log({ profile });
  const avatarSrc = profile?.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png";

  return (
    <nav className="NavBar">
      <img
        src="/dawgmoney.png"
        className="dogmoney"
        alt="dog logo with money eyes"
      ></img>
      <NavLink to="/">
        <img src="/dawg.png" className="doglogo" alt="dawg logo letters"></img>
      </NavLink>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <NavLink to="/fly">Flights</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/plans">Plan</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/write">Write</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/marketplace">Shop</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/profiles">Profile</NavLink>
          &nbsp; | &nbsp;
          <Link to="/" onClick={handleLogOut}>
            Log Out
          </Link>
          {/* <span>Welcome, {user.name}</span> */}
          <span>
            <img
              src={profile?.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png"}
              className="avatar"
              alt="User Avatar"
            />
          </span>
        </>
      ) : (
        <>
          <NavLink to="/fly" end>
            Flights
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/posts">Posts</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/blogs">Blogs</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/marketplace">Shop</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/login">Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
          <span>
            <img
              src={profile?.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png"}
              className="avatar"
                alt="User Avatar"
                style={{width: "33px"}}
            />
          </span>
        </>
      )}
    </nav>
  );
}
