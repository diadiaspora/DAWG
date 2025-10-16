import { useState, useEffect } from "react";
import MarketplaceMobile from "../../Components/MarketplaceMobile/MarketplaceMobile";
import Marketplace from "../../Components/Marketplace/Marketplace";


export default function MarketplaceWrapper() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MarketplaceMobile /> : <Marketplace />;
}
