
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { client } from "../../api/ShopifyClient"; 
import { CartContext } from "../../context/CartContext"; 

export default function Product() {

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
        navigate("/cart");
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
    <div className="product-page">
      <button onClick={() => navigate("/")}>Back to Shop</button>
      <h2>{product.title}</h2>
      {product.images.length > 0 && (
        <img
          src={product.images[0].src}
          alt={product.title}
          style={{ maxWidth: "400px", height: "auto" }}
        />
      )}
      <p>{product.description}</p>

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
                {variant.title} - ${parseFloat(variant.price.amount).toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      ))}

      {selectedVariant && (
        <p>Price: ${parseFloat(selectedVariant.price.amount).toFixed(2)}</p>
      )}

      <button onClick={handleAddToCart} disabled={!selectedVariant}>
        Add to Cart
      </button>
    </div>
  );
}
