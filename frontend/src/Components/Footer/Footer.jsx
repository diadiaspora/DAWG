import "./Footer.css";
import { Link } from "react-router-dom";
import NewsLetter from "../../Components/NewsLetter/NewsLetter.jsx";

export default function Footer() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#1E3769",
          marginTop: "42px",
          color: "#ffffff",
          display: "flex",
        }}
      >
        <div style={{ width: "632px", marginLeft: "42px" }}>
          <h3>If you have traveled with your pet please share info</h3>
          <ul>
            <li>
              Have you had an experience with an Airline? Did you find the
              perfect veterinarian while abroad?
            </li>
            <li>
              
              Do you find out important info about documentation needed to
              travel to a specific country?
            </li>
            <li>
           Did you have a unique experience with an Airline?
            </li>
          </ul>
          <strong>
             We are a community and we want everyone to
            know everything about traveling safely and easily with their pet. </strong>
          
          <p> Contact Us: dia.diaspora@gmail.com</p>
          <div>Subscribe for Updates about our mobile App!</div>
        </div>

        <div style={{ width: "310px" }}>
          <NewsLetter />
        </div>
      </div>
      <div style={{ backgroundColor: "#4AA692" }}>
        {" "}
        Also, Everyone has there own unique experience. Heres a link to share
        yours
        <Link> BIPOC </Link>
      </div>
    </>
  );
}
