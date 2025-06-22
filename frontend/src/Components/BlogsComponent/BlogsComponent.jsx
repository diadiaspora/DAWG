import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { blogPosts } from "../../Data/blogs";
import BlogCard from "../../Components/BlogCard/BlogCard.jsx";
import "./BlogsComponent.css";

export default function BlogsComponent() {
  const [shuffledBlogs, setShuffledBlogs] = useState([]);

  useEffect(() => {
    // Shuffle the blog posts when the component mounts
    const shuffled = [...blogPosts].sort(() => 0.5 - Math.random());
    setShuffledBlogs(shuffled);
  }, []);

  const cardsPerSlide = 4;


  let effectiveBlogs = [];
  if (shuffledBlogs.length > 0) {

    effectiveBlogs = [...shuffledBlogs];
    const remainder = shuffledBlogs.length % cardsPerSlide;
    if (remainder !== 0) {
      const needed = cardsPerSlide - remainder;
      effectiveBlogs = [...shuffledBlogs, ...shuffledBlogs.slice(0, needed)];
    }

  }


  const slidesContent = [];
  for (let i = 0; i < effectiveBlogs.length; i += cardsPerSlide) {
    slidesContent.push(effectiveBlogs.slice(i, i + cardsPerSlide));
  }



  const carouselSettings = {
    showArrows: true,
    showStatus: false,
    showIndicators: true, 
    infiniteLoop: true, 
    showThumbs: false,
    centerMode: false,

  };

  return (
    <div className="blogs-component-container">
      <Carousel {...carouselSettings}>
        {slidesContent.map((slideBlogs, index) => (
          <div key={index} className="blog-cards-wrapper">
            {slideBlogs.map((post) => (
              <BlogCard key={post.id} blog={post} />
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
