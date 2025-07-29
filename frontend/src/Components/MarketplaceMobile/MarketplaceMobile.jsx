import { getProducts } from "../../api/ShopifyClient";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./MarketplaceMobile.css";

export default function MarketplaceMobile() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(false);

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
          <button
            className="marketplace-button"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              borderColor: hover ? "#4AA692" : "#1E3769",
              color: hover ? "#347567" : "#1E3769",
            }}
          >
            Marketplace
          </button>
        </Link>
      </div>

      <div className="mobile-scroll-container">
        {products.map((product) => (
          <div key={product.id} className="mobile-product-card">
            <Link
              to={`/product/${product.id.split("/").pop()}`}
              className="mobile-product-link"
            >
              {product.images.length > 0 && (
                <img
                  src={product.images[0].src}
                  alt={product.title}
                  className="mobile-product-image"
                />
              )}
              <div className="mobile-product-info">
                <p className="mobile-product-title">{product.title}</p>
                {product.variants.length > 0 && (
                  <p className="mobile-product-price">
                    ${parseFloat(product.variants[0].price.amount).toFixed(2)}
                  </p>
                )}
              </div>
              <p
                style={{
                  marginTop: "-12px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "200px",
                  paddingLeft: "12px",
                  marginBottom: "60px",
                }}
              >
                {product.description}
              </p>
              <div className="mobile-product-button-wrapper">
                <span className="mobile-product-button">View Details</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
