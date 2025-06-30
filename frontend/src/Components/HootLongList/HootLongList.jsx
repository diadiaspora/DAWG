import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";

export default function HootLongList(props) {
  const [displayedHoots, setDisplayedHoots] = useState([]);

  useEffect(() => {
    if (props.hoots && props.hoots.length > 0) {
      // Limit to 10 hoots for the scrollable list
      setDisplayedHoots(props.hoots.slice(0, 10));
    }
  }, [props.hoots]);

  return (
    <div style={{ marginTop: "75px", marginRight: "42px" }}>
      <div
        style={{
          backgroundColor: "#1e37691f",
          width: "1012px",
          marginLeft: "42px",
          display: "flex",
          borderRadius: "7px",

          alignItems: "baseline",
          marginBottom: "24px",
          padding: "12px",
        }}
      >
        <div>
          <h2 style={{ marginLeft: "21px", marginRight: "620px" }}>
            Heres What Everyone Saying
          </h2>
        </div>
        <div>
          <Link to="/newhoot">
            <button
              style={{
                width: "140px",
                height: "44px",
                backgroundColor: "#1E3769",
                borderWidth: "0px",
              }}
            >
              Post
            </button>
          </Link>
        </div>
      </div>

      <div
        style={{
          marginLeft: "42px",
          marginRight: "42px", // Add right margin to match left

          maxWidth: "1041px", // Adjust based on your card width and desired visible cards
          overflowX: "hidden", // Hide overflow from this container
        }}
      >
        {/* This is the inner container that *actually scrolls* */}
        <div
          style={{
            display: "flex",
            gap: "16px",

            overflowX: "scroll",
            scrollSnapType: "x mandatory",
            paddingBottom: "20px", // Add padding for scrollbar if needed
            scrollbarWidth: "thin", // For Firefox
            scrollbarColor: "#1E3769 #f0f0f0", // For Firefox (thumb track)

            WebkitOverflowScrolling: "touch", // Improve scroll performance on iOS
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
                    <p style={{ fontSize: "12px"}}>
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
                      flexGrow: 1, // ✅ takes remaining space
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
                    height: "150px",
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
                <div style={{marginLeft: "12px"}}> 
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
