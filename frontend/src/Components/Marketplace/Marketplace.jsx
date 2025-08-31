import { getProducts } from "../../api/ShopifyClient";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUncategorizedProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getProducts();

  
        const uncategorizedProducts = fetchedProducts.filter((product) => {
          const pt = product.productType;
          return !pt || pt.trim() === "";
        });

        setProducts(uncategorizedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUncategorizedProducts();
  }, []);

  const header = (
    <div className="marketplace-header">
      <h1>Everything You Need</h1>
      <Link to="/marketplace">
        <button
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderWidth: "1px",
            backgroundColor: hover ? "#4AA692" : "#ffffff",
            width: "240px",
            height: "44px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
            fontFamily: "Roboto",
            borderColor: hover ? "#4AA692" : "#1E3769",
            color: hover ? "#1E3769" : "#1E3769",
            borderRadius: "7px",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Marketplace
        </button>
      </Link>
    </div>
  );

  if (error)
    return (
      <div className="marketplace-wrapper">
        {header}
        <p className="error">{error}</p>
      </div>
    );

  if (loading)
    return (
      <div className="marketplace-wrapper">
        {header}
        <div className="product-scroll-container">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="product-card skeleton">
              <div className="skeleton-img" />
              <div className="skeleton-line short" />
              <div className="skeleton-line long" />
              <div className="skeleton-button" />
            </div>
          ))}
        </div>
      </div>
    );

  if (products.length === 0)
    return (
      <div className="marketplace-wrapper">
        {header}
        <p>No uncategorized products found.</p>
      </div>
    );
  
    console.log("isMobile:", isMobile);

  return (
    <div className="marketplace-wrapper">
      {header}

      <div className="product-scroll-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link
              to={`/product/${product.id.split("/").pop()}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {product.images.length > 0 && (
                <img
                  src={product.images[0].src}
                  alt={product.title}
                  width={isMobile ? 160 : 240}
                  height={isMobile ? 160 : 240}
                  style={{
                    objectFit: "cover",
                    display: "block",
                    borderRadius: 8,
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  marginTop: "-12px",
                  paddingLeft: "12px",
                }}
              >
                <p style={{ fontWeight: "bold" }}>{product.title}</p>
                {product.variants.length > 0 && (
                  <p style={{ marginLeft: "50px", marginTop: "20px" }}>
                    ${parseFloat(product.variants[0].price.amount).toFixed(2)}
                  </p>
                )}
              </div>
            </Link>

            <p
className="product-description"
            >
              {product.description}
            </p>

            <Link
              to={`/product/${product.id.split("/").pop()}`}
              className="product-btn"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
