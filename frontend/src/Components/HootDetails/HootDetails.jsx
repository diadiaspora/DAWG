// ✅ REMOVE this:
// import { useParams } from "react-router";

import { useEffect, useState } from "react";
import * as hootService from "../../services/hootService";
import HootForm from "../../Components/HootForm/HootForm";
import CommentForm from "../CommentForm/CommentForm";

const HootDetails = ({ hootId, user, setUser }) => {
  const [hoot, setHoot] = useState(null);

  useEffect(() => {
    async function fetchHoot() {
      try {
        const data = await hootService.show(hootId);
        setHoot(data);
      } catch (err) {
        console.error("Failed to fetch hoot", err);
      }
    }

    if (hootId) fetchHoot();
  }, [hootId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.comment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };

  if (!hoot) return <main>Loading...</main>;

  const handleAddHoot = async (newHootData) => {
    const createdHoot = await hootService.create(newHootData);
    console.log("New hoot created:", createdHoot);
    // This may not be needed here unless this is a new-hoots+details combo
  };

  return (
    <main style={{ display: "flex", width: "1012px", marginTop: "100px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <section style={{ width: "662px", marginLeft: "42px" }}>
          <header>
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
                height: "200px",
                overflowY: "auto",
              }}
            >
              <h1>{hoot.title}</h1>
              <p>{hoot.text}</p>
            </div>
            {hoot.gifUrl && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={hoot.gifUrl}
                  alt="GIF"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "300px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            )}
          </div>
        </section>

        <section>
          <CommentForm handleAddComment={handleAddComment} />
          <div>
            {!hoot.comments?.length && (
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
                    {`${comment.author.name} posted on ${new Date(
                      comment.createdAt
                    ).toLocaleDateString()}`}
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
