import { getProducts } from "../../api/ShopifyClient";
import { useState, useEffect } from "react";

export default function Marketplace() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            {/* Check if product has images and display the first one */}
            {product.images.length > 0 && (
              <img
                src={product.images[0].src} // Access the source URL of the first image
                alt={product.title} // Use product title as alt text for accessibility
                style={{ maxWidth: "200px", height: "auto" }} // Optional: Add some basic styling
              />
            )}
            {/* <p>{product.description}</p> */}
            {/* You can also display product price, options, etc. here if needed */}
            {product.variants.length > 0 && (
              <p>
                Price: $
                {parseFloat(product.variants[0].price.amount).toFixed(2)}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
