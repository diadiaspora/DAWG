import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Marketplace from "../../Components/Marketplace/Marketplace.jsx";
import MarketplaceDesigns from "../../Components/Marketplace/MarketplaceDesigns.jsx";
import MobileCarousel from "../../Components/MobileCarousel/MobileCarousel.jsx";
import "./MarketplacePage.css";

export default function MarketplacePage({ user, setUser }) {
  return (
    <section className="home">
      {/* Consistent header + search wrapper */}
      <div className="page-container-shop">
        <div className="header-wrapper">
          <Header user={user} setUser={setUser} />
        </div>
        <SearchComponent />
      </div>

      <div className="wide-shop">
        {/* <div className="mobile-h">
          <MobileCarousel />
        </div> */}
        <main className="mainly-shop">
          <div
            className="mobile-dog"
            style={{
              width: "380px",
              marginTop: "24px",
              marginBottom: "0px",
            }}
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
          <div className="mobile-text-tea">
            <h2>Everything You Need</h2>
          </div>
          <Marketplace />
          <div
            className="mobile-dog"
            style={{
              width: "380px",
              marginTop: "0px",
              marginBottom: "0px",
            }}
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
          <div className="mobile-text-tea">
            <h2>Original Designs</h2>
            {/* <button
              style={{
                backgroundColor: "#4AA692",
                borderWidth: "0px",
                borderRadius: "7px",
                color: "#000000",
                fontSize: "14px",
                height: "34px",
                width: "80px",
                padding: "5px",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              View All
            </button> */}
          </div>
          <MarketplaceDesigns />
        </main>
      </div>
    </section>
  );
}
