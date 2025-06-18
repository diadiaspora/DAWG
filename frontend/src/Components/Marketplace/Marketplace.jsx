
import { getProducts } from "../../api/ShopifyClient";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Marketplace.css";

export default function Marketplace() {
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
    <div style={{margin: "42px"}}>
      <h1>Shop</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {/* --- IMPORTANT CHANGE HERE --- */}
            {/* Extract only the numeric ID from the GID for the URL */}
            <Link to={`/product/${product.id.split("/").pop()}`}>
              {product.images.length > 0 && (
                <img
                  src={product.images[0].src}
                  alt={product.title}
                  className="product-image"
                />
              )}
              <h3>{product.title}</h3>
              {product.variants.length > 0 && (
                <p className="product-price">
                  ${parseFloat(product.variants[0].price.amount).toFixed(2)}
                </p>
              )}
            </Link>
            {/* --- IMPORTANT CHANGE HERE AS WELL (for the second link) --- */}
            <Link
              to={`/product/${product.id.split("/").pop()}`}
              className="view-details-button"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
