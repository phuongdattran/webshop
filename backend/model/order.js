const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  firstname: { type: String, required: true},
  lastname: { type: String, required: true },
  username: { type: String, required: true},
  email: { type: String, required: true},
  address: { type: String, required: true},
  address2: { type: String, required: true},
  country: { type: String, required: true},
  state: { type: String, required: true },
  zip: { type: Number, required: true},
  shippingAddress: { type: String, required: true},
  paymentMethod: { type: String, required: true},
  shippingMethod: { type: String, required: true},
  order: { type: String, required: true},
  userId: { type: String, required: true},
  date:  {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', orderSchema);
