const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, surname, email, password, role } = req.body;

    // Email zaten var mı kontrol
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Bu email kayıtlı" });

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const user = new User({ name, surname, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body;

    // Kullanıcı var mı
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Kullanıcı bulunamadı" });

    // Şifre doğru mu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Şifre hatalı" });

    // Token oluştur
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role || "user" } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
