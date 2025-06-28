import React, { useState, useEffect } from "react";
// Remove Carousel import
// import { Carousel } from "react-responsive-carousel";
// Remove Carousel CSS import
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import { blogPosts } from "../../Data/blogs"; // Assuming this is your static blog data
import BlogCard from "../../Components/BlogCard/BlogCard.jsx";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./BlogsComponent.css"; // Keep your existing CSS for general styling

export default function BlogsComponent() {
  const [shuffledBlogs, setShuffledBlogs] = useState([]);

  useEffect(() => {
    // Shuffle the blog posts when the component mounts
    const shuffled = [...blogPosts].sort(() => 0.5 - Math.random());
    // You might want to limit the number of blogs displayed in the scrollable list
    // similar to how you limited hoots (e.g., .slice(0, 10) or more depending on content)
    setShuffledBlogs(shuffled);
  }, []);

  // Removed cardsPerSlide, effectiveBlogs, slidesContent, and carouselSettings as they are no longer needed for a scrollable list

  return (
    <div className="blogs-component-container" style={{ marginTop: "75px" }}>
      <h2 style={{ marginLeft: "42px" }}>Latest Blogs</h2> {/* Add a title */}
      {/* This is the outer container that defines the *visible* width for scrolling */}
      <div
        style={{
          marginLeft: "42px",
          marginRight: "42px",
          // Define a fixed width or max-width for the *visible* scroll area.
          // This allows content inside to extend beyond this width and create a scrollbar.
          // Adjust '1041px' based on your desired visible width and card sizes.
          // For example, if you want to show 3 cards (331px each + 16px gap * 2) = 331*3 + 32 = 993 + 32 = 1025px
          maxWidth: "1025px", // Or a specific 'width'
          overflowX: "scroll", // <--- Enable horizontal scrolling here
          scrollSnapType: "x mandatory", // Optional: Snaps to card boundaries
          paddingBottom: "20px", // Add padding for scrollbar visibility
          scrollbarWidth: "thin", // For Firefox
          scrollbarColor: "#1E3769 #f0f0f0", // For Firefox (thumb track)
          WebkitOverflowScrolling: "touch", // Improve scroll performance on iOS
        }}
      >
        {/* This is the inner container that holds the BlogCards in a flex row */}
        <div
          style={{
            display: "flex",
            gap: "16px", // Space between blog cards
            // This inner container does not need 'overflowX: "scroll"'
            // It will naturally expand to fit all its children
          }}
        >
          {shuffledBlogs.map((post) => (
            // Wrap each BlogCard with a Link
            // Ensure BlogCard accepts a 'blog' prop and perhaps an 'onClick' if needed
            <Link
              key={post.id}
              to={`/articles/${post.id}`} // Adjust the path to your blog detail page
              style={{
                textDecoration: "none",
                color: "inherit",
                flexShrink: 0,
              }} // Remove underline, inherit color, prevent shrinking
            >
              <BlogCard blog={post} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
