const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }, 
  images: [{ type: String }],
  sku:{type: String, unique:true, required: true},
  category: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Category koleksiyonuna referans
    required: true }, 
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
