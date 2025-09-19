const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

// Kategori listele
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Kategori ekle
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Bu kategori zaten var" });

    const category = new Category({ name });
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
