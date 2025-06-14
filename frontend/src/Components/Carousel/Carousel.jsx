import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";



function MyCarousel() {
    return (
      <Carousel
        showIndicators={true}
        infiniteLoop={true}
        autoPlay={true}
        swipeable={true}
        showThumbs={false}
        centerMode={true}
        centerSlidePercentage={50}
        selectedItem={0}
      >
        <div
          style={{ width: "100%", paddingRight: "12px", borderRadius: "20px" }}
        >
          <img
            src="https://images.unsplash.com/photo-1694299746846-6c51e6a69697?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Slide 1"
            style={{ borderRadius: "20px", width: "100%" }}
          />
        </div>
        <div
          style={{ width: "100%", paddingRight: "12px", borderRadius: "20px" }}
        >
          <img
            src="https://images.unsplash.com/photo-1521092375781-38696f9841fe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Slide 2"
            style={{ borderRadius: "20px", width: "100%" }}
          />
        </div>
        <div
          style={{ width: "100%", paddingRight: "12px", borderRadius: "20px" }}
        >
          <img
            src="https://images.unsplash.com/photo-1698423252582-40a2f7fc2e75?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Slide 3"
            style={{ borderRadius: "20px", width: "100%" }}
          />
        </div>
      </Carousel>
    );
}

export default MyCarousel;