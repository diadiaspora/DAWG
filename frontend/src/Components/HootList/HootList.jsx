import * as hootService from "../../services/hootService";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HootForm from "../../Components/HootForm/HootForm";

export default function HootList(props) {
  const [randomHoots, setRandomHoots] = useState([]);
  const [allHoots, setAllHoots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.hoots && props.hoots.length > 0) {
      setAllHoots(props.hoots);
      randomizeHoots(props.hoots);
    }
  }, [props.hoots]);

  const randomizeHoots = (hootArray) => {
    const shuffled = [...hootArray].sort(() => 0.5 - Math.random());
    setRandomHoots(shuffled.slice(0, 2));
  };

  const handleAddHoot = async (newHootData) => {
    const createdHoot = await hootService.create(newHootData);
    console.log("New hoot created:", createdHoot);

    const updatedHoots = [createdHoot, ...allHoots];
    setAllHoots(updatedHoots);
    randomizeHoots(updatedHoots); // Re-randomize after adding
  };

  return (
    <div style={{ marginTop: "75px" }}>
      <h2 style={{ marginLeft: "42px" }}>Hoots List</h2>
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "16px",
          marginLeft: "42px",
        }}
      >
        <div style={{ display: "flex" }}>
          {randomHoots.map((hoot) => (
            <div
              key={hoot._id}
              style={{
                borderStyle: "solid",
                borderColor: "#BCC7D4",
                borderWidth: "1px",
                borderRadius: "7px",
                height: "auto",
                width: "331px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginRight: "8px",
              }}
            >
              <header>
                <h2>{hoot.title}</h2>
                <p>
                  {`${hoot.author} posted on ${new Date(
                    hoot.createdAt
                  ).toLocaleDateString()}`}
                </p>
              </header>
              <p>{hoot.text}</p>

              {/* ✅ Display GIF if it exists */}
              {hoot.gifUrl && (
                <img
                  src={hoot.gifUrl}
                  alt="GIF"
                  style={{
                    marginTop: "12px",
                    // Set a fixed width and height
                    width: "300px", // Or any desired fixed width
                    height: "200px", // Or any desired fixed height
                    // Add object-fit to control how the image fits within the bounds
                    objectFit: "cover", // 'cover' will crop to fill, 'contain' will fit without cropping
                    borderRadius: "6px",
                    boxShadow: "0 0 6px rgba(0,0,0,0.15)",
                  }}
                />
              )}

              <Link to={`/hoots/${hoot._id}`}>
                <button
                  style={{
                    marginTop: "auto",
                    backgroundColor: "#1E3769",
                    color: "white",
                    borderRadius: "6px",
                    border: "none",
                    padding: "8px",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <HootForm handleAddHoot={handleAddHoot} />
        </div>
      </div>
    </div>
  );
}
