const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  BikeNo: {
    type: Number,
    required: true,
  },
  BikeName: {
    type: String,
    required: true,
  },
  BikeDescription: {
    type: String,
    required: true,
  },
  BikePrice: {
    type: Number,
    required: true,
  },
  BikeImage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'not available'],
    default: 'available'
  },

  
  ShopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shopregister",
    required: true,
  },
});

const Bike = mongoose.model("bikes", bikeSchema);

module.exports = Bike;
