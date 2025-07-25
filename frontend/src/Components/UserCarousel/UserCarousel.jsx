import  { useState, useEffect, useRef } from "react";
import { RiFolderUploadFill } from "react-icons/ri";


export default function UsersCarousel({ user, profile }) {
  const scrollRef = useRef(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [hover, setHover] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

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

  const handleDeleteImage = async (imageUrl) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setDeleting(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/gallerys/delete/${profile._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete image");
      }

      const responseData = await res.json();
      setGalleryImages(responseData.gallery.photoGallery); // update state
    } catch (err) {
      alert(err.message);
      console.error(err);
    } finally {
      setDeleting(false);
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
          alignItems: "center",
          marginBottom: "60px",
          padding: "12px",
          gap: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "18px",
            color: "#ffffff",
            marginLeft: "21px",
            flex: "1",
          }}
        >
          Gallery
        </h1>

        <label
          htmlFor="file-upload"
          style={{
            backgroundColor: "#ffffff",
            width: "240px",
            height: "44px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
            fontFamily: "Roboto",
            borderColor: hover ? "#4AA692" : "#1E3769",
            color: hover ? "#347567" : "#1E3769",
            borderRadius: "7px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {uploading ? (
            "Uploading..."
          ) : (
            <>
              <RiFolderUploadFill /> &nbsp; Upload Images
            </>
          )}
        </label>

        <button
          onClick={() => setDeleteMode(!deleteMode)}
          style={{
            backgroundColor: deleteMode ? "#ffcccc" : "#ffffff",
            color: deleteMode ? "#a30000" : "#1E3769",
            width: "240px",
            height: "44px",
            fontWeight: "bold",
            fontSize: "16px",
            border: "2px solid",
            borderColor: deleteMode ? "#a30000" : "#1E3769",
            borderRadius: "7px",
            cursor: "pointer",
          }}
        >
          {deleteMode ? "Done Deleting" : "Delete Images"}
        </button>

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
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "scroll",
          scrollBehavior: "smooth",
          maxWidth: "100%",
          paddingBottom: "10px",
        }}
      >
        {galleryImages.length === 0 ? (
          <div
            style={{
              width: "200px",
              height: "150px",
              border: "2px dashed #ccc",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              color: "#999",
              flexShrink: 0,
            }}
          >
            Add Images
          </div>
        ) : (
          galleryImages.map((url, idx) => (
            <div
              key={idx}
              style={{
                position: "relative",
                display: "inline-block",
                flexShrink: 0,
              }}
            >
              <img
                src={url}
                alt={`Gallery image ${idx + 1}`}
                style={{
                  height: "150px",
                  width: "200px",
                  borderRadius: "8px",
                  objectFit: "cover",
                  userSelect: "none",
                  display: "block",
                }}
                draggable={false}
              />
              {deleteMode && (
                <button
                  onClick={() => handleDeleteImage(url)}
                  disabled={deleting}
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  title="Delete Image"
                >
                  &times;
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
