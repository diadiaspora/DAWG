// shopifyClient.js
import Client from "shopify-buy";

const shopifyDomain = import.meta.env.VITE_SHOPIFY_DOMAIN;
const accessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;


console.log("DEBUG: VITE_SHOPIFY_DOMAIN =", shopifyDomain);
console.log("DEBUG: VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN =", accessToken);



export const client = Client.buildClient({
  
  domain: shopifyDomain,
  storefrontAccessToken: accessToken,
});

export async function getProducts() {
  try {
    const products = await client.product.fetchAll();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
