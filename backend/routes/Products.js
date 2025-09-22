const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/AuthMiddleware");
const adminMiddleware = require("../middleware/AdminMiddleware");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });




const router = express.Router();

// Ürün listele (herkes görebilir)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tek ürün getir (herkes görebilir)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin işlemleri (ekle, güncelle, sil)
router.post("/", authMiddleware, adminMiddleware, upload.array("images", 5), async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // resimlerin path'lerini al
    const images = req.files.map(file => "/uploads/" + file.filename);

    const product = new Product({ 
      name, description, price, stock, category, images 
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, price, stock, image, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, image, category },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });
    res.json({ message: "Ürün silindi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
