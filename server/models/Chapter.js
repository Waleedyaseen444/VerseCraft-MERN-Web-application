// models/Chapter.js

const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: [true, 'Associated story is required'],
  },
  title: {
    type: String,
    required: [true, 'Chapter title is required'],
    trim: true,
  },
  number: {
    type: Number,
    required: [true, 'Chapter number is required'],
    min: [1, 'Chapter number must be at least 1'],
  },
  content: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    enum: ['en', 'ur'], // Extend as needed
    default: 'en',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  summary: {
     type: String, 
     default: '' 
    },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Automatically manages createdAt and updatedAt
});

// Middleware to update `updatedAt` before saving
chapterSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure unique chapter number within a story
chapterSchema.index({ story: 1, number: 1 }, { unique: true });

module.exports = mongoose.model('Chapter', chapterSchema);
