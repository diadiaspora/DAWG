import HootFeature from "../../Components/HootFeature/HootFeature";
import HootList from "../../Components/HootList/HootList";
import * as hootService from "../../services/hootService";

import "./PostListPage.css";

export default function PostListPage(props) {
  const { user, setUser, hoots } = props;

  const handleAddHoot = async (newHootData) => {
    const createdHoot = await hootService.create(newHootData);
    console.log("New hoot created:", createdHoot);
    navigate("/");
  };

  return (
    <>
      <div>
        <div className="top"></div>
        <HootFeature hoots={hoots} user={user} setHoots={props.setHoots} />
        <HootList
          user={user}
          setUser={setUser}
          hoots={hoots}
          handleAddHoot={handleAddHoot}
        />
      </div>
    </>
  );
}
