const mongoose = require("mongoose");
const bankSchema = new mongoose.Schema({
  nameBank: {
    type: String,
    required: true,
  },
  nomorRekening: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    default:"Indonesia"
  },
  imageUrl: {
    type: String,
 
  }
});

module.exports = mongoose.model("Bank", bankSchema);
