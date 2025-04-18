const mongoose = require('mongoose');

const confirmedBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: String,
  email: String,
  contact: String,
  bookingDate: Date,
  package: String,
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bikes',

    required: true
  },
  bikeName: {
    type: String,
    required: true
  },

  
 
  ShopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ConfirmedBooking', confirmedBookingSchema);
