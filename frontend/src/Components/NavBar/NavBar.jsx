import { NavLink, Link } from "react-router";
import { logOut } from "../../services/authService";
import "./NavBar.css";
import { FaRegCircleUser } from "react-icons/fa6";
export default function NavBar({ user, setUser, profile }) {
  // const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
  }
  console.log({ profile });
  const avatarSrc = profile?.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png";

  return (
    <nav className="NavBar">
      <NavLink to="/">
        <img
          src="/dawgmoney.png"
          className="dogmoney"
          alt="dog logo with money eyes"
        ></img>
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
          <NavLink to={`/profiles/${profile._id}`}>Profile</NavLink>
          &nbsp; | &nbsp;
          <Link to="/" onClick={handleLogOut}>
            Log Out
          </Link>
          {/* <span>Welcome, {user.name}</span> */}
          <span>
            <img
              src={profile?.avatar || <FaRegCircleUser />}
              className="avatar"
              alt="User Avatar"
              style={{ width: "33px", borderRadius: "300px" }}
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
            {/* <img
              src={profile?.avatar || <FaRegCircleUser />}
              className="avatar"
              alt="User Avatar"
              style={{ width: "33px" }}
            /> */}
            <img
              src="https://i.ibb.co/bgQM3cM2/Vector.png"
              alt="Vector"
              border="0"
              style={{ marginRight: "42px" }}
            />
          </span>
        </>
      )}
    </nav>
  );
}
