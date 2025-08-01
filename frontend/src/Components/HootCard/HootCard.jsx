import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import "./HootCard.css";

import * as hootService from "../../services/hootService";
import CommentForm from "../CommentForm/CommentForm";
import CommentThread from "../CommentThread/CommentThread";
import CommentTree from "../CommentTree/CommentTree";

export default function HootCard({ hoot, user, setUser }) {
  const navigate = useNavigate();
  const [localHoot, setLocalHoot] = useState(hoot);

  const handleAddComment = async (commentFormData) => {
    try {
      const newComment = await hootService.comment(
        localHoot._id,
        commentFormData
      );
      const updated = await hootService.show(localHoot._id);
      setLocalHoot(updated);
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation(); // prevent navigation
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      let updated;
      if (localHoot.likes.includes(user._id)) {
        updated = await hootService.unlikeHoot(localHoot._id);
      } else {
        updated = await hootService.likeHoot(localHoot._id);
      }
      setLocalHoot(updated);
    } catch (err) {
      console.error("Like/unlike failed", err);
    }
  };

  const handleCommentClick = (e) => {
    e.stopPropagation(); // prevent card navigation
    navigate(`/hoots/${localHoot._id}`);
  };

  const nestedComments = localHoot?.comments
    ? CommentTree(localHoot.comments)
    : [];

  const previewText =
    localHoot.text.length > 150
      ? localHoot.text.slice(0, 150) + "…"
      : localHoot.text;

  return (
    <div
      onClick={() => navigate(`/hoots/${localHoot._id}`)}
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
      {/* Author + Date */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <img
          src={localHoot.author?.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png"}
          alt="Avatar"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
          {localHoot.author?.username || "Anonymous"}
        </p>
        <div style={{ marginLeft: "auto", fontSize: "12px", color: "#999" }}>
          {new Date(localHoot.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Title + Text + GIF */}
      <h3 style={{ margin: "0 0 8px 0" }}>{localHoot.title}</h3>
      {localHoot.gifUrl && (
        <img
          src={localHoot.gifUrl}
          alt="Hoot GIF"
          style={{
            width: "100%",
            maxHeight: "100%",
            objectFit: "cover",
            borderRadius: "6px",
            marginBottom: "8px",
          }}
        />
      )}
      <p style={{ margin: 0, color: "#555" }}>{previewText}</p>

      {/* Likes + Comments */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {user && localHoot.likes.includes(user._id) ? (
            <FaHeart
              style={{ color: "red", cursor: "pointer" }}
              onClick={handleLikeClick}
            />
          ) : (
            <IoMdHeartEmpty
              style={{ cursor: "pointer" }}
              onClick={handleLikeClick}
            />
          )}
          <span>{localHoot.likes.length}</span>
        </div>
        <div
          style={{ marginLeft: "12px", display: "flex", alignItems: "center" }}
        >
          <FaRegComment
            style={{ cursor: "pointer" }}
            onClick={handleCommentClick}
          />
          <span style={{ marginLeft: "6px", fontSize: "12px" }}>
            {localHoot.comments.length}
          </span>
        </div>
      </div>

      {/* Comment Form */}
      <CommentForm handleAddComment={handleAddComment} parentId={null} />

      {/* Comments */}
      <div>
        {!localHoot.comments?.length && (
          <p
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#E9E9E9",
              borderRadius: "7px",
              marginLeft: "42px",
              padding: "8px",
              marginTop: "8px",
            }}
          >
            There are no comments.
          </p>
        )}
        {nestedComments.map((comment) => (
          <CommentThread
            key={comment._id}
            comment={comment}
            handleAddComment={handleAddComment}
          />
        ))}
      </div>
    </div>
  );
}
