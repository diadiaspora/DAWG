const path = require("path"); // Built into Node
const express = require("express");
const logger = require("morgan");
const app = express();

require("dotenv").config();


require("./db");

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(express.json());

app.use(require("./middleware/checkToken"));

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

app.use("/api/plans", require("./routes/plans"));
app.use("/api/profiles", require("./routes/profiles"));
app.use("/api/blogs", require("./routes/blogs"));
// Use a "catch-all" route to deliver the frontend's production index.html
app.get("/*splat", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});
