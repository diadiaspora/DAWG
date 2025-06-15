// // Create a checkout session
// const checkout = await client.checkout.create();

// // Add item to cart
// const lineItemsToAdd = [
//   {
//     variantId: "gid://shopify/ProductVariant/1234567890",
//     quantity: 1,
//   },
// ];

// const updatedCheckout = await client.checkout.addLineItems(
//   checkout.id,
//   lineItemsToAdd
// );

// // Redirect to checkout page
// window.location.href = updatedCheckout.webUrl;
