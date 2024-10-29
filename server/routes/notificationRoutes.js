// server/routes/notificationRoutes.js

const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const Novel = require('../models/Novel');
const User = require('../models/User');

// Function to generate a unique notification ID
const generateNotificationId = () => {
  return 'notif_' + Math.random().toString(36).substr(2, 9);
};

router.post('/create', async (req, res) => {
  try {
    const { novelId, recipientEmail, senderEmail, description } = req.body;

    // Validate input
    if (!novelId || !recipientEmail || !senderEmail || !description) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create new notification without any checks
    const notification = new Notification({
      notificationId: generateNotificationId(),
      novelId, // Directly use the novelId from the request
      senderEmail, // Store email addresses directly instead of user references
      recipientEmail,
      description,
      status: 'pending', // Default status
    });

    await notification.save();
    res.status(201).json({ message: 'Notification created successfully.' });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Failed to create notification.' });
  }
});

// Get notifications for a user - GET /api/notifications/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ recipient: userId })
      .populate('sender', 'fullname email')
      .populate('novelId', 'title');

    res.json(notifications);
  } catch (error) {
    console.error('Error retrieving notifications:', error);
    res.status(500).json({ error: 'Failed to retrieve notifications.' });
  }
});

// Update notification status - PATCH /api/notifications/:notificationId
router.patch('/:notificationId', async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found.' });
    }

    notification.status = status;
    await notification.save();
    res.json({ message: 'Notification status updated successfully.' });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ error: 'Failed to update notification status.' });
  }
});

module.exports = router;
