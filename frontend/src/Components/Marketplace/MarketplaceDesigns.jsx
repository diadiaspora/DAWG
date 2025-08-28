import { getProducts } from "../../api/ShopifyClient";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Marketplace.css";

export default function MarketplaceDesigns() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();

        const visualArtProducts = allProducts.filter((product) => {
          const pt = product.productType?.trim().toLowerCase();
          return pt === "home decor";
        });

        setProducts(visualArtProducts);
        if (visualArtProducts.length === 0) {
          console.warn("No products matched 'Home Decor' category.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load visual artwork.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const header = (
    <div className="marketplace-header">
      <h1>Visual Artwork</h1>
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
          onClick={() => console.log("Current products:", products)}
        >
          Back to Marketplace (Click to log products)
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
          {Array.from({ length: 6 }).map((_, i) => (
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
        <p>No visual artwork found. Check console logs for product details.</p>
      </div>
    );

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
                  width={240}
                  height={240}
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
