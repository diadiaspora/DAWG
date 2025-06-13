import { Link } from "react-router";

const Articles = () => {
  return (
    <div>
      <div>
        <Link to="./blogs">
          <h3>Articles</h3>
        </Link>
        <img
          src="./articles.png"
          style={{ width: "900px" }}
          alt="gallery"
        ></img>
      </div>
    </div>
  );
};

export default Articles;
