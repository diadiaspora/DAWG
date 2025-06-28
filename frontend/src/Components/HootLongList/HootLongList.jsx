import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";




export default function ScrollableHoots(props) {
  const [displayedHoots, setDisplayedHoots] = useState([]);

  useEffect(() => {
    if (props.hoots && props.hoots.length > 0) {
      // Limit to 10 hoots for the scrollable list
      setDisplayedHoots(props.hoots.slice(0, 10));
    }
  }, [props.hoots]);

  return (
    <div style={{ marginTop: "75px" }}>
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
        </div>
      </div>

      <div
        style={{
          marginLeft: "42px",
          marginRight: "42px", // Add right margin to match left
          // This is the key: set a max-width based on how many cards you want to show
          // (331px card width + 16px gap) * 3 cards = (347px * 3) = 1041px
          maxWidth: "1041px", // Adjust based on your card width and desired visible cards
          overflowX: "hidden", // Hide overflow from this container
        }}
      >
        {/* This is the inner container that *actually scrolls* */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            // This container will be wider than its parent, forcing a scrollbar
            // We don't set a specific width here; it will naturally expand with its children
            // The `overflowX: "scroll"` is moved here
            overflowX: "scroll",
            scrollSnapType: "x mandatory", // Optional: Snaps to card boundaries
            paddingBottom: "20px", // Add padding for scrollbar if needed
            scrollbarWidth: "thin", // For Firefox
            scrollbarColor: "#1E3769 #f0f0f0", // For Firefox (thumb track)
            // Webkit scrollbar styles for Chrome/Safari
            WebkitOverflowScrolling: "touch", // Improve scroll performance on iOS
          }}
        >
          {displayedHoots.map((hoot) => (
            <div
              key={hoot._id}
              style={{
                flexShrink: 0, // Prevent cards from shrinking
                borderStyle: "solid",
                borderColor: "#BCC7D4",
                borderWidth: "1px",
                borderRadius: "7px",
                height: "auto",
                width: "331px", // Fixed width for each card
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                scrollSnapAlign: "start",
              }}
            >
              <header>
                <h2>{hoot.title}</h2>
                {/* <p>
                  {`${hoot.author} posted on ${new Date(
                    hoot.createdAt
                  ).toLocaleDateString()}`}
                </p> */}
              </header>
              <p>{hoot.text}</p>

              {hoot.gifUrl && (
                <img
                  src={hoot.gifUrl}
                  alt="GIF"
                  style={{
                    marginTop: "12px",
                    width: "300px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    boxShadow: "0 0 6px rgba(0,0,0,0.15)",
                  }}
                />
              )}
              <div>
                <Link to={`/hoots/${hoot._id}`}>
                  <button
                    style={{ width: "100px", backgroundColor: "#1E3769", borderWidth: "0px", height: "44px" }}
                  >
                    <FaRegComment /> 124
                  </button>
                </Link>
                <button>
                  <FaRegHeart />
                </button>
              </div>
              {/* 
              <button
                style={{
                  marginTop: "auto",
                  backgroundColor: "#1E3769",
                  color: "white",
                  borderRadius: "6px",
                  border: "none",
                  padding: "8px",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                View Details
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
