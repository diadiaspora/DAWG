import HootForm from "../../Components/HootForm/HootForm";
import * as hootService from "../../services/hootService";
import { useNavigate } from "react-router";
import HootLongList from "../../Components/HootLongList/HootLongList";
import HootFeatureForm from "../../Components/HootFeatureForm/HootFeatureForm";
export default function HootFormPage({ user, setUser, hoots, setHoots }) {
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
        <HootFeatureForm hoots={hoots} user={user} setHoots={setHoots} />
      
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
