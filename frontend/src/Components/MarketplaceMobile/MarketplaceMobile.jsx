import { getProducts } from "../../api/ShopifyClient";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MarketplaceMobile.css";

export default function MarketplaceMobile() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching all products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">{error}</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="marketplace-mobile-wrapper">
      <div className="marketplace-mobile-header">
        <h2>Everything You Need</h2>
        <Link to="/marketplace">
          <button className="marketplace-button">Marketplace</button>
        </Link>
      </div>

      <div className="product-grid-mobile">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id.split("/").pop()}`}
            className="product-card-mobile"
          >
            {product.images.length > 0 && (
              <img
                src={product.images[0].src}
                alt={product.title}
                className="product-image"
              />
            )}
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              {product.variants.length > 0 && (
                <p className="product-price">
                  ${parseFloat(product.variants[0].price.amount).toFixed(2)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
