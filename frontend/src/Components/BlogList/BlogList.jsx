import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";
import { Link } from "react-router";


export default function BlogList() {
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
          <h1>Blog List</h1>
          {blogs.length ? (
            <ul style={{ display: "flex" }}>
              {blogs.map((blog) => (
                <div
                  style={{
                    width: "150px",
                    borderRadius: "20px",
                    margin: "12px",
                    borderStyle: "solid",
                    borderColor: "#d9d9d9",
                    height: "250px",
                  }}
                >
                  <li key={blog._id}>
                    <img
                      src="https://images.unsplash.com/photo-1570299437488-d430e1e677c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3ViYXxlbnwwfHwwfHx8MA%3D%3D"
                      alt="resources"
                      style={{
                        width: "150px",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    ></img>
                    <Link to={`${blog._id}`}> {blog.title} </Link>
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No Blogs Yet!</p>
          )}
        </>
      );
    }