import React, { useState, useEffect, useRef } from "react";
import { IoIosHeart } from "react-icons/io";
import "./AllUsersCarousel.css";

export default function AllUsersCarousel() {
  const scrollRef = useRef(null);
  const [allImages, setAllImages] = useState([]);
  console.log(allImages);
  // Shuffle helper
  const shuffleArray = (array) =>
    array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  // Fetch all gallery images on mount
  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const res = await fetch("/api/gallerys/all");
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        setAllImages(shuffleArray(data.images || []));
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllImages();
  }, []);

  // Auto-scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    if (scrollContainer.scrollWidth <= scrollContainer.clientWidth) return;

    const scrollSpeed = 1;
    const scrollInterval = 30;

    const intervalId = setInterval(() => {
      const atEnd =
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth - 5;

      if (atEnd) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
    }, scrollInterval);

    return () => clearInterval(intervalId);
  }, [allImages]);

  return (
    <div>
      <div
        ref={scrollRef}
        className="hoot-scroll-container"

      >
        {allImages.length === 0 && <p>No images available.</p>}

        {allImages.map((img, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",

              width: "200px", // fixed width, not minWidth
              flexShrink: 0, // prevents shrinking smaller than 150px
            }}
          >
            {/* Avatar and Info */}
            <div
              style={{
                display: "flex",
                marginBottom: "6px",
                justifyContent: "flex-start",
              }}
            >
              <img
                src={img.avatarUrl}
                alt="avatar"
                style={{
                  marginLeft: "-73px",
                  width: "24px",
                  height: "24px",
                  borderRadius: "150%",
                  objectFit: "cover",
                  marginBottom: "4px",
                }}
              />
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#1E3769",
                  marginLeft: "8px",
                  marginTop: "3px",
                }}
              >
                {img.username}
              </div>
              <div style={{marginTop:"4px", marginLeft: "6px"}}>
                
                <IoIosHeart />
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#1E3769",
                  marginLeft: "4px",
                  marginTop: "3px",
                }}
              >
                {img.petName}
              </div>
            </div>

            {/* Image */}
            <img
              src={img.imageUrl}
              alt={`Gallery image ${idx + 1}`}
              style={{
                height: "200px",
                width: "100%", // fixed width to fit container
                borderRadius: "8px",
                objectFit: "cover",
                cursor: "pointer",
                userSelect: "none",
              }}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
