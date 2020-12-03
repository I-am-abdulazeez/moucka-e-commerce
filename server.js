const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("colors");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/.env" });

connectDB();

// Routes
const orderings = require("./routes/orders");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/v1/orderings", orderings);

if (["production"].includes(process.env.NODE_ENV)) {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT:${PORT}`.yellow.bold
  )
);
