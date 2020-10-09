const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  price: {type: Number, required: true},
  image: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
