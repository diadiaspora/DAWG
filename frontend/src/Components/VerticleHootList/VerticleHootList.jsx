import { useState, useEffect } from "react";
import { Link } from "react-router";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

import * as hootService from "../../services/hootService";


export default function VerticalHootList(props) {
  const [displayedHoots, setDisplayedHoots] = useState([]);

  useEffect(() => {
    if (props.hoots && props.hoots.length > 0) {
      // Shuffle the array
      const shuffled = [...props.hoots].sort(() => 0.5 - Math.random());
      // Take the first 3
      const selected = shuffled.slice(0, 3);
      setDisplayedHoots(selected);
    }
  }, [props.hoots]);
  

  return (
    <div>
      <div
        style={{
          backgroundColor: "#1E3769",
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
        <h2
          style={{ marginLeft: "21px", color: "#ffffff", paddingTop: "22px" }}
        >
          Here's What Everyone's Saying
        </h2>
      </div>

      <div
        style={{
          marginLeft: "42px",
          marginRight: "42px",
          maxWidth: "310px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginBottom: "0px",
          paddingBottom: "0px",
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
              marginBottom: "0px",
              paddingBottom: "0px",
              display: "flex",
              width: "310px",
              height: "186px",
              flexDirection: "column",
              backgroundColor: "#fff",
            }}
          >
            <div>
              <header style={{ marginBottom: "-10px", backgroundColor: "#F2F4F7", borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }}>
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
                      marginLeft: "12px",
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
                      marginRight: "12px",
                    }}
                  >
                    {new Date(hoot.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </header>

              <div>
                <div style={{ display: "flex", width: "100%", marginTop:"0px" }}>
                  <div style={{}}>
                    {hoot.gifUrl && (
                      <img
                        src={hoot.gifUrl}
                        alt="GIF"
                        style={{
                          width: "60px",
                          height: "100%",
                          objectFit: "cover",
                          borderTopLeftRadius: "0px",
                          borderBottomLeftRadius: "7px",
                          marginTop: "8px",
                          marginBottom: "0px",
                          paddingBottom: "0px",
                        }}
                      />
                    )}
                  </div>
                  <Link
                    to={`/hoots/${hoot._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div
                      style={{
                        border: "1px solid #E9E9E9",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "7px",
                        padding: "12px",
                        marginTop: "8px",
                        width: "100%",
                        height: "100%",
                        marginBottom: "0px",
                        paddingBottom: "0px",
                      }}
                    >
                      <h2 style={{ fontSize: "16px", margin: "0" }}>
                        {hoot.title}
                      </h2>
                      <p
                        style={{
                          marginTop: "8px",
                          lineHeight: "1.5em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3, // show up to 3 lines
                          fontSize: "14px",
                          maxHeight: "4.5em", // 1.5em x 3 lines
                        }}
                      >
                        {hoot.text}
                      </p>
                    </div>
                  </Link>
                </div>

                {/* <div
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
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
