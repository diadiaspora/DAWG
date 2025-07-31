import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import * as hootService from "../../services/hootService";
import CommentForm from "../CommentForm/CommentForm";
import FlightCalendar from "../FlightCalendar/FlightCalendar";

export default function HootFeature(props) {
  const [featuredHoot, setFeaturedHoot] = useState(null);
  const navigate = useNavigate();

  // Fetch one random hoot and load full detail (comments, likes, etc.)
  useEffect(() => {
    async function fetchFeatured() {
      if (props.hoots && props.hoots.length > 0) {
        const randomIndex = Math.floor(Math.random() * props.hoots.length);
        const randomHoot = props.hoots[randomIndex];
        try {
          const detailedHoot = await hootService.show(randomHoot._id);
          setFeaturedHoot(detailedHoot);
        } catch (err) {
          console.error("Failed to fetch full hoot details", err);
        }
      }
    }
    fetchFeatured();
  }, [props.hoots]);

  if (!featuredHoot) return null;

    return (
      <div>
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
          <h4 style={{ color: "white" }}>Featured Posts</h4>
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "42px",
            marginLeft: "42px",
            marginRight: "42px",
          }}
        >
          <div style={{ width: "662px" }}>
            <div
              key={featuredHoot._id}
              style={{
                border: "1px solid #BCC7D4",
                borderRadius: "7px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Author & Date */}
              <header
                style={{
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    featuredHoot.author?.avatar ||
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
                  <strong>
                    {featuredHoot.author?.username || "Anonymous"}
                  </strong>
                </p>
                <div style={{ marginLeft: "auto" }}>
                  <p style={{ fontSize: "12px" }}>
                    {new Date(featuredHoot.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </header>

              {/* Title & Text */}
              <Link
                to={`/hoots/${featuredHoot._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    border: "1px solid #E9E9E9",
                    borderRadius: "7px",
                    padding: "12px",
                    height: featuredHoot.gifUrl ? "126px" : "276px",
                    marginTop: "-10px",
                  }}
                >
                  <h2 style={{ fontSize: "18px", margin: "0" }}>
                    {featuredHoot.title}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      lineHeight: "1.5em",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: featuredHoot.gifUrl ? 3 : 10,
                      maxHeight: featuredHoot.gifUrl ? "4.5em" : "15em",
                    }}
                  >
                    {featuredHoot.text}
                  </p>
                </div>
              </Link>

              {/* GIF */}
              {featuredHoot.gifUrl && (
                <img
                  src={featuredHoot.gifUrl}
                  alt="GIF"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginTop: "8px",
                  }}
                />
              )}

              {/* Likes and Comments Row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "12px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {props.user && featuredHoot.likes.includes(props.user._id) ? (
                    <FaHeart
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={async () => {
                        const updated = await hootService.unlikeHoot(
                          featuredHoot._id
                        );
                        props.setHoots((prev) =>
                          prev.map((h) => (h._id === updated._id ? updated : h))
                        );
                        setFeaturedHoot(updated);
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
                        const updated = await hootService.likeHoot(
                          featuredHoot._id
                        );
                        props.setHoots((prev) =>
                          prev.map((h) => (h._id === updated._id ? updated : h))
                        );
                        setFeaturedHoot(updated);
                      }}
                    />
                  )}
                  <span>{featuredHoot.likes.length}</span>
                </div>
                <div style={{ marginLeft: "12px" }}>
                  <Link to={`/hoots/${featuredHoot._id}`}>
                    <FaRegComment />
                  </Link>
                  <span style={{ marginLeft: "6px", fontSize: "12px" }}>
                    {featuredHoot.comments.length}
                  </span>
                </div>
              </div>
              <CommentForm
                handleAddComment={async (commentFormData) => {
                  const newComment = await hootService.comment(
                    featuredHoot._id,
                    commentFormData
                  );
                  setFeaturedHoot((prev) => ({
                    ...prev,
                    comments: [...prev.comments, newComment],
                  }));
                }}
              />

              {/* Comments Preview */}
              <div style={{ marginTop: "16px" }}>
                {featuredHoot.comments.length > 0 ? (
                  featuredHoot.comments.slice(0, 2).map((comment) => (
                    <article
                      key={comment._id}
                      style={{
                        border: "1px solid #E9E9E9",
                        borderRadius: "7px",
                        padding: "8px",
                        marginTop: "8px",
                      }}
                    >
                      <p style={{ fontSize: "12px", marginBottom: "4px" }}>
                        {comment.author.name} •{" "}
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                      <p style={{ fontSize: "14px", margin: 0 }}>
                        {comment.text}
                      </p>
                    </article>
                  ))
                ) : (
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#888",
                      fontStyle: "italic",
                    }}
                  >
                    No comments yet.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#1E3769",
              borderRadius: "7px",
              padding: "6px",
              width: "310px"
            }}
          >
            <h3 style={{ color: "white" }}> Find Hotel Deals</h3>
            <FlightCalendar />
          </div>
        </div>
      </div>
    );
}
