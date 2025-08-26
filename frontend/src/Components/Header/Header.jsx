import "./Header.css";

export default function Header({ user }) {
  return (
    <div className="header">
      {user ? (
        <div className="signed-in">
       
          <h1 style={{ fontSize: "22px", marginTop: "40px" }}>
            Hey {user.name}
          </h1>
            <h2>Where are you and your dog going next?</h2>
            
        </div>
      ) : (
          <div className="signed-out">
           
          <h1 className="start">Hey </h1>
          <h2>Where are you and your dog going next?</h2>
           
            </div>
      )}
    </div>
  );
}
