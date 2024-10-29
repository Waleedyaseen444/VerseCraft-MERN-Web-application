const mongoose = require('mongoose');

// Novel Schema
const novelSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
  },
  author: { 
    name: { 
      type: String, 
      required: [true, 'Author name is required'],
      trim: true,
    },
    email: { 
      type: String, 
      required: [true, 'Author email is required'],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    }
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true,
  },
  genres: {
    type: [String],
    default: [],
  },
  chapters: { 
    type: Number, 
    min: 0,
  },
  collaborators: [{ 
    email: { 
      type: String, 
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    } 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now,
  },
  updatedAt: { 
    type: Date, 
    default: Date.now,
  },
}, {
  timestamps: true, // Automatically manages createdAt and updatedAt
});

// Middleware to update `updatedAt` before saving
novelSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Novel', novelSchema);
