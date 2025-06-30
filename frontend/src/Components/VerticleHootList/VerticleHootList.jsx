import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

import * as hootService from "../../services/hootService";


export default function VerticalHootList(props) {
  const [displayedHoots, setDisplayedHoots] = useState([]);

  useEffect(() => {
    if (props.hoots && props.hoots.length > 0) {
      setDisplayedHoots(props.hoots.slice(0, 10));
    }
  }, [props.hoots]);

  return (
    <div >
      <div
        style={{
          backgroundColor: "#1e37691f",
          width: "100%",
          maxWidth: "1012px",
          marginLeft: "42px",
          borderRadius: "7px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ marginLeft: "21px" }}>Here's What Everyone's Saying</h2>
      </div>

      <div
        style={{
          marginLeft: "42px",
          marginRight: "42px",
          maxWidth: "310px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
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
              padding: "16px",
              display: "flex",
              width: "310px",
              flexDirection: "column",
              backgroundColor: "#fff",
            }}
          >
            <div>
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
                  <p
                    style={{
                      fontSize: "12px",
                      marginLeft: "auto",
                      color: "#666",
                    }}
                  >
                    {new Date(hoot.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </header>

              <div style={{ display: "flex" }}>
                <div>
                  <Link to={`/hoots/${hoot._id}`} className="hoot-card-link">
                    <div
                      style={{
                        border: "1px solid #E9E9E9",
                        borderRadius: "7px",
                        padding: "12px",
                        marginTop: "8px",
                        width: "210px",
                      }}
                    >
                      <h2 style={{ fontSize: "16px", margin: "0" }}>
                        {hoot.title}
                      </h2>
                      <p
                        style={{
                          marginTop: "8px",
                          lineHeight: "1.5em",
                          maxHeight: "2.5em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          fontSize: "14px",
                        }}
                      >
                        {hoot.text}
                      </p>
                    </div>
                  </Link>
                </div>
                <div style={{marginLeft: "6px"}}>
                  {hoot.gifUrl && (
                    <img
                      src={hoot.gifUrl}
                      alt="GIF"
                      style={{
                        width: "60px",

                        objectFit: "cover",
                        borderRadius: "6px",
                        marginTop: "12px",
                      }}
                    />
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "12px",
                      gap: "12px",
                    }}
                  >
                    <FaRegHeart />
                    <Link to={`/hoots/${hoot._id}`}>
                      <FaRegComment />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
