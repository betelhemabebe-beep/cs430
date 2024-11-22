// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authenticate = require('./middleware/authenticate');
const app = express();

app.use(cors());
app.use(express.json()); // Enables JSON parsing for incoming requests

// Import route handlers
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const clubRoutes = require('./routes/club');
const adminRoutes = require('./routes/admin');

// Define routes with authentication middleware for protected routes
app.use('/auth', authRoutes);
app.use('/student', authenticate('student'), studentRoutes);
app.use('/club', authenticate('club'), clubRoutes);
app.use('/admin', authenticate('admin'), adminRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
