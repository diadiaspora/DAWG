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
     
      style={{ marginTop: "42px", width: "1012px", display: "flex", marginBottom: "60px" }}
    >
   
    

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
