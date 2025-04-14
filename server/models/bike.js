const mongoose = require('mongoose');

const BikeSchema = new mongoose.Schema({
  BikeNo: Number,
  BikeName: String,
  BikeDescription: String,
  BikePrice: Number,
  BikeImage: String, // This is what you store from Multer
  ShopId: {
    type: mongoose.Schema.Types.ObjectId, // or String if you're using string IDs
    ref: 'shopregister', // make sure this matches your actual shop model name
    required: true,
  },
});

module.exports = mongoose.model('Bike', BikeSchema);
