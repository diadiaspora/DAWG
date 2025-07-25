import { NavLink, Link } from "react-router";
import { useState } from "react";
import { logOut } from "../../services/authService";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";
import { FaRegCircleUser } from "react-icons/fa6";

export default function NavBar({ user, setUser, profile }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogOut() {
    logOut();
    setUser(null);
  }

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const avatarSrc = profile?.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png";

  return (
    <nav className="NavBar">
      <div className="logo-and-toggle">
        <NavLink to="/" onClick={closeMenu}>
          <img src="/dawgmoney.png" className="dogmoney" alt="dog logo" />
          <img src="/dawg.png" className="doglogo" alt="dawg logo" />
        </NavLink>
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        {user ? (
          <>
            <NavLink to="/fly" onClick={closeMenu}>
              Flights
            </NavLink>
            <NavLink to="/plans" onClick={closeMenu}>
              Plan
            </NavLink>
            <NavLink to="/write" onClick={closeMenu}>
              Write
            </NavLink>
            <NavLink to="/marketplace" onClick={closeMenu}>
              Shop
            </NavLink>
            <NavLink to="/profiles/" onClick={closeMenu}>
              Profile
            </NavLink>
            <Link
              to="/"
              onClick={() => {
                handleLogOut();
                closeMenu();
              }}
            >
              Log Out
            </Link>
            <img
              src={avatarSrc}
              className="avatar"
              alt="User Avatar"
              style={{ width: "33px", borderRadius: "300px" }}
            />
          </>
        ) : (
          <>
            <NavLink to="/fly" onClick={closeMenu}>
              Flights
            </NavLink>
            <NavLink to="/posts" onClick={closeMenu}>
              Posts
            </NavLink>
            <NavLink to="/blogs" onClick={closeMenu}>
              Blogs
            </NavLink>
            <NavLink to="/marketplace" onClick={closeMenu}>
              Shop
            </NavLink>
            <NavLink to="/login" onClick={closeMenu}>
              Log In
            </NavLink>
            <NavLink to="/signup" onClick={closeMenu}>
              Sign Up
            </NavLink>
            <img
              src="https://i.ibb.co/bgQM3cM2/Vector.png"
              alt="Vector"
              className="avatar"
            />
          </>
        )}
      </div>
    </nav>
  );
}
