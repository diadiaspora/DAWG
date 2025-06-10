// server.js
const path = require("path"); // Built into Node
const express = require("express");
const logger = require("morgan");
const app = express();

// Process the secrets/config vars in .env
require("dotenv").config();

// Connect to the database
require("./db"); // Ensure this path is correct for your database connection setup

app.use(logger("dev"));
// Serve static assets from the frontend's built code folder (dist)
app.use(express.static(path.join(__dirname, "../frontend/dist")));
// Note that express.urlencoded middleware is not needed
// because forms are not submitted!
app.use(express.json()); // Middleware to parse JSON request bodies

// Middleware to check the request's headers for a JWT and
// verify that it's a valid. If so, it will assign the
// user object in the JWT's payload to req.user
app.use(require("./middleware/checkToken")); // Ensure this path is correct for your middleware

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

// ADD THIS LINE FOR YOUR PLAN API ROUTES!
// This mounts the router from './routes/api/planRoutes.js' at the /api/plan path
// Make sure the file './routes/api/planRoutes.js' exists and contains your plan controller logic
app.use("/api/plan", require("./routes/api/planRoutes")); // <--- NEW LINE!

// Use a "catch-all" route to deliver the frontend's production index.html
// This should always come AFTER all your specific API routes
app.get("/*splat", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});
