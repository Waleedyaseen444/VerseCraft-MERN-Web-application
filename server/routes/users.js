// server/routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// For handling file uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const jwt = require('jsonwebtoken');



// Registration Route
router.post('/signup', upload.single('profile'), async (req, res) => {
  try {
    const { fullname, email, password, age, gender, phone, description } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let profileImagePath = req.file.path.replace(/\\/g, '/');

    // Create new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      age,
      gender,
      phone,
      description,
      profileImage: profileImagePath,
    });

    await newUser.save();

    // Fetch all users (for testing)
    const users = await User.find();
    console.log('All users:', users);

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create and sign JWT
    const payload = {
      user: {
        id: user._id,
      },
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Store your secret key in .env file
      { expiresIn: '1h' },    // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: 'Login successful' });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



// GET /get-collaborators - Get all collaborators
router.get('/get-collaborators', async (req, res) => {
  console.log('Received request for /get-collaborators');
  try {
    const collaborators = await User.find({}, 'fullname email');
    res.json(collaborators);
  } catch (err) {
    console.error('Error fetching collaborators:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;






const auth = require('../middleware/auth');

// Protected route example
router.get('/profile', auth, async (req, res) => {
  try {
    // req.user.id contains the authenticated user's ID
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});