const express = require("express");
require("dotenv").config();

const cors = require("cors");

const productRoutes = require("./routes/products");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
app.use("/api/v2", productRoutes);


app.listen(process.env.PORT || 5010, () =>
  console.log(`server listening on port ${process.env.PORT}`)
);
