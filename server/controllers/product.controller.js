const puppeteer = require("puppeteer");

module.exports.getAllProducts = async (req, res) => {
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://www.igv.com/fr", { waitUntil: "networkidle2" });
    await page.setViewport({ width: 1080, height: 1024 });

    let firstResult = await page.evaluate(() => {
      let items = document.querySelectorAll(".product-item");
      let data = [];

      for (let item of items) {
        const myGeneratedId = () => {
          let chaine =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          let uuid = "";
          for (let i = 0; i < chaine.length / 2; i++) {
            let randomValue = Math.floor(Math.random() * chaine.length);
            uuid += chaine[randomValue];
          }
          return uuid;
        };
        let singleItems = Array.from(
          item.querySelectorAll(".gamesort-link-sub-name a")
        );
        data.push({
          id: myGeneratedId(),
          title: item?.querySelector(".gamesort-link-name").innerText,

          items: singleItems.map((product, index) => {
            return {
              id: myGeneratedId(),
              title: product.innerText,
              link: product.href,
            };
          }),
        });
      }
      return data;
    });

    res.status(200).json(firstResult);

    await page.close();
  })();
};

module.exports.getAspecificProduct = async (req, res) => {
  const { id } = req.params;
  // res.status(200).json({ url: url });

  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://www.igv.com/fr/xbox-membership/items", {
      waitUntil: "networkidle2",
    });
    await page.setViewport({ width: 1080, height: 1024 });

    let result = await page.evaluate(() => {
      let allItems = document.querySelectorAll(
        ".product-card-box .product-card"
      );
      let data = [];

      for (let item of allItems) {
        const myGeneratedId = () => {
          let chaine =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          let uuid = "";
          for (let i = 0; i < chaine.length / 2; i++) {
            let randomValue = Math.floor(Math.random() * chaine.length);
            uuid += chaine[randomValue];
          }
          return uuid;
        };
        data.push({
          id: myGeneratedId(),
          singleLinkPage: item.querySelector(".product-img-box a").href,
          title: item.querySelector(".product-name")?.innerText,
          price: item.querySelector(".price-wrapper .price .price-num")
            ?.innerText,
          imageUrl: item.querySelector(".product-img-box a img")?.src,
          // price: item.querySelector(".price-wrapper .price")?.innerText,
          currency: item.querySelector(".price-wrapper .currency")?.innerText,
          warranty: item.querySelector(
            ".price-wrapper .product-tag-box .tag-item"
          )?.innerText,
          listingTag: Array.from(
            item.querySelectorAll(".price-wrapper .product-tag-box .tag-item")
          ).map((item) => item.innerText),
        });
      }
      return data;
    });

    res.status(200).json(result);

    await page.close();
  })();
};
