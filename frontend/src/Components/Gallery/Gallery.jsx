import "./Gallery.css";

const Gallery = () => {
  
  
  return (
    <div className="divbody" >
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
        <div>
          <img
            src="./gallery.png"
            alt="gallery"
            style={{ width: "662px" }}
          ></img>
        </div>

        <h3
          style={{
            backgroundColor: "#D9D9D9",
            height: "75px",
            width: "665px",
            borderRadius: "10px",
            marginTop: "73px"
          }}
        >
          Plan June 3, 2025 - June 24. 2025
          <button
            style={{
              width: "70px",
              marginLeft: "75px",
            }}
          >
            Plan
          </button>
        </h3>
      </div>

      <div style={{ height: "350px" }}>
        <div>
          <img src="./calander.png"  alt="calander" style={{width: "310px"}}></img>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
