import { useNavigate } from "react-router-dom";
import { Link } from "react-router";

import "./Resources.css";

const Resources = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/posts/new");
  };

  return (
    <div className="divbd" style={{ marginTop: "-300px" }}>
      <aside style={{ marginLeft: "42px", textAlign: "left" }}>
        <Link to="/blogs"> 
          <h3 style={{ marginBottom: "-25px" }}>Resources </h3>
          </Link>
        <p></p>
      </aside>
      <main style={{ marginRight: "42px" }}></main>

      <div style={{ height: "350px", marginLeft: "42px", display: "flex" }}>
        <div
          style={{
            marginRight: "21px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "grey",
            borderRadius: "20px",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1570299437488-d430e1e677c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3ViYXxlbnwwfHwwfHx8MA%3D%3D"
            alt="resources"
            style={{
              width: "192px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          ></img>
        </div>
        <div
          style={{
            marginRight: "21px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "grey",
            borderRadius: "20px",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1570299437488-d430e1e677c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3ViYXxlbnwwfHwwfHx8MA%3D%3D"
            alt="resources"
            style={{
              width: "192px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          ></img>
        </div>
        <div
          style={{
            marginRight: "21px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "grey",
            borderRadius: "20px",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1570299437488-d430e1e677c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3ViYXxlbnwwfHwwfHx8MA%3D%3D"
            alt="resources"
            style={{
              width: "192px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          ></img>
        </div>
      </div>

      <div style={{ height: "350px", marginLeft: "42px" }}>
        <div
          style={{
            backgroundColor: "#D9D9D9",
            width: "310px",
            borderRadius: "20px",
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
