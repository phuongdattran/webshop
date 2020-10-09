const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  userId: { type: String, required: true},
  address: { type: String, required: true },
  zip: { type: Number, required: true},
  state: { type: String, required: true},
  country: { type: String, required: true}
});

module.exports = mongoose.model('Address', addressSchema);
