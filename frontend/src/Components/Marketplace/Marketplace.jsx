
import React from 'react';
import './Marketplace.css'; // Import the CSS file


const Marketplace = () => {
    // In a real application, you might fetch this data from an API or a data file.
    // For now, we'll hardcode it as per your request for 5 products.
    const products = [
        {
            id: 1,
            name: "Stylish Bluetooth Headphones with Noise Cancellation",
            image: "https://via.placeholder.com/200x200?text=Headphones", // Replace with actual image URL
            price: "$29.99",
            link: "YOUR_ALIEXPRESS_AFFILIATE_LINK_FOR_PRODUCT_1" // IMPORTANT: Replace with your actual affiliate link
        },
        {
            id: 2,
            name: "Portable Mini Projector for Home Cinema",
            image: "https://via.placeholder.com/200x200?text=Projector", // Replace with actual image URL
            price: "$75.50",
            link: "YOUR_ALIEXPRESS_AFFILIATE_LINK_FOR_PRODUCT_2" // IMPORTANT: Replace with your actual affiliate link
        },
        {
            id: 3,
            name: "Smart Fitness Tracker with Heart Rate Monitor",
            image: "https://via.placeholder.com/200x200?text=Fitness+Tracker", // Replace with actual image URL
            price: "$19.95",
            link: "YOUR_ALIEXPRESS_AFFILIATE_LINK_FOR_PRODUCT_3" // IMPORTANT: Replace with your actual affiliate link
        },
  
    ];

    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                    <a
                        href={product.link}
                        target="_blank" // Opens in a new tab
                        rel="noopener noreferrer" // Security best practice for target="_blank"
                        className="buy-button"
                    >
                        View on AliExpress
                    </a>
                </div>
            ))}
        </div>
    );
};

export default Marketplace;
  