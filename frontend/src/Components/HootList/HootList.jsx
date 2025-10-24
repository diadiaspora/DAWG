import * as hootService from "../../services/hootService";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HootList.css";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";

export default function HootList(props) {
  const [randomHoots, setRandomHoots] = useState([]);
  const [allHoots, setAllHoots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.hoots && props.hoots.length > 0) {
      setAllHoots(props.hoots);
      randomizeHoots(props.hoots);
    }
  }, [props.hoots]);

  const randomizeHoots = (hootArray) => {
    const shuffled = [...hootArray].sort(() => 0.5 - Math.random());
    setRandomHoots(shuffled.slice(0, 3));
  };

  const handleAddHoot = async (newHootData) => {
    const createdHoot = await hootService.create(newHootData);
    console.log("New hoot created:", createdHoot);

    const updatedHoots = [createdHoot, ...allHoots];
    setAllHoots(updatedHoots);
    randomizeHoots(updatedHoots);
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{ marginTop: "75px" }}>
      <div
        style={{
          backgroundColor: "#1E3769",
          width: "1012px",
          display: "flex",
          borderRadius: "7px",
          height: "70px",
          alignItems: "baseline",
          marginBottom: "24px",
          padding: "12px",
          marginLeft: "42px",
        }}
      >
        <h2 style={{ marginLeft: "24px", color: "#ffffff", marginTop: "8px" }}>
          Latest Posts
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "16px",
          marginLeft: "42px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "16px",
            paddingBottom: "0.5rem",
            overflowX: isMobile ? "visible" : "auto",
            overflowY: "visible",
            WebkitOverflowScrolling: isMobile ? "auto" : "touch",
          }}
        >
          {randomHoots.map((hoot) => (
            <div
              key={hoot._id}
              style={{
                borderStyle: "solid",
                borderColor: "#BCC7D4",
                borderWidth: "1px",
                borderRadius: "7px",
                height: "auto",
                width: isMobile ? "90vw" : "331px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginRight: "8px",
              }}
            >
              <header style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={
                      hoot.author?.avatar ||
                      "https://i.ibb.co/5x5Td7ks/av-1.png"
                    }
                    alt="Author avatar"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <p style={{ fontSize: "16px", marginLeft: "6px" }}>
                    <strong>{hoot.author?.username || "Anonymous"}</strong>
                  </p>
                  <div style={{ marginLeft: "auto" }}>
                    <p style={{ fontSize: "12px" }}>
                      {new Date(hoot.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </header>
              <Link to={`/hoots/${hoot._id}`} className="hoot-card-link">
                <div
                  style={{
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "#E9E9E9",
                    borderRadius: "7px",
                    padding: "12px",
                    height: "126px",
                    marginTop: "-10px",
                  }}
                >
                  <div>
                    <h2 style={{ fontSize: "18px", margin: "0" }}>
                      {hoot.title}
                    </h2>
                  </div>
                  <div
                    style={{
                      flexGrow: 1,
                      marginBottom: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <p
                      style={{
                        margin: "0",
                        lineHeight: "1.5em",
                        maxHeight: "4.5em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                      }}
                    >
                      {hoot.text}
                    </p>
                  </div>
                </div>
              </Link>
              <div style={{ marginTop: "12px" }}></div>
              {hoot.gifUrl && (
                <img
                  src={hoot.gifUrl}
                  alt="GIF"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: "8px",
                  }}
                />
              )}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div>
                  <FaRegHeart />
                </div>
                <div style={{ marginLeft: "12px" }}>
                  <Link to={`/hoots/${hoot._id}`}>
                    <FaRegComment />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
