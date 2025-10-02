const express = require("express");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/AuthMiddleware");
const adminMiddleware = require("../middleware/AdminMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
    const { name, removeImage} = req.body;
    const updateData = { name };

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategori bulunamadı" });

    // Yeni resim yüklendiyse
    if (req.file) {
      // Eski resmi sil
      if (category.image) {
        const oldPath = path.resolve(__dirname, "..", category.image.replace(/^\//, "")); 
        if (fs.existsSync(oldPath)) {
          fs.unlink(oldPath, (err) => {
            if (err) console.warn("Eski kategori resmi silinemedi:", err.message);
          });
        }
      }

      updateData.image = "/uploads/categories/" + req.file.filename;
    }
    else if ( removeImage === "true") {
      if (category.image) {
        const oldPath = path.join(__dirname, "..", category.image);
        fs.unlink(oldPath, (err) => {
          if (err) console.warn("Kategori resmi silinemedi:", err.message)
        });
      }
      updateData.image = null;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedCategory);
  } catch (err) {
    console.error("Kategori güncellenirken hata:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});



// Kategori sil
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Kategori bulunamadı" });
    }

    // Fotoğrafı da sil
    if (category.image) {
      const filePath = path.join(__dirname, "..", category.image); // "../uploads/categories/..."
      fs.unlink(filePath, (err) => {
        if (err) {
          console.warn("Kategori resmi silinemedi:", err.message);
        } else {
          console.log("Kategori resmi silindi:", filePath);
        }
      });
    }

    res.json({ message: "Kategori ve resmi silindi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
