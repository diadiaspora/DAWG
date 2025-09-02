import Header from "../../Components/Header/Header.jsx";
import SearchComponent from "../../Components/SearchComponent/SearchComponent.jsx";
import Marketplace from "../../Components/Marketplace/Marketplace.jsx";
import MarketplaceDesigns from "../../Components/Marketplace/MarketplaceDesigns.jsx";

export default function MarketplacePage({ user, setUser }) {
  return (
    <>
      <section className="home">
      
          <div>
            <div style={{ marginLeft: "-3vw" }}>
              <Header user={user} setUser={setUser} />
            </div>
            <SearchComponent />
          </div>
       
        <div>
          <Marketplace />
          <MarketplaceDesigns />
        </div>
      </section>
    </>
  );
}
