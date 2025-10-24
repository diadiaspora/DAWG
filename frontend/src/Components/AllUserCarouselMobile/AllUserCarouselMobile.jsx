import React, { useState, useEffect } from "react";
import { IoIosHeart } from "react-icons/io";
import "./AllUserCarouselMobile.css";
import { Link } from "react-router-dom";

export default function AllUsersCarouselMobile() {
  const [allImages, setAllImages] = useState([]);
  const [randomImages, setRandomImages] = useState([]);


  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(`/api/gallerys/all`);
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        setAllImages(data.images || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchImages();
  }, []);


  useEffect(() => {
    if (allImages.length === 0) return;

    const shuffleArray = (array) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const shuffled = shuffleArray(allImages);
    const selected = shuffled.slice(0, 8); 
    setRandomImages(selected);
  }, [allImages]);

  return (
    <div className="mobile-gallery-container">
      {randomImages.map((img, idx) => (
        <div key={idx} className="gallery-item">
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
    </div>
  );
}
