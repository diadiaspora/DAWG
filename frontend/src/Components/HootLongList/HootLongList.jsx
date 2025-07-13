import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa6"; // Correct import for filled heart
import "./HootLongList.css";
import * as hootService from "../../services/hootService";

export default function HootLongList(props) {
  const [displayedHoots, setDisplayedHoots] = useState([]);
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const handlePostClick = () => {
    if (props.user) {
      navigate("/newhoot");
    } else {
      navigate("/signup");
    }
  };

  useEffect(() => {
    if (props.hoots && props.hoots.length > 0) {
      setDisplayedHoots(props.hoots.slice(0, 10));
    }
  }, [props.hoots]);

  return (
    <div style={{ marginTop: "125px", marginRight: "42px" }}>
      <div
        style={{
          backgroundColor: "#1E3769",
          width: "1012px",
          marginLeft: "42px",
          display: "flex",
          borderRadius: "7px",
          height: "70px",
          alignItems: "baseline",
          marginBottom: "24px",
          padding: "12px",
        }}
      >
        <div>
          <h2
            style={{
              marginLeft: "21px",
              marginRight: "570px",
              color: "#ffffff",
              fontSize: "18px",
            }}
          >
            Heres What Everyone Saying
          </h2>
        </div>
        <div>
          <button
            onClick={handlePostClick}
            style={{
              width: "140px",
              height: "44px",
              backgroundColor: "#ffffff",
              borderWidth: "1px",
              color: "#1E3769",
              cursor: "pointer",
              fontSize: "16px",
              fontFamily: "Roboto",
              borderColor: hover ? "#4AA692" : "#1E3769",
              color: hover ? "#347567" : "#1E3769",
              borderRadius: "7px",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Post
          </button>
        </div>
      </div>

      <div
        style={{
          marginLeft: "42px",
          marginRight: "42px",
          maxWidth: "1041px",
          overflowX: "hidden",
        }}
      >
        <div
          className="hoot-scroll-container"
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "scroll",
          }}
        >
          {displayedHoots.map((hoot) => (
            <div
              key={hoot._id}
              style={{
                borderStyle: "solid",
                borderColor: "#BCC7D4",
                borderWidth: "1px",
                borderRadius: "7px",
                height: "auto",
                width: "331px",
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
                  <p
                    style={{
                      fontSize: "16px",
                      marginLeft: "6px",
                    }}
                  >
                    <strong>{hoot.author?.username || "Anonymous"}</strong>
                  </p>
                  <div style={{ marginLeft: "190px" }}>
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
                    height: hoot.gifUrl ? "126px" : "276px",
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
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: hoot.gifUrl ? 3 : 10,
                        maxHeight: hoot.gifUrl ? "4.5em" : "15em",
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
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: "8px",
                  }}
                />
              )}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {/* Corrected conditional logic for heart icon */}
                  {props.user && hoot.likes.includes(props.user._id) ? (
                    <FaHeart
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={async () => {
                        const updated = await hootService.unlikeHoot(hoot._id);
                        props.setHoots((prev) =>
                          prev.map((h) => (h._id === updated._id ? updated : h))
                        );
                      }}
                    />
                  ) : (
                    <IoMdHeartEmpty
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        if (!props.user) {
                          navigate("/login");
                          return;
                        }
                        const updated = await hootService.likeHoot(hoot._id);
                        props.setHoots((prev) =>
                          prev.map((h) => (h._id === updated._id ? updated : h))
                        );
                      }}
                    />
                  )}
                  <span>{hoot.likes.length}</span>
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
