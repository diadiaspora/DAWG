import * as hootService from "../../services/hootService";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ use react-router-dom, not just 'react'

// src/components/HootList/HootList.jsx

export default function HootList(props) {
  return (
    <>
      <h2>Hoots List</h2>
      <main style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {props.hoots.map((hoot) => (
          <div
            key={hoot._id}
            style={{
              borderStyle: "solid",
              borderColor: "black",
              height: "300px",
              width: "250px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <header>
              <h2>{hoot.title}</h2>
              <p>
                {`${hoot.author} posted on ${new Date(
                  hoot.createdAt
                ).toLocaleDateString()}`}
              </p>
            </header>
            <p>{hoot.text}</p>

            {/* ✅ Only the button is a link */}
            <Link to={`/hoots/${hoot._id}`}>
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
              </button>
            </Link>
          </div>
        ))}
      </main>
    </>
  );
}
