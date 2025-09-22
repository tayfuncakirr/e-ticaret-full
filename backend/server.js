const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();



// Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/uploads", express.static("uploads"));

// Test endpoint
app.get("/", (req, res) => {
  res.send("Backend çalışıyor 🚀");
});

// MongoDB bağlantısı ve server başlatma
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB bağlandı");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server ${process.env.PORT || 5000} portunda çalışıyor`)
    );
  })
  .catch((err) => console.error("MongoDB bağlantı hatası", err));


