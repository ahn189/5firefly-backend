const mongoose = require('mongoose');

const helperSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  phone: String,
  address: String,
  experience: String,
  image: String, // đường dẫn ảnh
});

module.exports = mongoose.model('Helper', helperSchema);
