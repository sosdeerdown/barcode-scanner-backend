const mongoose = require("mongoose");

const BarcodeSchema = mongoose.Schema({
  ean: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Number,
  },
  categoryName: {
    type: String,
  },
});

module.exports = mongoose.model("barcode", BarcodeSchema);
