const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middleware/AuthMiddleware");
const adminMiddleware = require("../middleware/AdminMiddleware");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const crypto = require("crypto");

// 📌 Upload klasörlerini oluştur
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");
const TMP_DIR = path.join(UPLOADS_DIR, "tmp");
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

// 📌 Güvenli dosya silme fonksiyonu
async function deleteFileSafe(filePath, retries = 10, delay = 100) {
  for (let i = 0; i < retries; i++) {
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
      return;
    } catch (err) {
      if (i === retries - 1) {
        console.warn("Tmp dosya silinemedi:", filePath, err.message);
      } else {
        // retry öncesi kısa bekleme
        await new Promise(r => setTimeout(r, delay));
        console.log("temp silindi");
      }
    }
  }
}

// 📌 Multer: tmp klasörüne yükleme, eşsiz dosya isimleri
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, TMP_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
    cb(null, unique + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    if (/image\/(jpeg|png)/.test(file.mimetype)) cb(null, true);
    else cb(null, false);
  },
});

// 📌 Ortak resim işleme fonksiyonu
async function processImages(files) {
  const imagesPath = [];

  for (const file of files) {
    try {
      const ext = path.extname(file.originalname).toLowerCase();
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      const outputPath = path.join(UPLOADS_DIR, filename);

      if (ext === ".jpg" || ext === ".jpeg") {
        await sharp(file.path).jpeg({ quality: 90 }).toFile(outputPath);
      } else if (ext === ".png") {
        await sharp(file.path).png({ quality: 90 }).toFile(outputPath);
      } else {
        fs.copyFileSync(file.path, outputPath);
      }

      await deleteFileSafe(file.path); // tmp dosya güvenli sil

      imagesPath.push("/uploads/" + filename);
    } catch (err) {
      console.error("📌 Dosya işleme hatası:", file.originalname, err.message);
    }
  }

  return imagesPath;
}

// 📌 Ürün listele
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .populate("category", "name");

    const total = await Product.countDocuments();

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    console.error("GET ürün listeleme hatası:", err.message);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// 📌 Tek ürün getir
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });
    res.json(product);
  } catch (err) {
    console.error("GET ürün hatası:", err.message);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// 📌 Admin: Ürün ekle
router.post("/", authMiddleware, adminMiddleware, upload.array("images", 10), async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    let imagePaths = [];

    if (req.files && req.files.length > 0) {
      imagePaths = await processImages(req.files);
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      images: imagePaths,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("POST ürün ekleme hatası:", err.message);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// 📌 Admin: Ürün güncelle
router.put("/:id", authMiddleware, adminMiddleware, upload.array("images", 10), async (req, res) => {
  try {

    console.log("🟢 PUT isteği geldi:", req.params.id);
    console.log("📦 Body:", req.body);
    console.log("🖼️ Dosyalar:", req.files);

    const { name, price, description, stock, category } = req.body;
    let deleteImages = [];

    if (req.body.deleteImages) {
      try {
        deleteImages = JSON.parse(req.body.deleteImages);
        if (!Array.isArray(deleteImages)) deleteImages = [deleteImages];
      } catch {
        deleteImages = [];
      }
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });

    // Silinecek resimleri kaldır
    if (deleteImages.length > 0) {
      product.images = product.images.filter(img => !deleteImages.includes(img));
      deleteImages.forEach(imgPath => {
        const filePath = path.join(__dirname, "..", imgPath.replace(/^\/+/, ""));
        deleteFileSafe(filePath); // async güvenli sil
      });
    }

    // Yeni resimleri işle
    let imagesPath = [];
    if (req.files && req.files.length > 0) {
      imagesPath = await processImages(req.files);
    }
    product.images = [...product.images, ...imagesPath];

    // Diğer alanları güncelle
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = Number(price);
    if (stock !== undefined) product.stock = Number(stock);
    if (description !== undefined) product.description = description;
    if (category !== undefined && category !== "") product.category = category;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("PUT ürün güncelleme hatası:", err.message, err.stack);
    res.status(500).json({ message: "Sunucu hatası" });
  }
  

});

// 📌 Admin: Ürün sil
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });
    res.json({ message: "Ürün silindi" });
  } catch (err) {
    console.error("DELETE ürün hatası:", err.message);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = router;
