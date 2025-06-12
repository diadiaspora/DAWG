import { useState, useEffect } from "react";
import * as postService from "../../services/postService";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Keep this for base carousel functionality
import "./RedditPostList.css"; // Import your new custom CSS file here for spacing

// Helper function to generate a unique ID for new comments/replies
const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

// Define responsive breakpoints for how many post cards to show
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1400 },
    items: 3,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1400, min: 1024 },
    items: 2,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

// Custom Left Arrow Component with inline styles (Black and Below)
const CustomLeftArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "absolute",
      bottom: "10px", // Position 10px from the bottom of the carousel container's padding
      left: "calc(50% - 60px)", // Adjusted to be left of center for both arrows
      backgroundColor: "black", // Black background
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
      cursor: "pointer",
      zIndex: 1,
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    }}
  >
    &lt;
  </button>
);

// Custom Right Arrow Component with inline styles (Black and Below)
const CustomRightArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: "absolute",
      bottom: "10px", // Position 10px from the bottom of the carousel container's padding
      right: "calc(50% - 60px)", // Adjusted to be right of center for both arrows
      backgroundColor: "black", // Black background
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "20px",
      cursor: "pointer",
      zIndex: 1,
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    }}
  >
    &gt;
  </button>
);

export default function PostListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await postService.index();
      const updatedPosts = fetchedPosts.map((post) => ({
        ...post,
        likes: 0,
        showComments: false, // Default to false, button will toggle existing comments
        comments: post.comments
          ? post.comments.map((comment) => ({
              _id: generateUniqueId(),
              text: comment,
              showReplyForm: false,
              replies: [],
            }))
          : [],
      }));
      setPosts(updatedPosts);
    }
    fetchPosts();
  }, []);

  function toggleComments(postId) {
    setPosts(
      posts.map((post) =>
        post._id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  }

  function addLike(postId) {
    setPosts(
      posts.map((post) =>
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }

  // Function to add a top-level comment to a post
  function addComment(postId, commentText) {
    setPosts(
      posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  _id: generateUniqueId(),
                  text: commentText,
                  showReplyForm: false,
                  replies: [],
                },
              ],
            }
          : post
      )
    );
  }

  // Function to toggle the reply form for a specific comment
  function toggleReplyForm(postId, commentId) {
    setPosts(
      posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment._id === commentId
                  ? { ...comment, showReplyForm: !comment.showReplyForm }
                  : comment
              ),
            }
          : post
      )
    );
  }

  // Function to add a reply to a specific comment
  function addReply(postId, parentCommentId, replyText) {
    setPosts(
      posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment._id === parentCommentId
                  ? {
                      ...comment,
                      replies: [
                        ...comment.replies,
                        { _id: generateUniqueId(), text: replyText },
                      ],
                      showReplyForm: false,
                    }
                  : comment
              ),
            }
          : post
      )
    );
  }

  const buttonStyle = {
    background: "none",
    border: "none",
    color: "#0079d3",
    cursor: "pointer",
    fontSize: "14px",
  };

  const commentButtonStyle = {
    padding: "6px 12px",
    backgroundColor: "#0079d3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <>
      <div
        style={{
          marginTop: "-340px",
          marginLeft: "42px",
          marginRight: "42px",
          position: "relative",
          paddingBottom: "120px", // Increased padding for arrows to be clearly below
        }}
      >
        <h1 style={{ textAlign: "left" }}>Post List</h1>

        {posts.length ? (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false} // Disabled auto-scrolling
            arrows={true}
            showDots={false}
            partialVisible={false}
            containerClass="react-multi-carousel-list" // Default class from library
            itemClass="react-multi-carousel-item" // Default class from library, targeted by custom CSS
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {posts.map((post) => (
              <div
                key={post._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px", // Internal padding for the card's content
                  backgroundColor: "#f9f9f9",
                  color: "#333",
                  width: "350px", // Fixed width for the card content area
                  minHeight: "400px",
                  boxSizing: "border-box", // Important for correct width calculation
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  // Margin for spacing is now handled by .react-multi-carousel-item in CSS
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      marginBottom: "8px",
                      margin: "0px",
                    }}
                  >
                    <strong>{post.user?.username || "Anonymous"}</strong> •{" "}
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                  <h3 style={{ margin: "10px 0" }}>{post.title}</h3>
                  <div style={{ fontSize: "16px", marginBottom: "12px" }}>
                    {post.content}
                  </div>
                </div>

                {/* Buttons section (excluding comment toggle, as form is always visible) */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() => toggleComments(post._id)} // Still toggles existing comments
                      style={buttonStyle}
                    >
                      {post.showComments ? "Hide Comments" : "View Comments"}
                    </button>
                    <button
                      onClick={() => addLike(post._id)}
                      style={buttonStyle}
                    >
                      👍 {post.likes}
                    </button>
                    <button
                      onClick={() =>
                        navigator.share?.({ text: post.content }) ||
                        console.log(
                          "Sharing not supported by browser navigator.share API."
                        )
                      }
                      style={buttonStyle}
                    >
                      🔗 Share
                    </button>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <h4 style={{ fontSize: "14px" }}>Comments</h4>
                    {/* Form for adding new top-level comments (ALWAYS VISIBLE) */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const commentText = e.target.elements.comment.value;
                        if (commentText.trim()) {
                          addComment(post._id, commentText.trim());
                          e.target.reset();
                        }
                      }}
                      style={{
                        marginBottom: "15px",
                        display: "flex",
                        gap: "6px",
                      }}
                    >
                      <input
                        name="comment"
                        type="text"
                        placeholder="Add a comment..."
                        style={{
                          flex: 1,
                          padding: "6px",
                          borderRadius: "4px",
                          border: "1px solid #aaa",
                        }}
                      />
                      <button type="submit" style={commentButtonStyle}>
                        Comment
                      </button>
                    </form>

                    {/* Display existing comments and their replies (visibility toggled by button) */}
                    {post.showComments && (
                      <>
                        {post.comments.length > 0 ? (
                          post.comments.map((comment) => (
                            <div
                              key={comment._id}
                              style={{
                                padding: "6px 8px",
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                                marginBottom: "8px",
                              }}
                            >
                              <p style={{ margin: "0" }}>{comment.text}</p>
                              <button
                                onClick={() =>
                                  toggleReplyForm(post._id, comment._id)
                                }
                                style={{
                                  ...buttonStyle,
                                  fontSize: "12px",
                                  marginLeft: "5px",
                                }}
                              >
                                {comment.showReplyForm
                                  ? "Cancel Reply"
                                  : "Reply"}
                              </button>

                              {/* Reply Form */}
                              {comment.showReplyForm && (
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const replyText =
                                      e.target.elements.reply.value;
                                    if (replyText.trim()) {
                                      addReply(
                                        post._id,
                                        comment._id,
                                        replyText.trim()
                                      );
                                      e.target.reset();
                                    }
                                  }}
                                  style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    gap: "6px",
                                  }}
                                >
                                  <input
                                    name="reply"
                                    type="text"
                                    placeholder="Add a reply..."
                                    style={{
                                      flex: 1,
                                      padding: "6px",
                                      borderRadius: "4px",
                                      border: "1px solid #aaa",
                                    }}
                                  />
                                  <button
                                    type="submit"
                                    style={commentButtonStyle}
                                  >
                                    Reply
                                  </button>
                                </form>
                              )}

                              {/* Display Replies */}
                              {comment.replies.length > 0 && (
                                <div
                                  style={{
                                    marginLeft: "20px",
                                    marginTop: "5px",
                                    borderLeft: "2px solid #eee",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  {comment.replies.map((reply) => (
                                    <div
                                      key={reply._id}
                                      style={{
                                        padding: "4px 6px",
                                        backgroundColor: "#f0f2f5",
                                        borderRadius: "4px",
                                        border: "1px solid #eee",
                                        marginBottom: "4px",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {reply.text}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <p style={{ fontSize: "14px", color: "#888" }}>
                            No comments yet.
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <p>No Posts Yet!</p>
        )}
      </div>
    </>
  );
}
