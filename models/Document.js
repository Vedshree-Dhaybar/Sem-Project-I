const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: String,
  content: String, // Store the Quill HTML content
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
