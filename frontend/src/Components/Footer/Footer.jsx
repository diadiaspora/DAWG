import "./Footer.css";
import { Link } from "react-router-dom";
import NewsLetter from "../../Components/NewsLetter/NewsLetter.jsx";
import Translate from "../Translate/Translate";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const klookRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // breakpoint: 768px
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile && klookRef.current) {
      klookRef.current.innerHTML = `
        <ins class="klk-aff-widget"
          data-wid="93395"
          data-bgtype="Play"
          data-adid="1085867"
          data-lang="en"
          data-prod="banner"
          data-width="468"
          data-height="60">
          <a href="//www.klook.com/?aid=">Klook.com</a>
        </ins>
      `;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://affiliate.klook.com/widget/fetch-iframe-init.js";
      klookRef.current.appendChild(script);
    }
  }, [isMobile]);

  return (
    <>
      <div
        className="footer-container"
        style={{
          backgroundColor: "#DFE2E7",
          marginTop: "42px",
          color: "#1E3769",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "662px",
            margin: "42px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              <Translate />
            </div>
            <div>
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
            </div>
          </div>
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
          {!isMobile && (
            <>
              <div style={{ fontSize: "15px" }}>
                Subscribe for Updates about our mobile App!
              </div>
              <div style={{ marginTop: "16px" }}>
                <div
                  ref={klookRef}
                  style={{
                    borderRadius: "7px",
                    overflow: "hidden",
                    width: "468px",
                    height: "60px",
                  }}
                />
              </div>
            </>
          )}
        </div>

        {!isMobile && (
          <div style={{ width: "310px", marginBottom: "42px" }}>
            <NewsLetter />
          </div>
        )}
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
          <Link style={{ color: "#4AA692" }}>BIPOC|LGBTQ</Link>
        </strong>
      </div>
    </>
  );
}
