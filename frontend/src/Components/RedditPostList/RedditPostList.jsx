import { useState, useEffect } from "react";
import * as postService from "../../services/postService";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ArrowLeft, ArrowRight, ThumbsUp, MessageSquare, Share2, CornerDownRight } from "lucide-react";
import "./RedditPostList.css";
import { Link } from "react-router";

const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

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

const CustomLeftArrow = ({ onClick }) => (
  <button onClick={onClick} style={{ position: "absolute", bottom: "10px", left: "calc(50% - 60px)", backgroundColor: "black", color: "white", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", zIndex: 1, boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)" }}>
    <ArrowLeft size={20} color="white" />
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button onClick={onClick} style={{ position: "absolute", bottom: "10px", right: "calc(50% - 60px)", backgroundColor: "black", color: "white", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", zIndex: 1, boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)" }}>
    <ArrowRight size={20} color="white" />
  </button>
);

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [replyInputs, setReplyInputs] = useState({}); // New state for reply inputs

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await postService.index();
      const updatedPosts = fetchedPosts.map((post) => ({
        ...post,
        likes: 0,
        showComments: false,
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
        post._id === postId ? { ...post, showComments: !post.showComments } : post
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

  function addComment(postId, commentText) {
    if (!commentText.trim()) return;
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
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  }

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

  function addReply(postId, parentCommentId, replyText) {
    if (!replyText.trim()) return;
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
    setReplyInputs((prev) => ({ ...prev, [`${postId}_${parentCommentId}`]: "" }));
  }

  const buttonStyle = {
    background: "none",
    border: "none",
    color: "#0079d3",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  return (
    <div
      style={{
        marginTop: "-340px",
        marginLeft: "42px",
        marginRight: "42px",
        position: "relative",
        paddingBottom: "120px",
        width: "1012px"
      }}
    >
      <Link to="/posts">
        <h1 style={{ textAlign: "left" }}>Post List</h1>
      </Link>
      {posts.length ? (
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          arrows={true}
          showDots={false}
          partialVisible={false}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {posts.map((post) => (
            <div
              key={post._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "#f9f9f9",
                color: "#333",
                width: "350px",
                minHeight: "400px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    marginBottom: "8px",
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
                    onClick={() => toggleComments(post._id)}
                    style={buttonStyle}
                  >
                    <MessageSquare size={16} />{" "}
                    {post.showComments ? "Hide" : "View"} Comments
                  </button>
                  <button onClick={() => addLike(post._id)} style={buttonStyle}>
                    <ThumbsUp size={16} /> {post.likes}
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
                    <Share2 size={16} /> Share
                  </button>
                </div>
                {post.showComments && (
                  <div>
                    <div>
                      {post.comments.map((comment) => (
                        <div
                          key={comment._id}
                          style={{ paddingLeft: "10px", marginBottom: "6px" }}
                        >
                          <p style={{ marginBottom: "4px" }}>{comment.text}</p>
                          {comment.replies.map((reply) => (
                            <div
                              key={reply._id}
                              style={{ marginLeft: "10px", fontSize: "13px" }}
                            >
                              <CornerDownRight
                                size={12}
                                style={{ marginRight: "4px" }}
                              />
                              {reply.text}
                            </div>
                          ))}
                          <button
                            onClick={() =>
                              toggleReplyForm(post._id, comment._id)
                            }
                            style={{
                              ...buttonStyle,
                              fontSize: "12px",
                              marginTop: "4px",
                            }}
                          >
                            Reply
                          </button>
                          {comment.showReplyForm && (
                            <div style={{ marginTop: "6px" }}>
                              <input
                                type="text"
                                placeholder="Write a reply..."
                                value={
                                  replyInputs[`${post._id}_${comment._id}`] ||
                                  ""
                                }
                                onChange={(e) =>
                                  setReplyInputs((prev) => ({
                                    ...prev,
                                    [`${post._id}_${comment._id}`]:
                                      e.target.value,
                                  }))
                                }
                                style={{
                                  width: "100%",
                                  padding: "4px",
                                  borderRadius: "4px",
                                  border: "1px solid #ccc",
                                  fontSize: "13px",
                                }}
                              />
                              <button
                                onClick={() =>
                                  addReply(
                                    post._id,
                                    comment._id,
                                    replyInputs[`${post._id}_${comment._id}`] ||
                                      ""
                                  )
                                }
                                style={{
                                  marginTop: "4px",
                                  padding: "4px 6px",
                                  fontSize: "12px",
                                  backgroundColor: "#0079d3",
                                  color: "white",
                                  borderRadius: "4px",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                Reply
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentInputs[post._id] || ""}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({
                            ...prev,
                            [post._id]: e.target.value,
                          }))
                        }
                        style={{
                          width: "100%",
                          padding: "6px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                        }}
                      />
                      <button
                        onClick={() =>
                          addComment(post._id, commentInputs[post._id] || "")
                        }
                        style={{
                          marginTop: "6px",
                          padding: "4px 8px",
                          border: "none",
                          backgroundColor: "#0079d3",
                          color: "white",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
}
