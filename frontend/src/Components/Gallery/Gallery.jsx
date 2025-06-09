import "./Gallery.css";

const Gallery = () => {
  
  
  return (
    <div className="divbody">
      <aside>
        <h3>Gallery </h3>
        <p>Add your Photos here</p>
      </aside>
      <main>
        <h3>Calendar</h3>
      </main>

      <div className="aside">
        <div>
          <img src="./gallery.png" className="gallery" alt="gallery"></img>
        </div>

        <h3
          style={{ backgroundColor: "#D9D9D9", height: "75px", width: "665px", borderRadius: "10px" }}
        >
          Plan June 3, 2025 - June 24. 2025
          <button
            style={{
          
              width: "70px", marginLeft: "75px"
            }}
          >
            {" "}
            Plan
          </button>
        </h3>
      </div>

      <div className="main">
        <div>
          <img src="./calander.png" className="calander" alt="calander"></img>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
