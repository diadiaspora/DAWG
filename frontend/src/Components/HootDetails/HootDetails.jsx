import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as hootService from "../../services/hootService";

import CommentForm from "../CommentForm/CommentForm";

const HootDetails = () => {
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);

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
  };

  if (!hoot) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <p>
            {`${hoot.author} posted on
              ${new Date(hoot.createdAt).toLocaleDateString()}`}
          </p>
        </header>
        <p>{hoot.text}</p>

        {/* Add this block to display the GIF */}
        {hoot.gifUrl && (
          <div
            style={{
              marginTop: "20px", // Add some space above the GIF
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
      </section>

      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!hoot.comments.length && <p>There are no comments.</p>}
        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.name} posted on
                  ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;
