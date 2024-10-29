const express = require('express');
const router = express.Router();
const Urdu = require('../models/Urdu');

// Create a new urdu project
router.post('/', async (req, res) => {
  try {
    const urdu = new Urdu(req.body);
    await urdu.save();
    res.status(201).json(urdu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get urdu projects for a user
router.get('/user/:email', async (req, res) => {
  try {
    const urdus = await Urdu.find({ 'author.email': req.params.email });
    res.json(urdus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
