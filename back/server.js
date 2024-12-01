require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authenticate = require('./middleware/authenticate');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const clubRoutes = require('./routes/club');
const adminRoutes = require('./routes/admin');

app.use('/auth', authRoutes);
app.use('/student', authenticate('student'), studentRoutes);
app.use('/club', authenticate('club'), clubRoutes);
app.use('/admin', authenticate('admin'), adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
