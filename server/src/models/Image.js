const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  imageName: { type: String, required: true },
  image_name: { type: String, required: true },
  category: { type: String, required: true },
  keywords: { type: String, required: false },
  created_date: { type: Date, required: false }
});

module.exports = mongoose.model('Image', ImageSchema);