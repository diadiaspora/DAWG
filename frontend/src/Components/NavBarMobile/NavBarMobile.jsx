import { NavLink, Link } from "react-router";
import { logOut } from "../../services/authService";
import "./NavBarMobile.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";


export default function NavBarMobile({ user, setUser, profile }) {
  // const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
  }
  console.log({ profile });
  const avatarSrc = profile?.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png";

  return (
    <>
      <nav className="NavBarMobile">
        <div style={{ marginLeft: "16px", marginTop: "16px"}}>
          <GiHamburgerMenu style={{ fontSize: "28px" }} />
        </div>
        <NavLink to="/">
          <img
            src="/dawgmoney.png"
            className="dogmula"
            alt="dog logo with money eyes"
            style={{ width: "40px", marginLeft: "16px", marginTop: "16px" }}
          ></img>
          <img
            src="/dawg.png"
            className="doglo"
            alt="dawg logo letters"
            style={{ width: "60px" }}
          ></img>
        </NavLink>
      </nav>
    </>
  );
}
