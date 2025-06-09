const Resources = () => {
  return (
    <>
      <div className="resdivbody" style={{ marginTop: "-260px" }}>
        <aside>
          <h3>Resources </h3>
        </aside>

        <main>Calander</main>

        <div className="resaside">
          <div>
            <img
              src="./resources.png"
              className="resgallery"
              alt="gallery"
            ></img>
          </div>
        </div>

        <div className="resmain" style={{ backgroundColor: "grey" }}>
          <div className="resmain" style={{ backgroundColor: "grey" }}>
            <h5>
              {" "}
              Share Your Pet <br></br>Travel Experiences!
            </h5>
            <p>
              You can inspire<br></br> and help other <br></br>
              people enjoy the <br></br>world with their<br></br> best friend.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
