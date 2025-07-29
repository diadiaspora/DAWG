import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoIosHeart } from "react-icons/io";
import "./AllUserCarouselMobile.css";

export default function AllUsersCarouselMobile() {
  const [allImages, setAllImages] = useState([]);
  const [page, setPage] = useState(1); // For pagination
  const [hasMore, setHasMore] = useState(true);

  // Fetch images page by page
  const fetchImages = async (pageNum = 1) => {
    try {
      const res = await fetch(`/api/gallerys/all?page=${pageNum}&limit=20`);
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();

      if (data.images.length === 0) {
        setHasMore(false);
        return;
      }

      setAllImages((prev) => [...prev, ...data.images]);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  // Load more images on scroll
  const fetchMoreImages = () => {
    setPage((prev) => prev + 1);
  };

  // Breakpoint columns for masonry
  const breakpointColumnsObj = {
    default: 2,
    480: 2, // 2 columns on mobile
    320: 1, // 1 column on very small screens
  };

  return (
    <InfiniteScroll
      dataLength={allImages.length}
      next={fetchMoreImages}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      style={{ overflow: "visible" }} // keep layout flow normal
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {allImages.map((img, idx) => (
          <div key={idx} className="masonry-item">
            <div className="user-info">
              <img
                src={img.avatarUrl}
                alt={`${img.username} avatar`}
                className="avatar"
              />
              <div className="user-details">
                <span className="username">{img.username}</span>
                <IoIosHeart className="heart-icon" />
                <span className="petname">{img.petName}</span>
              </div>
            </div>
            <img
              src={img.imageUrl}
              alt={`Gallery image ${idx + 1}`}
              className="gallery-image"
              draggable={false}
            />
          </div>
        ))}
      </Masonry>
    </InfiniteScroll>
  );
}
