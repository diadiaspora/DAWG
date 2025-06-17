// // src/components/ProductPage.jsx
// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // For getting productId from URL
// import { client } from "../api/ShopifyClient"; // Import your client directly
// import { CartContext } from "../context/CartContext"; // Import your CartContext

// export default function ProductPage() {
//   const { productId } = useParams(); // Get product ID from the URL
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null); // For variant selection
//   const { addVariantToCart } = useContext(CartContext); // Get add to cart function from context
//   const navigate = useNavigate(); // For programmatic navigation

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         // Use client.product.fetch to get a single product by ID
//         const fetchedProduct = await client.product.fetch(productId);
//         setProduct(fetchedProduct);
//         // Automatically select the first variant if available
//         if (fetchedProduct && fetchedProduct.variants.length > 0) {
//           setSelectedVariant(fetchedProduct.variants[0]);
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         setError("Failed to load product details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (productId) {
//       fetchProduct();
//     }
//   }, [productId]); // Re-run effect if productId changes

//   const handleVariantChange = (e) => {
//     const variantId = e.target.value;
//     const variant = product.variants.find((v) => v.id === variantId);
//     setSelectedVariant(variant);
//   };

//   const handleAddToCart = async () => {
//     if (selectedVariant) {
//       try {
//         await addVariantToCart(selectedVariant.id, 1); // Add 1 quantity of selected variant
//         alert("Product added to cart!"); // Simple confirmation
//         navigate("/cart"); // Optional: Navigate to a cart page after adding
//       } catch (err) {
//         console.error("Error adding to cart:", err);
//         alert("Failed to add product to cart.");
//       }
//     } else {
//       alert("Please select a product variant.");
//     }
//   };

//   if (loading) return <p>Loading product...</p>;
//   if (error) return <p className="error">{error}</p>;
//   if (!product) return <p>Product not found.</p>;

//   return (
//     <div className="product-page">
//       <button onClick={() => navigate("/")}>Back to Shop</button>
//       <h2>{product.title}</h2>
//       {product.images.length > 0 && (
//         <img
//           src={product.images[0].src}
//           alt={product.title}
//           style={{ maxWidth: "400px", height: "auto" }}
//         />
//       )}
//       <p>{product.description}</p>

//       {/* Display product options (e.g., size, color) */}
//       {product.options.map((option) => (
//         <div key={option.id}>
//           <label htmlFor={option.name}>{option.name}:</label>
//           <select
//             id={option.name}
//             onChange={handleVariantChange}
//             value={selectedVariant?.id || ""}
//           >
//             {/* Map over variants that match this option */}
//             {product.variants.map((variant) => {
//               // This is a simplified approach, more complex option handling
//               // would involve matching options to specific variants
//               if (
//                 variant.selectedOptions.some(
//                   (opt) => opt.value === option.values[0].value
//                 )
//               ) {
//                 return (
//                   <option key={variant.id} value={variant.id}>
//                     {variant.title} - $
//                     {parseFloat(variant.price.amount).toFixed(2)}
//                   </option>
//                 );
//               }
//               return null; // Don't render option if it doesn't match a variant for simplicity
//             })}
//             {/* A more robust solution would dynamically generate options based on product.options */}
//             {/* and then find the corresponding variant ID based on selected options */}
//             {/* For now, we're just listing all variants as options for simplicity,
//                  you'd usually combine options to form specific variant IDs. */}
//             {product.variants.map((variant) => (
//               <option key={variant.id} value={variant.id}>
//                 {variant.title} - ${parseFloat(variant.price.amount).toFixed(2)}
//               </option>
//             ))}
//           </select>
//         </div>
//       ))}
//       {/* Simplified variant selection: show current price of selected variant */}
//       {selectedVariant && (
//         <p>Price: ${parseFloat(selectedVariant.price.amount).toFixed(2)}</p>
//       )}

//       <button onClick={handleAddToCart} disabled={!selectedVariant}>
//         Add to Cart
//       </button>

//       {/* You can add more details like variant specific images, etc. */}
//     </div>
//   );
// }
