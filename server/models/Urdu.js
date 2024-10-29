const mongoose = require('mongoose');

// Urdu Schema
const urduSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { 
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  description: { type: String, required: true },
  genres: [String], // List of genres
  collaborators: [{ email: String }], // Collaborators with email
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Urdu', urduSchema);
