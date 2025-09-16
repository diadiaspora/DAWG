
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { client } from "../../api/ShopifyClient"; 
import { CartContext } from "../../context/CartContext"; 
import Cart from "../../Components/Cart/Cart";
import MarketplaceWrapper from "../../Components/MarketplaceWrapper/MarketplaceWrapper";
import "./Product.css";

export default function ProductMobile() {

  const { productId: rawProductIdFromUrl } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addVariantToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null); 

        let shopifyProductIdForFetch = rawProductIdFromUrl;

     
        if (
          rawProductIdFromUrl &&
          !rawProductIdFromUrl.startsWith("gid://shopify/Product/")
        ) {
          shopifyProductIdForFetch = `gid://shopify/Product/${rawProductIdFromUrl}`;
          console.log(
            "Reconstructed Shopify GID for fetch:",
            shopifyProductIdForFetch
          ); 
        } else {

          console.log(
            "Product ID from URL is already a GID or unexpected format:",
            shopifyProductIdForFetch
          ); 
        }

        if (!shopifyProductIdForFetch) {
          setError("No valid product ID to fetch from URL.");
          setLoading(false);
          return;
        }

        const fetchedProduct = await client.product.fetch(
          shopifyProductIdForFetch
        );

        if (!fetchedProduct) {
          setError(
            "Product not found with the provided ID. It might be unpublished or incorrect."
          );
          setLoading(false);
          return;
        }

        setProduct(fetchedProduct);

        if (fetchedProduct.variants.length > 0) {
          setSelectedVariant(fetchedProduct.variants[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
       
        setError(
          "Failed to load product details. Please ensure your Shopify API keys are correct and the product exists."
        );
      } finally {
        setLoading(false);
      }
    };

    if (rawProductIdFromUrl) {

      fetchProduct();
    }
  }, [rawProductIdFromUrl]); 


  const handleVariantChange = (e) => {
    const variantId = e.target.value;
    const variant = product.variants.find((v) => v.id === variantId);
    setSelectedVariant(variant);
  };

  const handleAddToCart = async () => {
    if (selectedVariant) {
      try {
        await addVariantToCart(selectedVariant.id, 1);
        alert("Product added to cart!");
        // navigate("/cart");
      } catch (err) {
        console.error("Error adding to cart:", err);
        alert("Failed to add product to cart.");
      }
    } else {
      alert("Please select a product variant.");
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Product not found.</p>; 

  return (
    <>
      {/* <div style={{ backgroundColor: "#1e3769", width: "1012px", color: "#ffffff", borderRadius: "7px", marginTop: "24px", height: "42px", display:"flex", alignItems: "center", justifyContent: "center"}}>
        <p> Dawg Members Get 10% off every purchase</p>
      </div> */}
      <div className="product-page">
        <div className="mobile">
          <h2>{product.title}</h2>
          <div className="product">
            {product.images.length > 0 &&
              product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={`${product.title} - ${index + 1}`}
                  style={{
                    borderRadius: "7px",
                  }}
                />
              ))}
          </div>
          {selectedVariant && (
            <p>Price: ${parseFloat(selectedVariant.price.amount).toFixed(2)}</p>
          )}
          <div>
            {product.options.map((option) => (
              <div key={option.id}>
                <label htmlFor={option.name}>{option.name}:</label>
                <select
                  id={option.name}
                  onChange={handleVariantChange}
                  value={selectedVariant?.id || ""}
                >
                  {product.variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.title} - $
                      {parseFloat(variant.price.amount).toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <p>{product.description}</p>

            <div>
              <p>Continue Shopping</p> <MarketplaceWrapper />
            </div>

            <div className="add-to-cart-fixed">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className="add-button-mobile"
              >
                Add to Cart
              </button>
              <Link to={`/cart`}>
                <button className="cart-button-mobile"> View Cart</button>
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="rights" style={{ width: "310px", marginLeft: "42px" }}>
          <div className="your-cart">
            <Cart />
          </div>
        </div> */}
      </div>
    </>
  );
}
