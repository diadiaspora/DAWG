import * as hootService from "../../services/hootService";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HootForm from "../../Components/HootForm/HootForm";

export default function HootList(props) {
  const [randomHoots, setRandomHoots] = useState([]);

  useEffect(() => {
    if (props.hoots && props.hoots.length > 0) {
      // Shuffle the hoots array
      const shuffled = [...props.hoots].sort(() => 0.5 - Math.random());
      // Take the first 2 items
      setRandomHoots(shuffled.slice(0, 2));
    }
  }, [props.hoots]);

    const handleAddHoot = async (newHootData) => {
      const createdHoot = await hootService.create(newHootData);
      console.log("New hoot created:", createdHoot);
      navigate("/"); // or refresh the list, or update props.hoots
    };

  return (
    <>
      <div style={{marginTop: "75px"}}>
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
                  borderColor: "#d9d9d9",
                  borderWidth: "1px",
                  borderRadius: "7px",
                  height: "310px",
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
    </>
  );
}
