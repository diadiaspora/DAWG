import { useParams } from "react-router";
import * as hootService from "../../services/hootService";
import HootDetails from "../../Components/HootDetails/HootDetails";
import HootList from "../../Components/HootList/HootList"; // if you want to use this
import HootLongList from "../../Components/HootLongList/HootLongList"; // if you want to use th
import { useNavigate } from "react-router-dom";

const HootDetailsPage = ({ user, setUser, hoots}) => {
  const navigate = useNavigate();
  const handleAddHoot = async (newHootData) => {
    const createdHoot = await hootService.create(newHootData);
    console.log("New hoot created:", createdHoot);
    navigate("/"); // or refresh the list, or update props.hoots
  };

  return (
    <>
      <div>
        <HootDetails />

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
