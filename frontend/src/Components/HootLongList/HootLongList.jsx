import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart} from "react-icons/fa6"; // Correct import for filled heart
import "./HootLongList.css";
import * as hootService from "../../services/hootService";

export default function HootLongList(props) {
  const [displayedHoots, setDisplayedHoots] = useState([]);
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  const hootlong = (
    <div className="hoot-long-header">
      <h1>Heres What Everyone Saying</h1>
      <Link to="/marketplace">
        <button
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderWidth: "1px",
            backgroundColor: hover ? "#4AA692" : "#ffffff",
            width: "240px",
            height: "44px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
            fontFamily: "Roboto",
            borderColor: hover ? "#4AA692" : "#1E3769",
            color: hover ? "#1E3769" : "#1E3769",
            borderRadius: "7px",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          View Posts
        </button>
      </Link>
    </div>
  );

  return (
    <div className="hootmargin" style={{ marginRight: "42px" }}>
  
       {hootlong}
     
  

      <div className="visible">
        <div className="hoot-scroll-container">
          {displayedHoots.map((hoot) => (
            <div
              key={hoot._id}
              style={{
                borderStyle: "solid",
                borderColor: "#BCC7D4",
                borderWidth: "1px",
                borderRadius: "7px",
                height: "380px",
                width: "331px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginRight: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <header style={{ marginBottom: "8px", width: "250px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between", 
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div>
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
                    </div>
                    <div>
                      <strong>{hoot.author?.username || "Anonymous"}</strong>
                    </div>
                  </div>
                  <div
                    style={{ fontSize: "12px", display: "flex", gap: "2px" }}
                   >
                    <div
                      style={{ fontSize: "12px", display: "flex", gap: "2px" }}
                    >
                      <p style={{ margin: 0 }}>
                        {new Date(hoot.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </p>
                      <p style={{ margin: 0 }}>
                        {new Date(hoot.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
             
                </div>
              </header>
              <Link to={`/hoots/${hoot._id}`} className="hoot-card-link">
                {/* <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    borderStyle: "solid",
                    borderWidth: isHovered ? "2px" : "1px",
                    borderColor: isHovered ? "#4AA692" : "#E9E9E9",
                    borderRadius: "7px",
                    padding: "12px",
                    height: hoot.gifUrl ? "126px" : "auto",
                    marginTop: "-10px",
                    boxShadow: isHovered
                      ? "0 1px 5px rgba(0, 0, 0, 0.1)"
                      : "none",
                    transition: "all 0.2s ease",
                  }}
                > */}
                <div className="hoot-card-text">
                  <h2>{hoot.title}</h2>
                  <p>{hoot.text}</p>
                </div>
                {/* </div> */}
              </Link>

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
                <span style={{ marginLeft: "4px" }}>
                  {hoot.comments.length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
