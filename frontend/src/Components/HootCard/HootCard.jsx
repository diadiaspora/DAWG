import React from "react";
import { useNavigate } from "react-router-dom";

export default function HootCard({ hoot, user }) {
  const navigate = useNavigate();

  // Truncate text to ~150 chars
  const previewText =
    hoot.text.length > 150 ? hoot.text.slice(0, 150) + "…" : hoot.text;

  return (
    <div
      onClick={() => navigate(`/hoots/${hoot._id}`)}
      style={{
        border: "1px solid #E9E9E9",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "16px",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <img
          src={hoot.author?.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png"}
          alt="Avatar"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
          {hoot.author?.username || "Anonymous"}
        </p>
      </div>
      <h3 style={{ margin: "0 0 8px 0" }}>{hoot.title}</h3>
      {hoot.gifUrl && (
        <img
          src={hoot.gifUrl}
          alt="Hoot GIF"
          style={{
            width: "100%",
            maxHeight: "150px",
            objectFit: "cover",
            borderRadius: "6px",
            marginBottom: "8px",
          }}
        />
      )}
      <p style={{ margin: 0, color: "#555" }}>{previewText}</p>
      {/* Optional footer with likes/comments could go here */}
    </div>
  );
}
