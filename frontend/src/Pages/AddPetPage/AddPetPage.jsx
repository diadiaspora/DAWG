import { useNavigate } from "react-router-dom";
import PetComponent from "../../Components/PetComponent/PetComponent";

export default function AddPetPage({ user }) {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/profile");
  };

  return (
    <div style={{ paddingTop: "100px", paddingLeft: "42px" }}>
      <PetComponent onSuccess={handleSuccess} user={user} mode="create" />
    </div>
  );
}
