import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";
import { useParams, useNavigate } from "react-router";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.show(id);

      console.log(blogs);
      setBlog(blogs);
      setFormData({
        title: blogs.title,
        contentOne: blogs.contentOne,
        contentTwo: blogs.contentTwo,
        contentThree: blogs.contentThree,
        contentFour: blogs.contentFour,
      });
    }
    fetchBlogs();
  }, [id]);

  const handleDeleteBlog = async (blogId) => {
    try {
      const deletedBlog = await blogService.deleteBlog(blogId);
      navigate(`/`);
      if (deletedBlog.err) throw new Error(deletedBlog.err);
      setBlog(null);
    } catch (err) {
      throw err;
      // console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateBlog = async () => {
    try {
      const updated = await blogService.update(id, formData);
      if (updated.err) throw new Error(updated.err);
      setBlog(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!blog) return <main>The Blogs Deleted</main>;

  return (
    <>
      <section>
        {isEditing ? (
          <>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <textarea
              name="contentOne"
              value={formData.contentOne}
              onChange={handleChange}
            />
            <textarea
              name="contentTwo"
              value={formData.contentTwo}
              onChange={handleChange}
            />
            <textarea
              name="contentThree"
              value={formData.contentThree}
              onChange={handleChange}
            />
            <textarea
              name="contentFour"
              value={formData.contentFour}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <h1>{blog.title}</h1>
            <p>
              {`${blog.author.username} posted on ${new Date(
                blog.createdAt
              ).toLocaleDateString()}`}
            </p>
            <p>{blog.contentOne}</p>
            <p>{blog.contentTwo}</p>
            <p>{blog.contentThree}</p>
            <p>{blog.contentFour}</p>
          </>
        )}
        <h2>Comments</h2>
      </section>

      {isEditing ? (
        <button onClick={handleUpdateBlog}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Update</button>
      )}
      <button onClick={() => handleDeleteBlog(blog._id)}>Delete Blog</button>
    </>
  );
}
