// src/context/CartContext.js
import React, { createContext, useState, useEffect } from "react";
import { client } from "../api/ShopifyClient";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        setLoading(true);
        const storedCheckoutId = localStorage.getItem("shopify_checkout_id");

        if (storedCheckoutId) {
          
          const fetchedCheckout = await client.checkout.fetch(storedCheckoutId);
          if (
            fetchedCheckout.completedAt ||
            new Date(fetchedCheckout.expiresAt) < new Date()
          ) {
        
            const newCheckout = await client.checkout.create();
            localStorage.setItem("shopify_checkout_id", newCheckout.id);
            setCheckout(newCheckout);
          } else {
            
            setCheckout(fetchedCheckout);
          }
        } else {
         
          const newCheckout = await client.checkout.create();
          localStorage.setItem("shopify_checkout_id", newCheckout.id);
          setCheckout(newCheckout);
        }
      } catch (error) {
        console.error("Error initializing checkout:", error);
     
        const newCheckout = await client.checkout.create();
        localStorage.setItem("shopify_checkout_id", newCheckout.id);
        setCheckout(newCheckout);
      } finally {
        setLoading(false);
      }
    };

    initializeCheckout();
  }, []);


  const addVariantToCart = async (variantId, quantity) => {
    if (!checkout) {
      console.error("Checkout not initialized yet.");
      return;
    }

    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    try {
      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItemsToAdd
      );
      setCheckout(newCheckout);
      return newCheckout; 
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error; 
    }
  };


  const updateLineItemQuantity = async (lineItemId, quantity) => {
    if (!checkout) {
      console.error("Checkout not initialized.");
      return;
    }
    const lineItemsToUpdate = [
      { id: lineItemId, quantity: parseInt(quantity, 10) },
    ];
    try {
      const newCheckout = await client.checkout.updateLineItems(
        checkout.id,
        lineItemsToUpdate
      );
      setCheckout(newCheckout);
      return newCheckout;
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  };


  const removeLineItem = async (lineItemIdsToRemove) => {
    if (!checkout) {
      console.error("Checkout not initialized.");
      return;
    }
    try {
      const newCheckout = await client.checkout.removeLineItems(
        checkout.id,
        lineItemIdsToRemove
      );
      setCheckout(newCheckout);
      return newCheckout;
    } catch (error) {
      console.error("Error removing item:", error);
      throw error;
    }
  };

  const cartContextValue = {
    checkout,
    loading,
    addVariantToCart,
    updateLineItemQuantity,
    removeLineItem,
   
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
