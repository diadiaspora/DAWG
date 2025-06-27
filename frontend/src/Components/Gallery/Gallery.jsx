import { useState } from "react";
import Carousel from "../../Components/Carousel/Carousel.jsx";
import PlanIndex from "../../Components/PlanIndex/PlanIndex.jsx";
import Calendar from "../../Components/Calendar/Calendar.jsx";
import { Link } from "react-router";
import "./Gallery.css";

const Gallery = () => {
  const [isGallery, setIsGallery] = useState(true);
  
  return (
    <div
      className="divbody"
      style={{ marginTop: "42px", width: "1012px" }}
    >
      <div style={{ marginLeft: "42px", textAlign: "left" }}>
        <h3 style={{ marginBottom: "-25px" }}>Gallery</h3>
        <p style={{ marginBottom: "0px", fontSize: "16px" }}>
          Add your Photos here
        </p>
      </div>
      <div style={{ marginLeft: "8px" }}>
        <h3 style={{ marginLeft: "42px" }}>Calendar</h3>
      </div>

      <div style={{ height: "350px", marginLeft: "42px" }}>
        <div style={{ width: "662px" }}>
          <Carousel />
        </div>

        <div
          style={{
            backgroundColor: "#D9D9D9",
            height: "75px",
            width: "665px",
            borderRadius: "7px",
            marginTop: "34px",
            paddingTop: "1px",
          }}
        >
          {/* <PlanIndex isGallery={isGallery} /> */}
        </div>
      </div>

      <div style={{ height: "350px", marginRight: "0px" }}>
       <Calendar />
      </div>
    </div>
  );
};

export default Gallery;
