
import * as hootService from "../../services/hootService";
import { useNavigate, useParams } from "react-router-dom";
import HootDetails from "../../Components/HootDetails/HootDetails";
import HootList from "../../Components/HootList/HootList";


const HootDetailsPage = ({ user, setUser, hoots }) => {
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
