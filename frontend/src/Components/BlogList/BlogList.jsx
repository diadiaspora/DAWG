import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";
import { Link } from "react-router";

export default function BlogList({ isHome }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.index();
      setBlogs(blogs);
    }
    fetchBlogs();
  }, []);

  return (
    <>
      <div style={{ marginLeft: "0px", width: "1012px", display: "flex" , marginTop: "42px"}}>
        <div style={{ width: "662px", marginRight: "42px" }}>
          <h1 style={{fontSize: "24px", marginLeft: "42px"}}>Blog List</h1>
          {blogs.length ? (
            <ul style={{ display: "flex" }}>
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  style={{
                    width: "206px",
                    borderRadius: "20px",
                   marginRight: "21px",
                    borderStyle: "solid",
                    borderColor: "#d9d9d9",
                    height: "350px",
                  }}
                >
                  <li>
                    <img
                      src="https://images.unsplash.com/photo-1570299437488-d430e1e677c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3ViYXxlbnwwfHwwfHx8MA%3D%3D"
                      alt="resources"
                      style={{
                        width: "206px",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    ></img>
                    <Link to={isHome ? `/blogs/${blog._id}` : `${blog._id}`}>
                      {blog.title}
                    </Link>
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
              borderRadius: "20px",
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
              <button
                style={{
                  backgroundColor: "#1E3769",
                  borderRadius: "50px",
                  borderColor: "#1E3769",
                  width: "200px",
                  height: "44px",
                }}
              >
                Create a post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
