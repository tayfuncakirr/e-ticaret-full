const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Ürün listele (kategori bilgisiyle birlikte)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ürün ekle
router.post("/", async (req, res) => {
  try {
    const { name, description, price, stock, image, category } = req.body;

    const product = new Product({ name, description, price, stock, image, category });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
