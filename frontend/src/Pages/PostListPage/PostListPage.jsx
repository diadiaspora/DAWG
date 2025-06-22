import { useState, useEffect } from "react";
import * as postService from "../../services/postService";
import { NavLink } from "react-router-dom";
import RedditPostList from "../../Components/RedditPostList/RedditPostList.jsx";

export default function PostListPage() {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   async function fetchPosts() {
  //     const posts = await postService.index();
  //     setPosts(posts);
  //   }
  //   fetchPosts();
  // }, []);

  return (
    <>
      <RedditPostList />
      {/* <h1>Post List</h1>
      {posts.length ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>{post.content}</li>
          ))}
        </ul>
      ) : (
        <p>No Posts Yet!</p>
      )} */}
    </>
  );
}
