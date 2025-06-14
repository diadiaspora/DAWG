import { useState } from "react";
import Carousel from "../../Components/Carousel/Carousel.jsx";
import PlanIndex from "../../Components/PlanIndex/PlanIndex.jsx";
import { Link } from "react-router";
import "./Gallery.css";

const Gallery = () => {
  const [isGallery, setIsGallery] = useState(true);
  
  return (
    <div className="divbody">
      <aside style={{ marginLeft: "42px", textAlign: "left" }}>
        <h3 style={{ marginBottom: "-25px" }}>Gallery</h3>
        <p style={{ marginBottom: "0px", fontSize: "16px" }}>
          Add your Photos here
        </p>
      </aside>
      <main style={{ marginRight: "42px" }}>
        <h3>Calendar</h3>
      </main>

      <div style={{ height: "350px", marginLeft: "42px" }}>
        <div style={{ width: "662px" }}>
          <Carousel />
        </div>

        <div
          style={{
            backgroundColor: "#D9D9D9",
            height: "75px",
            width: "665px",
            borderRadius: "20px",
            marginTop: "34px",
            paddingTop: "1px"
          }}
        >
          
            <PlanIndex isGallery={isGallery} />
        
       
        </div>
      </div>

      <div style={{ height: "350px" }}>
        <div>
          <img
            src="./calander.png"
            alt="calander"
            style={{ width: "310px" }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
