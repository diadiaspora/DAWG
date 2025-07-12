import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as hootService from "../../services/hootService";
import HootForm from "../../Components/HootForm/HootForm";
import { FaHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";


import CommentForm from "../CommentForm/CommentForm";

const HootDetails = ({ user, setUser }) => {
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    async function fetchHoot() {
      try {
        const data = await hootService.show(hootId); // assuming you have a `show` method
        setHoot(data);
      } catch (err) {
        console.error("Failed to fetch hoot", err);
      }
    }

    fetchHoot();
  }, [hootId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.comment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
    setReplyingTo(null);
  };

  if (!hoot) return <main>Loading...</main>;
    const handleAddHoot = async (newHootData) => {
      const createdHoot = await hootService.create(newHootData);
      return createdHoot;
      console.log("New hoot created:", createdHoot);
  
      const updatedHoots = [createdHoot, ...allHoots];
      setAllHoots(updatedHoots);
      randomizeHoots(updatedHoots); // Re-randomize after adding
    };
    const nestComments = (comments) => {
      const map = {};
      const roots = [];

      comments.forEach((comment) => {
        map[comment._id] = { ...comment, replies: [] };
      });

      comments.forEach((comment) => {
        if (comment.parentId) {
          map[comment.parentId]?.replies.push(map[comment._id]);
        } else {
          roots.push(map[comment._id]);
        }
      });

      return roots;
    };

    const renderComment = (comment, level = 0) => (
      <div
        key={comment._id}
        style={{ marginLeft: level * 40 + 42, marginBottom: "16px" }}
      >
        <div
          style={{
            border: "1px solid #E9E9E9",
            borderRadius: "7px",
            padding: "10px",
          }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "6px" }}>
            {comment.author?.name || "Anonymous"} on{" "}
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
          <p>{comment.text}</p>
    
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
            {/* Like / Unlike Logic */}
            {comment.likes.includes(user._id) ? (
              <FaHeart
                style={{ color: "red", cursor: "pointer" }}
                onClick={async () => {
                  await hootService.unlikeComment(hoot._id, comment._id);
                  const updated = await hootService.show(hootId);
                  setHoot(updated);
                }}
              />
            ) : (
              <IoMdHeartEmpty
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  await hootService.likeComment(hoot._id, comment._id);
                  const updated = await hootService.show(hootId);
                  setHoot(updated);
                }}
              />
            )}
            <span>{comment.likes.length}</span>
            <button
              onClick={() => setReplyingTo(comment._id)}
              style={{
                fontSize: "12px",
                background: "none",
                border: "none",
                color: "#1E3769",
                cursor: "pointer",
                padding: 0,
                marginLeft: "12px",
              }}
            >
              Reply
            </button>
          </div>
        </div>
    
        {replyingTo === comment._id && (
          <CommentForm
            handleAddComment={handleAddComment}
            parentId={comment._id}
            onCancel={() => setReplyingTo(null)}
          />
        )}
    
        {/* Recursive rendering for replies */}
        {comment.replies &&
          comment.replies.map((reply) => renderComment(reply, level + 1))}
      </div>
    );

    const threadedComments = nestComments(hoot.comments);
    
  return (
    <main style={{ display: "flex", width: "1012px", marginTop: "100px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <section style={{ width: "662px", marginLeft: "42px" }}>
          <header>
            {/* <p>{hoot.category.toUpperCase()}</p> */}
            <div style={{ display: "flex" }}>
              <img
                src={
                  hoot.author?.avatar || "https://i.ibb.co/5x5Td7ks/av-1.png"
                }
                alt="Author avatar"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <p>
                <strong>{hoot.author?.username || "Anonymous"}</strong>
              </p>
            </div>
          </header>
          <div style={{ display: "flex" }}>
            <div
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#E9E9E9",
                borderRadius: "7px",
                padding: "12px",
                height: "200px", // 
                overflowY: "auto", 
              }}
            >
              <h1>{hoot.title}</h1>
              <p>{hoot.text}</p>
            </div>
            <div>
              {hoot.gifUrl && (
                <div
                  style={{
                  
                    width: "100%", // Take full width of the section
                    display: "flex",
                    justifyContent: "center", // Center the GIF horizontally
                  }}
                >
                  <img
                    src={hoot.gifUrl}
                    alt="GIF"
                    style={{
                      maxWidth: "100%", // Ensure it fits within the container
                      height: "auto", // Maintain aspect ratio
                      maxHeight: "300px", // Optional: Limit the maximum height
                      borderRadius: "8px", // Slightly larger border-radius for details page
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // A subtle shadow
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <section>
          <CommentForm handleAddComment={handleAddComment} />
          <div>
            {!hoot.comments.length && (
              <p
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#E9E9E9",
                  borderRadius: "7px",
                  marginLeft: "42px",
                }}
              >
                There are no comments.
              </p>
            )}

            {hoot.comments.map((comment) => (
              <article
                key={comment._id}
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#E9E9E9",
                  borderRadius: "7px",
                  marginLeft: "42px",
                }}
              >
                <header>
                  <p>
                    {`${comment.author.name} posted on
                  ${new Date(comment.createdAt).toLocaleDateString()}`}
                  </p>
                </header>
                <p>{comment.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <div style={{ marginLeft: "42px" }}>
        <HootForm handleAddHoot={handleAddHoot} />
      </div>
    </main>
  );
};

export default HootDetails;
