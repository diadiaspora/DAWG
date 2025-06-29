import HootFormBig from "../../Components/HootFormBig/HootFormBig";
import * as hootService from "../../services/hootService";
import { useNavigate } from "react-router-dom";
import HootLongList from "../../Components/HootLongList/HootLongList";

export default function HootFormPage({ user, setUser, hoots }) {
  const navigate = useNavigate();

  const handleAddHoot = async (newHootData) => {
    try {
      const createdHoot = await hootService.create(newHootData);
      console.log("New hoot created from form page:", createdHoot);
      navigate("/");
    } catch (err) {
      console.error("Failed to create hoot from form page", err);
    }
  };

  return (
    <>
      <section style={{ width: "100%", paddingTop: "100px" }}>
        <HootFormBig handleAddHoot={handleAddHoot} />
        <HootLongList
          user={user}
          setUser={setUser}
          hoots={hoots}
          handleAddHoot={handleAddHoot}
        />
      </section>
    </>
  );
}
