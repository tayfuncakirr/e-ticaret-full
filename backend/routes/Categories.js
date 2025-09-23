const express = require("express");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/AuthMiddleware");
const adminMiddleware = require("../middleware/AdminMiddleware");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer storage ayarları
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories/"); // kategori görselleri ayrı klasörde olsun
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//Tüm kategorileri listele
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Kategori ekle (resim opsiyonel)
router.post("/", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      image: req.file ? "/uploads/categories/" + req.file.filename : null,
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Kategori güncelle (resim opsiyonel)
router.put("/:id", authMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    const updateData = { name };

    if (req.file) {
      updateData.image = "/uploads/categories/" + req.file.filename;
    }

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!category) return res.status(404).json({ message: "Kategori bulunamadı" });

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Kategori sil
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategori bulunamadı" });

    res.json({ message: "Kategori silindi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
