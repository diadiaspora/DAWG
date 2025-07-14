import { useParams } from "react-router-dom";
import * as hootService from "../../services/hootService";
import HootDetails from "../../Components/HootDetails/HootDetails";
import HootList from "../../Components/HootList/HootList";
import { useNavigate } from "react-router-dom";

const HootDetailsPage = ({ user, setUser, hoots }) => {
  const { hootId } = useParams(); // ✅ FIXED LINE
  const navigate = useNavigate();

  const handleAddHoot = async (newHootData) => {
    const createdHoot = await hootService.create(newHootData);
    console.log("New hoot created:", createdHoot);
    navigate("/");
  };

  return (
    <>
      <div>
        <HootDetails hootId={hootId} user={user} setUser={setUser} />

        <HootList
          user={user}
          setUser={setUser}
          hoots={hoots}
          handleAddHoot={handleAddHoot}
        />
      </div>
    </>
  );
};

export default HootDetailsPage;
