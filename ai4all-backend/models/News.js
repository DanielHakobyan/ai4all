// models/News.js

const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  link: String,
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);

