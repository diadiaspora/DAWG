import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { logOut } from "../../services/authService";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import "./NavBarMobile.css";
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavBarMobile({ user, setUser, profile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const avatarSrc = profile?.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png";

  function handleLogOut() {
    logOut();
    setUser(null);
  }

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
          style={{
            marginLeft: "16px",
            marginTop: "16px",
            cursor: "pointer",
            width: "33%",
          }}
        >
          <GiHamburgerMenu style={{ fontSize: "28px", color: "#1E3769" }} />
        </div>
        <div style={{ width: "20%" }}>
          <NavLink to="/">
            <img
              src="/dawg.png"
              className="doglo"
              alt="dawg logo letters"
              style={{ width: "80px" }}
            />
          </NavLink>
        </div>
        <div className="nav-icons" style={{ width: "33%" }}>
          <NavLink
            to="/marketplace"
            onClick={() => setMenuOpen(false)}
            style={{ width: "33%" }}
          >
            <IoStorefrontSharp
              style={{
                width: "100%",
                fontSize: "28px",
                color: "#1E3769",
                padding: "0px",
                marginLeft: "10px",
              }}
            />
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setMenuOpen(false)}
            style={{ width: "33%" }}
          >
            <PiShoppingCartSimpleFill
              style={{
                width: "100%",
                fontSize: "28px",
                color: "#1E3769",
                marginLeft: "0px",
              }}
            />
          </NavLink>

          <NavLink
            to="/login"
            onClick={() => setMenuOpen(false)}
            style={{ width: "33%" }}
          >
            <FaRegUserCircle
              style={{
                width: "100%",
                fontSize: "28px",
                color: "#1E3769",
                margin: "0px",
              }}
            />
          </NavLink>
        </div>
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
              <NavLink to="/allposts" onClick={() => setMenuOpen(false)}>
                Posts
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
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/fly" onClick={() => setMenuOpen(false)}>
                Flights
              </NavLink>
              <NavLink to="/marketplace" onClick={() => setMenuOpen(false)}>
                Marketplace
              </NavLink>
              <NavLink to="/allposts" onClick={() => setMenuOpen(false)}>
                Posts
              </NavLink>
            </>
          )}
        </div>
      )}
    </>
  );
}
