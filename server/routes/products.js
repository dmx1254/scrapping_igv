const express = require("express");

const productController = require("../controllers/product.controller");

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getAspecificProduct);
module.exports = router;
