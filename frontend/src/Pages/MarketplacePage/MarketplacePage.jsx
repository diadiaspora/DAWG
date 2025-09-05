import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Marketplace from "../../Components/Marketplace/Marketplace.jsx";
import MarketplaceDesigns from "../../Components/Marketplace/MarketplaceDesigns.jsx";
import "./MarketplacePage.css";

export default function MarketplacePage({ user, setUser }) {
  return (
    <section className="home">
      {/* Consistent header + search wrapper */}
      <div className="page-container">
        <div className="header-wrapper">
          <Header user={user} setUser={setUser} />
        </div>
        <SearchComponent />
      </div>

      <div className="wide-shop">
        <main className="mainly-shop">
          <Marketplace />
          <MarketplaceDesigns />
        </main>
      </div>
    </section>
  );
}
