const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  notificationId: { type: String, unique: true },
  novelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Novel', required: true },
  senderEmail: { type: String, required: true }, // Store sender's email directly
  recipientEmail: { type: String, required: true }, // Store recipient's email directly
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
