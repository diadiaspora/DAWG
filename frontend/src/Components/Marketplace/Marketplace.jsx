// import { useEffect, useState } from "react";
// import client from "../../Shopify/ShopifyClient";

// export default function Marketplace() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     client.product.fetchAll().then((res) => {
//       setProducts(res);
//     });
//   }, []);

//   return (
//     <div>
//       <h2>Products</h2>
//       {products.map((product) => (
//         <div key={product.id}>
//           <h3>{product.title}</h3>
//           <img src={product.images[0].src} alt={product.title} width="200" />
//           <p>{product.description}</p>
//           <p>${product.variants[0].price.amount}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
