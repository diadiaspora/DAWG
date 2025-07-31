import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import * as hootService from "../../services/hootService";
import CommentForm from "../CommentForm/CommentForm";
import FlightCalendar from "../FlightCalendar/FlightCalendar";

export default function HootFeed({ user }) {
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHoots() {
      try {
        const hootData = await hootService.getAllHoots();
        setHoots(hootData);
      } catch (error) {
        console.error("Failed to fetch hoots:", error);
      }
    }
    fetchHoots();
  }, []);

  return (
    <div
      style={{
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        display: "flex",
        flexDirection: "row",
        paddingBottom: "1rem",
        paddingLeft: "0.5rem",
        paddingRight: "1rem",
      }}
    >
      {hoots.map((hoot) => (
        <div
          key={hoot._id}
          style={{
            flex: "0 0 auto", // ✅ required for horizontal scrolling
            minWidth: "331px",
            width: "331px",
            borderStyle: "solid",
            borderColor: "#BCC7D4",
            borderWidth: "1px",
            borderRadius: "7px",
            height: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginRight: "8px",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <h3 style={{ fontWeight: "600" }}>{hoot.title}</h3>
            <p>{hoot.content}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {hoot.likes?.includes(user?._id) ? (
              <FaHeart color="red" />
            ) : (
              <IoMdHeartEmpty />
            )}
            <span>{hoot.likes?.length || 0}</span>

            <FaRegComment style={{ marginLeft: "auto" }} />
            <span>{hoot.comments?.length || 0}</span>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <CommentForm hootId={hoot._id} />
          </div>
        </div>
      ))}
    </div>
  );
}
