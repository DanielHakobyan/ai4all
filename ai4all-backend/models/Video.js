// models/Video.js

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  source: String, // e.g. "YouTube", "Facebook"
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);