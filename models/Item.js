const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    default:"Indonesia"
  }, 
  categoryId: {
    type: ObjectId,
    ref:'Category'
  },
  city: {
    type: String,
    required: true,
  }, desc: {
    type: String,
    required: true,
  },
  isPopular: {
    type: Boolean,
    default:false
  },
  imageId:[ {
    type: ObjectId,
    ref: "Image",
  }],
  featureId:[{
    type: ObjectId,
    ref: "Feature",
  }],
  activtyId:[{
    type: ObjectId,
    ref: "activtyId",
  }]

});

module.exports = mongoose.model("Item", itemSchema);
