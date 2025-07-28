import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router";
import { logOut } from "../../services/authService";
import "./NavBarMobile.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavBarMobile({ user, setUser, profile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const avatarSrc = profile?.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png";

  function handleLogOut() {
    logOut();
    setUser(null);
  }

  // Handle clicks outside the menu to close it
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="NavBarMobile" style={{ backgroundColor: "#1e37691f" }}>
        <div
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{ marginLeft: "16px", marginTop: "16px", cursor: "pointer" }}
        >
          <GiHamburgerMenu style={{ fontSize: "28px", color: "#1E3769" }} />
        </div>

        <NavLink to="/">
          <img
            src="/dawgmoney.png"
            className="dogmula"
            alt="dog logo with money eyes"
            style={{ width: "40px", marginLeft: "16px", marginTop: "16px" }}
          />
          <img
            src="/dawg.png"
            className="doglo"
            alt="dawg logo letters"
            style={{ width: "60px" }}
          />
        </NavLink>
      </nav>

      {menuOpen && (
        <div ref={menuRef} className="mobile-dropdown-menu">
          {user ? (
            <>
              <NavLink to="/fly" onClick={() => setMenuOpen(false)}>
                Flights
              </NavLink>
              <NavLink to="/plans" onClick={() => setMenuOpen(false)}>
                Plan
              </NavLink>
              <NavLink to="/write" onClick={() => setMenuOpen(false)}>
                Write
              </NavLink>
              <NavLink to="/marketplace" onClick={() => setMenuOpen(false)}>
                Shop
              </NavLink>
              <NavLink to="/profiles/" onClick={() => setMenuOpen(false)}>
                Profile
              </NavLink>
              <Link
                to="/"
                onClick={() => {
                  handleLogOut();
                  setMenuOpen(false);
                }}
              >
                Log Out
              </Link>
              {/* <img
                src={avatarSrc}
                className="avatar"
                alt="User Avatar"
                style={{ width: "33px", borderRadius: "300px" }}
              /> */}
            </>
          ) : (
            <>
              <NavLink to="/fly" onClick={() => setMenuOpen(false)}>
                Flights
              </NavLink>
              <NavLink to="/posts" onClick={() => setMenuOpen(false)}>
                Posts
              </NavLink>
              <NavLink to="/blogs" onClick={() => setMenuOpen(false)}>
                Blogs
              </NavLink>
              <NavLink to="/marketplace" onClick={() => setMenuOpen(false)}>
                Shop
              </NavLink>
              <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                Log In
              </NavLink>
              <NavLink to="/signup" onClick={() => setMenuOpen(false)}>
                Sign Up
              </NavLink>
              {/* <img
                src="https://i.ibb.co/bgQM3cM2/Vector.png"
                alt="Vector"
                style={{ marginRight: "42px" }}
              /> */}
            </>
          )}
        </div>
      )}
    </>
  );
}
