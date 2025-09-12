import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Gallery from "../../Components/Gallery/Gallery.jsx";
import BlogList from "../../Components/BlogList/BlogList.jsx";
import MarketplaceWrapper from "../../Components/MarketplaceWrapper/MarketplaceWrapper.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogsComponent from "../../Components/BlogsComponent/BlogsComponent";
import * as hootService from "../../services/hootService";
import HootFeature from "../../Components/HootFeature/HootFeature";
import HootLongList from "../../Components/HootLongList/HootLongList";
import FlightMobile from "../../Components/FlightMobile/FlightMobile";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";

export default function HomePage({ user, setUser, hoots, setHoots, profile }) {
  const navigate = useNavigate();
  const handleAddHoot = async (newHootData) => {
    const createdHoot = await hootService.create(newHootData);
    console.log("New hoot created:", createdHoot);
    navigate("/");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://affiliate.klook.com/widget/fetch-iframe-init.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <section className="home">
        <div className="page-container">
          <div className="header-wrapper">
            <Header user={user} setUser={setUser} />
          </div>
          <div className="mobile-only">
          
            <div style={{ marginTop: "-50px" }}>
              <FlightMobile />
            </div>
          </div>
          <SearchComponent />
        </div>

        <div className="wide-home">
          <main className="mainly-home">
            {/* <div
              className="mobile-dog"
              style={{
                width: "380px",
                marginTop: "-220px",
                marginBottom: "145px",
              }}
            >
              <div>
                <img src="/pit.png" className="dog-mobile" alt="labrador" />
              </div>
              <div>
                <img src="/doodle.png" className="dog-mobile" alt="shitzu" />
              </div>
              <div>
                <img src="/english.png" className="dog-mobile" alt="terrier" />
              </div>
            </div> */}
            {/* <div className="mobile-only">
              <p className="flight-header-mobile">Search Flights</p>
              <div style={{ marginTop: "-189px" }}>
                <FlightMobile />
              </div>
            </div> */}

            <div className="mobile-text">
              <h2>Besties</h2>
            </div>

            <Gallery />

            <BlogsComponent />
            <HootFeature hoots={hoots} user={user} setHoots={setHoots} />
            <HootLongList
              user={user}
              setUser={setUser}
              hoots={hoots}
              setHoots={setHoots}
              handleAddHoot={handleAddHoot}
            />
            <MarketplaceWrapper />
            <BlogList user={user} setUser={setUser} />
          </main>
        </div>
      </section>
    </>
  );
}
