import ProfileForm from "../../Components/ProfileForm/ProfileForm.jsx";
import Carousel from "../../Components/Carousel/Carousel.jsx";

export default function UserProfilePage({ user }) {
  return (
    <>
      <div style={{ display: "flex"}}>
        <div>
          <img src="./Avatar.png" className="avatar" alt="human avatar"></img>
        </div>
        <h1>{user.name} & {user.petName }</h1>
      </div>
      <ProfileForm />
      <h1>Gallery</h1>
      <div style={{width: "1012px"}}>
        <Carousel />
</div>
      
      <h1>Users Post</h1>
    </>
  );
}
