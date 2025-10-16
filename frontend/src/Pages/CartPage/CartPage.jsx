import { NavLink } from "react-router-dom";
import MarketplaceWrapper from "../../Components/MarketplaceWrapper/MarketplaceWrapper";

import Cart from "../../Components/Cart/Cart.jsx";

export default function CartPage() {
  return (
    <>
      <Cart />
      {/* <p> Continue Shopping</p> */}
      <MarketplaceWrapper />
      
    </>
  );
}
