// src/components/CartPage.jsx
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router";

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
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      <ul>
        {checkout.lineItems.map((item) => (
          <li key={item.id}>
            <img
              src={item.variant.image?.src}
              alt={item.title}
              style={{ width: "50px" }}
            />
            <div>
              <h4>{item.title}</h4>
              <p>Variant: {item.variant.title}</p>
              <p>Price: ${parseFloat(item.variant.price.amount).toFixed(2)}</p>
              <div>
                Quantity:
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#1E3769",
                    color: "white",
                    border: "none",
                    borderRadius: "50px",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <span> {item.quantity} </span>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#1E3769",
                    color: "white",
                    border: "none",
                    borderRadius: "50px",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#1E3769",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ${parseFloat(checkout.totalPrice.amount).toFixed(2)}</h3>
      <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
}
