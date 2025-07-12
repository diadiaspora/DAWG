import "./Footer.css";
import { Link } from "react-router-dom";
import NewsLetter from "../../Components/NewsLetter/NewsLetter.jsx";

export default function Footer() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#DFE2E7",
          marginTop: "42px",
          color: "#1E3769",
          display: "flex",
        
        }}
      >
        <div
          style={{
            width: "662px",
            marginLeft: "42px",
            marginTop: "42px",
            marginBottom: "42px",
            marginRight: "42px"
          }}
        >
          <h3 style={{ fontSize: "15px" }}>
            If you have traveled with your pet please share info
          </h3>
          <ul>
            <li style={{ fontSize: "13px" }}>
              Have you had an experience with an Airline? Did you find the
              perfect veterinarian while abroad?
            </li>
            <li style={{ fontSize: "13px" }}>
              Do you find out important info about documentation needed to
              travel to a specific country?
            </li>
            <li style={{ fontSize: "13px" }}>
              Did you have a unique experience with an Airline?
            </li>
          </ul>
          <strong style={{ fontSize: "15px" }}>
            <p> We are a community.</p>
            <p>
              We want everyone to know everything about traveling safely and
              easily with their pet.
            </p>
          </strong>

          <p style={{ fontSize: "15px" }}>
            <strong> Contact Us:</strong> dia.diaspora@gmail.com
          </p>
          <div style={{ fontSize: "15px" }}>
            Subscribe for Updates about our mobile App!
          </div>
        </div>

        <div style={{ width: "310px", marginBottom: "42px" }}>
          <NewsLetter />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#1E3769",
          height: "54px",
          padding: "12px",
          color: "#ffffff",
        }}
      >
        <strong>
          Also, Everyone has there own unique experience. Heres a link to share
          yours
          <Link style={{ color: "#4AA692" }}>
            BIPOC|LGBTQ 
          </Link>
        </strong>
      </div>
    </>
  );
}
