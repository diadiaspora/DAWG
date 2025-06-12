import { useNavigate } from "react-router-dom";

import "./Resources.css";

const Resources = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/posts/new");
  };

  return (
    <div className="divbd" style={{ marginTop: "-300px"}}>
      <aside style={{ marginLeft: "42px", textAlign: "left" }}>
        <h3 style={{ marginBottom: "-25px" }}>Resources </h3>
        <p></p>
      </aside>
      <main style={{ marginRight: "42px" }}></main>

      <div style={{ height: "350px", marginLeft: "42px" }}>
        <div>
          <img
            src="./resources.png"
            alt="resources"
            style={{ width: "662px" }}
          ></img>
        </div>
      </div>

      <div style={{ height: "350px", marginLeft: "42px" }}>
        <div
          style={{
            backgroundColor: "#D9D9D9",
            width: "310px",
            borderRadius: "10px",
            height: "350px",
            marginTop: "-30px",
          }}
        >
          <h3>You can inspire and help other people! </h3>
          <button onClick={handleClick}>Create a post</button>
        </div>
      </div>
    </div>
  );
};

export default Resources;
