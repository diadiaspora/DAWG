
import React from 'react';
import './Marketplace.css'; // Import the CSS file


const Marketplace = () => {
    // In a real application, you might fetch this data from an API or a data file.
    // For now, we'll hardcode it as per your request for 5 products.
    const products = [
      {
        id: 1,
        name: "Jansport Flex",
        image: "./bag.png", // Replace with actual image URL
        price: "$29.99",
        link: "YOUR_ALIEXPRESS_AFFILIATE_LINK_FOR_PRODUCT_1", // IMPORTANT: Replace with your actual affiliate link
      },
      {
        id: 2,
        name: "PortaTote",
        image: "./bagg.png", // Replace with actual image URL
        price: "$75.50",
        link: "YOUR_ALIEXPRESS_AFFILIATE_LINK_FOR_PRODUCT_2", // IMPORTANT: Replace with your actual affiliate link
      },
      {
        id: 3,
        name: "Pet Luggage 3000",
        image: "./baggg.png", // Replace with actual image URL
        price: "$19.95",
        link: "YOUR_ALIEXPRESS_AFFILIATE_LINK_FOR_PRODUCT_3", // IMPORTANT: Replace with your actual affiliate link
      },
    ];

    return (
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2 style={{ textAlign: "left" }}>{product.name}</h2>
            <p style={{ textAlign: "left" }}>{product.price}</p>
            <a
              href={product.link}
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer" // Security best practice for target="_blank"
              className="buy-button"
              style={{ width: "150px", fontSize: "14px" }}
            >
              View Product
            </a>
          </div>
        ))}
      </div>
    );
};

export default Marketplace;
  