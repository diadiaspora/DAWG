import "./Header.css";

export default function Header({ user }) {
  return (
    <>
      <div
        className="mobile-dog"
        style={{ width: "380px", marginTop: "32px", marginBottom: "-50px" }}
       >
        <div>
          <img src="/lab.png" className="dog-mobile" alt="labrador" />
        </div>
        <div>
          <img src="/shitzu.png" className="dog-mobile" alt="shitzu" />
        </div>
        <div>
          <img
            src="/terrier.png"
            className="dog-mobile"
            alt="terrier"
            style={{ marginTop: "30.5px" }}
          />
        </div>
      </div>
      <div className="header">
        {user ? (
          <div style={{ display: "flex" }}>
            <div>
              <h1 style={{ fontSize: "22px", marginTop: "40px" }}>
                Hey {user.name}
              </h1>
              <h2>Where are you and your dog going next?</h2>
            </div>
            <div>
              <img src="/lab.png" className="dog" alt="labrador" />
            </div>
            <div>
              <img src="/shitzu.png" className="dog" alt="shitzu" />
            </div>
            <div>
              <img
                src="/terrier.png"
                className="dog"
                alt="terrier"
                style={{ marginTop: "23px" }}
              />
            </div>
            <div>
              <img src="/pit.png" className="dog" alt="pit" />
            </div>
            <div>
              <img src="/chihuahua.png" className="dog" alt="chihuahua" />
            </div>
            <div>
              <img src="/doodle.png" className="dog" alt="labradoodle" />
            </div>
            <div>
              <img src="/english.png" className="dog" alt="labradoodle" />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <div style={{ width: "380px" }}>
              <h1>Hey </h1>
              <h2>Where are you and your dog going next?</h2>
            </div>
            <div>
              <img
                src="/lab.png"
                className="dog"
                alt="labrador"
                style={{ marginTop: "23px" }}
              />
            </div>
            <div>
              <img
                src="/shitzu.png"
                className="dog"
                alt="shitzu"
                style={{ marginTop: "23px" }}
              />
            </div>
            <div>
              <img
                src="/terrier.png"
                className="dog"
                alt="terrier"
                style={{ marginTop: "44.5px" }}
              />
            </div>
            <div>
              <img
                src="/pit.png"
                className="dog"
                alt="pit"
                style={{ marginTop: "23px" }}
              />
            </div>
            <div>
              <img
                src="/chihuahua.png"
                className="dog"
                alt="chihuahua"
                style={{ marginTop: "23px" }}
              />
            </div>
            <div>
              <img
                src="/doodle.png"
                className="dog"
                alt="labradoodle"
                style={{ marginTop: "23px" }}
              />
            </div>
            <div>
              <img
                src="/english.png"
                className="dog"
                alt="labradoodle"
                style={{ marginTop: "23px" }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
