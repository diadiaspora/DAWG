

const Gallery = () => {
  return (
    <div className="divbody">
      <aside>
        <h3>Gallery </h3>
        <p>Add your Photos here</p>
      </aside>

      <main>Calander</main>

      <div className="aside">
        <div>
          <img src="./gallery.png" className="gallery" alt="gallery"></img>
        </div>

        <div className="plan">
          <h3>Plan June 3, 2025 - June 24. 2025</h3>
        </div>
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
