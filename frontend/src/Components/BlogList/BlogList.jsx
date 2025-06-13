import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";

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
            <ul>
              {blogs.map((blog) => (
                <li key={blog._id}>{blog.content}</li>
              ))}
            </ul>
          ) : (
            <p>No Blogs Yet!</p>
          )}
        </>
      );
    }