// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan'); // Import Morgan for logging
require('dotenv').config();
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Adjust if necessary
  credentials: true,
}));
app.use(morgan('dev')); // Use Morgan for logging

// Import Routes
const userRoutes = require('./routes/users');
const notificationRoutes = require('./routes/notificationRoutes');
// Import Routes
const adminRoutes = require('./routes/admin');
const storyRoutes = require('./routes/storyRoutes');



const novelsRoutes = require('./routes/novelRoutes');
const urduRouter = require('./routes/urdu');



const chapterRoutes = require('./routes/chapters');

const noteRoutes = require('./routes/noteRoutes');
const novelChaptersRoute = require('./routes/novelChapters');


app.use('/api', novelChaptersRoute);


app.use('/api', chapterRoutes); // Mount chapterRoutes at /api

app.use('/api', noteRoutes);


// ...

app.use('/api/novels', novelsRoutes);
app.use('/api/urdu', urduRouter);
app.use('/api/stories', storyRoutes);



// Define Routes
app.use('/api/urduchapters', require('./routes/urduChapters'));
app.use('/api/chapter-notes', require('./routes/urduChapterNotes'));
// Mount Routes
// Mount Routes Correctly
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes); // Ensure this points to notificationRoutes
app.use('/api/stories', storyRoutes);


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

})
.catch((err) => console.log('MongoDB connection error:', err));

// Handle MongoDB disconnection
mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected');
});
