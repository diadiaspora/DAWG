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
import FlightButton from "../../Components/FlightButton/FlightButton";
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
        <div className="container">
          <div>
            <div style={{ marginLeft: "-3vw" }}>
              <Header user={user} setUser={setUser} />
            </div>
            {/* <div className="mobile-only">
              <FlightButton />
            </div> */}

            <div className="mobile-only">
              <FlightMobile />
            </div>
            <SearchComponent />
          </div>

          <div className="mobile-text">
            <h2
              style={{
                paddingTop: "20px",
                paddingLeft: "20px",
                width: "300px",
              }}
            >
              Besties
            </h2>
          </div>
        </div>
        <Gallery />
        <div>
          <BlogsComponent />
        </div>

        <div className="mobile-text-blue"></div>
        <HootFeature hoots={hoots} user={user} setHoots={setHoots} />
        <HootLongList
          user={user}
          setUser={setUser}
          hoots={hoots}
          setHoots={setHoots}
          handleAddHoot={handleAddHoot}
        />

        <MarketplaceWrapper />
        <div>
          <BlogList user={user} setUser={setUser} />
        </div>
      </section>
    </>
  );
}
