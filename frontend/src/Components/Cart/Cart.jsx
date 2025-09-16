
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";



export default function CartPage() {
  const { checkout, loading, updateLineItemQuantity, removeLineItem } =
    useContext(CartContext);
  const navigate = useNavigate();

  if (loading) return <p>Loading cart...</p>;
  if (!checkout || checkout.lineItems.length === 0) {
    return (
      <div>
        <h2>Your Cart is Empty</h2>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  const handleUpdateQuantity = async (lineItemId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeLineItem([lineItemId]);
    } else {
      await updateLineItemQuantity(lineItemId, newQuantity);
    }
  };

  const handleRemoveItem = async (lineItemId) => {
    await removeLineItem([lineItemId]);
  };

  const handleProceedToCheckout = () => {
    if (checkout && checkout.webUrl) {
      window.location.href = checkout.webUrl; // Redirect to Shopify checkout URL
    } else {
      alert("Checkout URL not available. Please try again.");
    }
  };

  return (
    <div className="cart-page" style={{ marginTop: "20px" }}>
      <h2>Your Shopping Cart</h2>
      <ul
        class="no-bullets"
        style={{
          width: "300px",
          maxHeight: "300px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
        }}
      >
        {checkout.lineItems.map((item) => (
          <li key={item.id}>
            <div style={{ display: "flex" }}>
              <div >
                <img
                  src={item.variant.image?.src}
                  alt={item.title}
                  style={{ width: "50px", borderRadius: "7px" }}
                />
              </div>
              <div
                style={{ marginTop: "0px", marginLeft: "12px", width: "140px" }}
              >
                <h4 style={{ marginTop: "0px" }}>{item.title}</h4>
                <p style={{ marginTop: "-20px", fontSize: "14px" }}>
                  {item.variant.title}
                </p>
              </div>
              <div>
                <div>Qty:</div>
                <div>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#1E3769",
                    }}
                  >
                    <FaCircleMinus />
                  </button>
                  <span> {item.quantity} </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#1E3769",
                      marginRight: "0px"
                    }}
                  >
                    <FaCirclePlus />
                  </button>
                  {/* <button
                    onClick={() => handleRemoveItem(item.id)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#1E3769",
                      marginLeft: "0px"
                    }}
                  >
                    <FaRegTrashCan />
                  </button> */}
                </div>
              </div>
            </div>
            <div>
              <p>Price: ${parseFloat(item.variant.price.amount).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>

      <h3>Total: ${parseFloat(checkout.totalPrice.amount).toFixed(2)}</h3>
      <button onClick={handleProceedToCheckout} className="check-button">
        Proceed to Checkout
      </button>
      <button onClick={() => navigate("/")} className="shop-button">
        Continue Shopping
      </button>
    </div>
  );
}
