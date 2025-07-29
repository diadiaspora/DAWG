import { getProducts } from "../../api/ShopifyClient";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./Marketplace.css";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize(); // Set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="marketplace-wrapper">
      <div className="marketplace-header">
        <h1>Everything You Need</h1>
        <Link to="/marketplace">
          <button
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              borderWidth: "1px",
              backgroundColor: "#ffffff",
              width: "240px",
              height: "44px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px",
              fontFamily: "Roboto",
              borderColor: hover ? "#4AA692" : "#1E3769",
              color: hover ? "#347567" : "#1E3769",
              borderRadius: "7px",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Marketplace
          </button>
        </Link>
      </div>

      <div className="product-scroll-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link
              to={`/product/${product.id.split("/").pop()}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {product.images.length > 0 && (
                <img src={product.images[0].src} alt={product.title} />
              )}
              <div
                style={{
                  display: "flex",
                  marginTop: "-12px",
                  paddingLeft: "12px",
                }}
              >
                <p style={{ textDecoration: "none", fontWeight: "bold" }}>
                  {product.title}
                </p>
                {product.variants.length > 0 && (
                  <p style={{ marginLeft: "50px", marginTop: "20px" }}>
                    ${parseFloat(product.variants[0].price.amount).toFixed(2)}
                  </p>
                )}
              </div>
            </Link>
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
            <Link
              to={`/product/${product.id.split("/").pop()}`}
              style={{
                marginLeft: "110px",
                textDecoration: "none",
                padding: "12px",
                height: "44px",
                backgroundColor: "#1E3769",
                borderWidth: "2px",
                borderColor: "#1E3769",
                borderRadius: "7px",
                color: "#ffffff",
                fontSize: "16px",
                fontFamily: "Roboto",
                fontWeight: "500",
              }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
