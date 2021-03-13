const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
const activtySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default:"Indonesia"
  },
  isPopular:{
      type:Boolean
  },
  itemId:{
    type:ObjectId,
    ref:Item
  }
});

module.exports = mongoose.model("Activity", activtySchema);
