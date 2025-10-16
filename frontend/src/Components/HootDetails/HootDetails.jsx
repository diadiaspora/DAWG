

import { useEffect, useState } from "react";
import * as hootService from "../../services/hootService";
import HootForm from "../../Components/HootForm/HootForm";
import CommentForm from "../CommentForm/CommentForm";
import CommentTree from "../CommentTree/CommentTree";
import CommentThread from "../CommentThread/CommentThread";

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
    try {
      await hootService.comment(hootId, commentFormData);
      // Re-fetch the hoot to get updated comment structure
      const updatedHoot = await hootService.show(hootId);
      setHoot(updatedHoot);
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };
  
  if (!hoot) return <main>Loading...</main>;

  const handleAddHoot = async (newHootData) => {
    const createdHoot = await hootService.create(newHootData);
    console.log("New hoot created:", createdHoot);
    // This may not be needed here unless this is a new-hoots+details combo
  };

  const nestedComments = hoot?.comments ? CommentTree(hoot.comments) : [];

  return (
    <main style={{ display: "flex", width: "1012px", marginTop: "100px" }}>
      <div> </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <section style={{ width: "662px", marginLeft: "42px" }}>
          <header></header>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#E9E9E9",
                borderRadius: "7px",
                padding: "12px",

                overflowY: "auto",
                height: "50vw",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginLeft: "40px",
                  marginTop: "5px",
                }}
              >
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
                <p style={{ marginLeft: "12px", marginTop: "6px" }}>
                  <strong>{hoot.author?.username || "Anonymous"}</strong>
                </p>
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
                      objectFit: "cover",
                      maxWidth: "100%",
                      height: "100%",
                      maxHeight: "100%",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
              )}
              <div style={{ marginLeft: "40px" }}>
                <h1>{hoot.title}</h1>
                <p>{hoot.text}</p>
              </div>
              <CommentForm
                handleAddComment={handleAddComment}
                parentId={null}
              />
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
                {nestedComments.map((comment) => (
                  <CommentThread
                    key={comment._id}
                    comment={comment}
                    handleAddComment={handleAddComment}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section></section>
      </div>
      <div style={{ marginLeft: "42px" }}>
        <HootForm handleAddHoot={handleAddHoot} />
      </div>
    </main>
  );
};

export default HootDetails;
