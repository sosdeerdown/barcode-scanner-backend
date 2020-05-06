const mongoose = require("mongoose");

const BarcodeSchema = mongoose.Schema({
  ean: {
    type: String,
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
    required: true,
  },
});

module.exports = mongoose.model("barcode", BarcodeSchema);
