import "./Resources.css";

const Resources = () => {
  return (
    <div className="divbd" style={{ marginTop: "-300px" }}>
      <aside>
        <h3>Resources </h3>
      </aside>
      <main></main>

      <div className="aside">
        <div>
          <img src="./resources.png" className="gallery" alt="gallery"></img>
        </div>
      </div>

      <div className="main">
        <div style={{ backgroundColor: "#D9D9D9", width: "310px", borderRadius: "10px", height: "300px"}}>
          <h3>You can inspire and help other people! </h3>
          <button> Create a Post</button>
        </div>
      </div>
    </div>
  );
};

export default Resources;
