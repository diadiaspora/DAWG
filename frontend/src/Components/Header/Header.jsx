import "./Header.css";

export default function Header({ user }) {
  return (
    <div className="header">
      {user ? (
        <div>
          <h1 style={{ display: "flex" }}>
            Hey {user.name}
          </h1>
          <h2>Where are you and your dog going next?</h2>
        </div>
      ) : (
        <div>
          <h1>Hey User</h1>
          <h2>Where are you and your dog going next?</h2>
        </div>
      )}
    </div>
  );
}
