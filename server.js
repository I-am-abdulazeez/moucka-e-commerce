const express = require("express");
// const dotenv = require("dotenv");
// const path = require("path");
const cors = require("cors");
require("colors");
const connectDB = require("./config/db");
if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "./config/.env" });

connectDB();

// Routes
const orderings = require("./routes/orders");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.use("/api/v1/orderings", orderings);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// }

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT:${PORT}`.yellow.bold
  )
);
