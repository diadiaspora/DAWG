import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";
import { Link } from "react-router-dom";

export default function BlogList({ user }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.index();
      console.log("Fetched blogs with authors:", blogs);
      const shuffled = blogs.sort(() => 0.5 - Math.random());
      setBlogs(shuffled);
    }
    fetchBlogs();
  }, []);

  return (
    <>
      <div
        style={{
          marginLeft: "0px",
          width: "1012px",
          display: "flex",
          marginTop: "42px",
        }}
      >
        <div style={{ width: "662px", marginRight: "42px" }}>
          <h1 style={{ fontSize: "24px", marginLeft: "42px" }}>Blog List</h1>
          {blogs.length ? (
            <ul style={{ display: "flex" }}>
              {blogs.slice(0, 3).map((blog) => (
                <div
                  key={blog._id}
                  style={{
                    width: "206px",
                    borderRadius: "7px",
                    marginRight: "21px",
                    borderStyle: "solid",
                    borderColor: "#d9d9d9",
                    height: "350px",
                  }}
                >
                  <li>
                    <img
                      src={blog.contentOneImage}
                      alt="resources"
                      style={{
                        width: "206px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      }}
                    ></img>
                    <Link
                      to={`/blogs/${blog._id}`}
                      style={{
                        display: "block",
                        padding: "10px",
                        fontWeight: "bold",
                        textDecoration: "none",
                        color: "#1E3769",
                      }}
                    >
                      {blog.title}
                    </Link>
                    
                      <p>
                        {blog.author?.name
                          ? `By ${blog.author.name}`
                          : "Author Unknown"}
                      </p>
                    
                    <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No Blogs Yet!</p>
          )}
        </div>
        <div style={{ height: "350px", marginLeft: "42px", marginTop: "85px" }}>
          <div
            style={{
              backgroundColor: "#D9D9D7",
              width: "310px",
              borderRadius: "7px",
              height: "350px",
              marginTop: "0px",
              padding: "24px",
            }}
          >
            <h3> Share Your Experiences</h3>
            <h4>You can inspire and help other people! </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "36px",
              }}
            >
                <Link to="/posts/new">
              <button
                style={{
                  backgroundColor: "#1E3769",
                  borderRadius: "7px",
                  borderColor: "#1E3769",
                  width: "200px",
                  height: "44px",
                }}
              >
                Create a post
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
