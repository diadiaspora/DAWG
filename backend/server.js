const path = require("path");
const express = require("express");
const logger = require("morgan");
// ADD THESE NEW REQUIRES:
const axios = require("axios");
const crypto = require("crypto");
const cors = require("cors"); 

const app = express();

require("dotenv").config(); 

require("./db");

app.use(logger("dev"));

app.use(cors()); 

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(express.json());

app.use(require("./middleware/checkToken")); 


const ALIEXPRESS_APP_KEY = process.env.ALIEXPRESS_APP_KEY;
const ALIEXPRESS_APP_SECRET = process.env.ALIEXPRESS_APP_SECRET;
const ALIEXPRESS_API_GATEWAY = process.env.ALIEXPRESS_API_GATEWAY;
const generateAliExpressSignature = (params, apiMethod) => {
  const sortedKeys = Object.keys(params).sort();
  let signString = apiMethod; 

  for (const key of sortedKeys) {
    signString += `${key}${String(params[key])}`;
  }

  signString = `${ALIEXPRESS_APP_SECRET}${signString}${ALIEXPRESS_APP_SECRET}`;

  const hmac = crypto.createHmac("sha256", ALIEXPRESS_APP_SECRET);
  hmac.update(signString, "utf8");
  return hmac.digest("hex").toUpperCase();
};

// API Routes (Your Existing Routes)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

app.use("/api/plan", require("./routes/api/planRoutes"));


app.get("/api/aliexpress/products/search", async (req, res) => {
  const {
    keyword,
    page = 1,
    pageSize = 20,
    sort = "",
    minPrice = "",
    maxPrice = "",
  } = req.query;
  const apiMethod = "aliexpress.ds.product.search"; 

  if (!keyword) {
    return res
      .status(400)
      .json({ message: "Keyword is required for product search." });
  }

  const timestamp = Date.now();
  const commonParams = {
    app_key: ALIEXPRESS_APP_KEY,
    timestamp: timestamp,
    sign_method: "sha256",
    format: "json",
    v: "2.0",
  };

  const specificParams = {
    keywords: keyword,
    page_no: page,
    page_size: pageSize,
    target_currency: "USD",
    target_language: "en",

  };

  const allParamsForSigning = {};
  for (const key in { ...commonParams, ...specificParams }) {
    if (
      { ...commonParams, ...specificParams }[key] !== "" &&
      { ...commonParams, ...specificParams }[key] !== undefined
    ) {
      allParamsForSigning[key] = { ...commonParams, ...specificParams }[key];
    }
  }

  const requestParams = {
    ...allParamsForSigning,
    sign: generateAliExpressSignature(allParamsForSigning, apiMethod),
    method: apiMethod,
  };

  try {
    const response = await axios.get(ALIEXPRESS_API_GATEWAY, {
      params: requestParams,
    });

    const result = response.data?.aliexpress_ds_product_search_response?.result;

    if (result && result.products) {
      res.json({
        products: result.products,
        total: result.total_products,
      });
    } else {
      console.error(
        "No search results or unexpected API response:",
        response.data
      );
      res
        .status(404)
        .json({
          message: "No products found or unexpected API response",
          details: response.data,
        });
    }
  } catch (error) {
    console.error(
      "Error searching products from AliExpress:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({
        message: "Failed to search products",
        error: error.response ? error.response.data : error.message,
      });
  }
});

app.get("/api/aliexpress/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const apiMethod = "aliexpress.ds.product.get"; 

  const timestamp = Date.now();
  const commonParams = {
    app_key: ALIEXPRESS_APP_KEY,
    timestamp: timestamp,
    sign_method: "sha256",
    format: "json",
    v: "2.0",
  };

  const specificParams = {
    product_id: productId,
    target_currency: "USD",
    target_language: "en",
    // ship_to_country: 'US',
  };

  const allParamsForSigning = {};
  for (const key in { ...commonParams, ...specificParams }) {
    if (
      { ...commonParams, ...specificParams }[key] !== "" &&
      { ...commonParams, ...specificParams }[key] !== undefined
    ) {
      allParamsForSigning[key] = { ...commonParams, ...specificParams }[key];
    }
  }

  const requestParams = {
    ...allParamsForSigning,
    sign: generateAliExpressSignature(allParamsForSigning, apiMethod),
    method: apiMethod,
  };

  try {
    const response = await axios.get(ALIEXPRESS_API_GATEWAY, {
      params: requestParams,
    });

    const productData =
      response.data?.aliexpress_ds_product_get_response?.result;

    if (productData) {
      res.json(productData);
    } else {
      console.error(
        "No product data found in AliExpress response:",
        response.data
      );
      res
        .status(404)
        .json({
          message: "Product not found or API error",
          details: response.data,
        });
    }
  } catch (error) {
    console.error(
      "Error fetching product from AliExpress:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({
        message: "Failed to fetch product data",
        error: error.response ? error.response.data : error.message,
      });
  }
});


app.post("/api/aliexpress/orders", async (req, res) => {
 
  const apiMethod = "aliexpress.ds.trade.order.create"; 
  const timestamp = Date.now();
  const orderData = req.body; 

  if (!orderData || !orderData.products || !orderData.customerInfo) {
    return res.status(400).json({ message: "Invalid order data provided." });
  }

  const commonParams = {
    app_key: ALIEXPRESS_APP_KEY,
    timestamp: timestamp,
    sign_method: "sha256",
    format: "json",
    v: "2.0",
  };

  // Construct the 'param_json' payload precisely as required by AliExpress API.
  // THIS IS CRITICAL. Consult AliExpress docs for the `aliexpress.ds.trade.order.create` method.
  const param_json_payload = {
    // Example structure - YOU MUST VERIFY THIS PRECISELY WITH ALIEXPRESS DOCS!
    order_list: orderData.products.map((p) => ({
      product_id: p.productId,
      sku_id: p.skuId, // Essential for product variations
      product_count: p.quantity,
    })),
    logistics_info: {
      full_name: orderData.customerInfo.fullName,
      address: orderData.customerInfo.address,
      city: orderData.customerInfo.city,
      province: orderData.customerInfo.province,
      zip: orderData.customerInfo.zip,
      country: orderData.customerInfo.country, // e.g., "US"
      phone_number: orderData.customerInfo.phoneNumber,
      
      logistics_service_id:
        orderData.customerInfo.logisticsServiceId ||
        "YOUR_DEFAULT_LOGISTICS_SERVICE_ID",
    },
    
  };


  const allParamsForSigning = {
    ...commonParams,
    param_json: JSON.stringify(param_json_payload),
  };

  const requestParams = {
    ...allParamsForSigning,
    sign: generateAliExpressSignature(allParamsForSigning, apiMethod),
    method: apiMethod,
  };

  try {
    
    const response = await axios.post(ALIEXPRESS_API_GATEWAY, null, {
      params: requestParams,
    });

    const orderConfirmation =
      response.data?.aliexpress_ds_trade_order_create_response?.result;

    if (orderConfirmation && orderConfirmation.is_success) {
      res
        .status(201)
        .json({ message: "Order placed successfully!", orderConfirmation });
    } else {
      console.error("AliExpress order placement failed:", response.data);
      res
        .status(500)
        .json({
          message: "Failed to place order on AliExpress",
          details: response.data,
        });
    }
  } catch (error) {
    console.error(
      "Error placing order on AliExpress:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({
        message: "Failed to place order",
        error: error.response ? error.response.data : error.message,
      });
  }
});

app.get("/*splat", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});
