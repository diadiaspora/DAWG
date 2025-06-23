
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
    <div style={{ margin: "42px" }}>
      <h1 style={{ fontSize: "24px" }}>MarketPlace</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link
              to={`/product/${product.id.split("/").pop()}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {product.images.length > 0 && (
                <img src={product.images[0].src} alt={product.title} />
              )}
              <div style={{ display: "flex", marginTop: "-12px", paddingLeft:"12px" }}>
                <p style={{ textDecoration: "none", fontWeight: "bold" }}>{product.title}</p>
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
                marginBottom: "60px"
         

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
