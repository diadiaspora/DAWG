
import * as hootService from "../../services/hootService";
import { useNavigate, useParams } from "react-router-dom";
import HootDetails from "../../Components/HootDetails/HootDetails";
import HootList from "../../Components/HootList/HootList";
import HootLongList from "../../Components/HootList/HootList";

const HootDetailsPage = ({ user, setUser, hoots, setHoots }) => {
  const { hootId } = useParams();
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

        <HootLongList
          user={user}
          setUser={setUser}
          hoots={hoots}
          setHoots={setHoots}
          handleAddHoot={handleAddHoot}
        />

      </div>
    </>
  );
};

export default HootDetailsPage;
