import { useState, useEffect } from "react";
import HeadButtons from "../HeadButtons/HeadButtons.jsx";
import SearchFlights from "../SearchFlights/SearchFlights.jsx";
import SearchAirlines from "../SearchAirlines/SearchAirlines.jsx";
import SearchDocuments from "../SearchDocuments/SearchDocuments.jsx";
import SearchServices from "../SearchServices/SearchServices.jsx";
import "./SearchComponent.css";

const SearchComponent = () => {
  const [activeForm, setActiveForm] = useState("flights");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 480;
      setIsMobile(isNowMobile);
      if (isNowMobile) {
        setActiveForm("airlineInfo");
      } else {
        setActiveForm("flights"); 
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div>
        <div
          className="mobile-dog"
          style={{
            width: "380px",
            marginTop: "10px",
            marginBottom: "-16px",
            marginLeft: "-12px"
          }} >
          <div>
            <img src="/pit.png" className="dog-mobile" alt="labrador" />
          </div>
          <div>
            <img src="/doodle.png" className="dog-mobile" alt="shitzu" />
          </div>
          <div>
            <img src="/english.png" className="dog-mobile" alt="terrier" />
          </div>
        </div>

        <div className="headbuttonz">
          <HeadButtons activeForm={activeForm} setActiveForm={setActiveForm} />
        </div>
        <div className="box">
          {!isMobile && activeForm === "flights" && <SearchFlights />}
          {activeForm === "airlineInfo" && <SearchAirlines />}
          {activeForm === "documents" && <SearchDocuments />}
          {activeForm === "services" && <SearchServices />}
        </div>
        {/* <div className="box-mobile">
          {!isMobile && activeForm === "flights" && <SearchFlights />}
          {activeForm === "airlineInfo" && <SearchAirlines />}
          {activeForm === "documents" && <SearchDocuments />}
          {activeForm === "services" && <SearchServices />}
        </div> */}
      </div>
    </>
  );
};

export default SearchComponent;
