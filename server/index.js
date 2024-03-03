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

// const puppeteer = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto("https://www.igv.com/fr", { waitUntil: "networkidle2" });
//   await page.setViewport({ width: 1080, height: 1024 });

//   let firstResult = await page.evaluate(() => {
//     let items = document.querySelectorAll(".product-item");
//     let data = [];

//     for (let item of items) {
//       let singleItems = Array.from(
//         item.querySelectorAll(".gamesort-link-sub-name a")
//       );
//       data.push({
//         id: 10,
//         title: item?.querySelector(".gamesort-link-name").innerText,

//         items: singleItems.map((product, index) => {
//           return { id: index, title: product.innerText, link: product.href };
//         }),
//       });
//     }
//     return data;
//   });

//   console.log(JSON.parse(JSON.stringify(firstResult)));

//   await page.close();
// })();

app.listen(process.env.PORT || 5000, () =>
  console.log(`server listening on port ${process.env.PORT}`)
);
