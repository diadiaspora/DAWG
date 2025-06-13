import { useState, useEffect } from "react";
import * as blogService from "../../services/blogService";
import { useParams } from 'react-router';


export default function BlogDetail() {

        const { id } = useParams();
  

    const [blogs, setBlogs] = useState(null);




      useEffect(() => {
            async function fetchBlogs() {
              const blogs = await blogService.show(id);
              setBlogs(blogs);
            }
            fetchBlogs();
      }, []);
    
      if (!blogs) return <main>Loading...</main>;
    return (
      <main>
        <section>
          <header>
           
            <h1>{blogs.title}</h1>
            <p>
              {`${blogs.author.username} posted on
              ${new Date(blogs.createdAt).toLocaleDateString()}`}
            </p>
          </header>
          <p>{blogs.content}</p>
        </section>
        <section>
          <h2>Comments</h2>
        </section>
      </main>

    );
};
