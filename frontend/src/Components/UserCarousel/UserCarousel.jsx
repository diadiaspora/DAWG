import React, { useState, useEffect, useRef } from "react";

export default function AllUsersCarousel({ user, profile }) {
  const scrollRef = useRef(null);
  const [galleryImages, setGalleryImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [hover, setHover] = useState(false);

 
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
  }, [galleryImages]);
  


  useEffect(() => {
    if (!profile || !profile._id) return;

    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/gallerys/${profile._id}`);
        if (!res.ok) throw new Error("Failed to fetch gallery");
        const data = await res.json();
        setGalleryImages(data.photoGallery || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, [profile?._id]);

  // Handle image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const token = localStorage.getItem("token"); // Retrieve token here

      const formData = new FormData();
      formData.append("image", file); // backend expects `image` field

      const res = await fetch(`/api/gallerys/upload/${profile._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Add auth header here
        },
        body: formData,
      });

      const contentType = res.headers.get("content-type") || "";

      if (!res.ok) {
        if (contentType.includes("application/json")) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Upload failed");
        } else {
          const text = await res.text();
          throw new Error(text || "Upload failed");
        }
      }

      if (contentType.includes("application/json")) {
        const responseData = await res.json();
        setGalleryImages(responseData.gallery.photoGallery);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      alert(err.message);
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = null; // reset file input
    }
  };

  if (!user) {
    return <p>Please log in to see and upload your gallery images.</p>;
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: "#1E3769",
          width: "1012px",

          display: "flex",
          borderRadius: "7px",
          height: "70px",
          alignItems: "baseline",
          marginBottom: "24px",
          padding: "12px",
        }}
      >
        <h1
          style={{
            fontSize: "18px",
            color: "#ffffff",
            marginTop: "10px",
            marginleft: "21px",
            marginRight: "660px",
          }}
        >
          Gallery
        </h1>

        <label
          htmlFor="file-upload"
          style={{
            borderWidth: "1px",
            backgroundColor: "#ffffff",
            width: "240px",
            height: "44px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
            fontFamily: "Roboto",
            borderColor: hover ? "#4AA692" : "#1E3769", // ✅ only once
            color: hover ? "#347567" : "#1E3769", // ✅ only once
            borderRadius: "7px", // ✅ once
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ display: "none" }}
        />
      </div>
      <div
        ref={scrollRef}
        className="hoot-scroll-container"
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "scroll",
          scrollBehavior: "smooth",
          maxWidth: "100%",
          paddingBottom: "10px",
        }}
      >
        {galleryImages.length === 0 && <p>No images uploaded yet.</p>}
        {galleryImages.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`Gallery image ${idx + 1}`}
            style={{
              height: "150px",
              borderRadius: "8px",
              objectFit: "cover",
              cursor: "pointer",
              userSelect: "none",
            }}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
