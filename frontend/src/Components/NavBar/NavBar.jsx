import { NavLink, Link } from "react-router-dom";
import { logOut } from "../../services/authService";
import NavBarMobile from "../NavBarMobile/NavBarMobile";

import "./NavBar.css";

export default function NavBar({ user, setUser, profile }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  const avatarSrc = profile?.avatar || "https://i.ibb.co/bgQM3cM2/Vector.png";

  return (
    <>
      {/* Desktop Nav */}
      <nav className="NavBar">
        <NavLink to="/" className="logo-link">
          <img
            src="/DawgLogo.png"
            className="dogmoney"
            alt="dog logo with money eyes"
          />
        
        </NavLink>

        {user ? (
          <>
            <NavLink to="/fly">Flights</NavLink>
            <NavLink to="/plans">Plan</NavLink>
            <NavLink to="/allposts">Posts</NavLink>
            <NavLink to="/marketplace">Shop</NavLink>
            <NavLink to="/profiles/">Profile</NavLink>
            <Link to="/" onClick={handleLogOut}>
              Log Out
            </Link>
            <span>
              <img
                src={avatarSrc}
                className="avatar"
                alt="User Avatar"
                style={{ marginRight: "42px" }}
              />
            </span>
   
          </>
        ) : (
          <>
            <NavLink to="/fly">Flights</NavLink>
            <NavLink to="/allposts">Posts</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/marketplace">Shop</NavLink>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            <span>
              <img
                src="https://i.ibb.co/bgQM3cM2/Vector.png"
                alt="Guest Icon"
                style={{ marginRight: "42px" }}
              />
            </span>
           
          </>
        )}
      </nav>

      {/* Mobile Nav */}
      <NavBarMobile user={user} setUser={setUser} profile={profile} />
    </>
  );
}
