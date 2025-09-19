const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", require("./routes/Products"));
app.use("/api/categories", require("./routes/Categories"));


// Test endpoint
app.get("/", (req, res) => {
  res.send("Backend çalışıyor 🚀");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));



mongoose.connect("mongodb://127.0.0.1:27017/eticaret", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB bağlandı"))
.catch(err => console.error(err));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


