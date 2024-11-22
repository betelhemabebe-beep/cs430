// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Student Registration
router.post('/register/student', async (req, res) => {
  const { username, email, password } = req.body;
  const role = 'student';

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );
    res.status(201).json({ message: 'Student registration successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Club Registration
router.post('/register/club', async (req, res) => {
  const { username, password, clubName, description, contactEmail } = req.body;
  const role = 'club';

  if (!username || !password || !clubName || !contactEmail) {
    return res.status(400).json({ error: 'Username, password, club name, and contact email are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );
    await db.execute(
      'INSERT INTO clubs (user_id, name, description, contact_email) VALUES (?, ?, ?, ?)',
      [result.insertId, clubName, description, contactEmail]
    );
    res.status(201).json({ message: 'Club registration successful, awaiting admin approval' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Username, password, and role are required' });
  }

  try {
    // Check for admin role with hardcoded credentials
    if (role === 'admin') {
      if (username === 'admin' && password === 'adminpassword') {
        const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
      } else {
        return res.status(400).json({ error: 'Invalid admin credentials' });
      }
    }

    // Retrieve the user from the database for non-admin roles
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ? AND role = ?', [username, role]);
    if (rows.length === 0) return res.status(400).json({ error: 'User not found' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Incorrect password' });

    // Generate JWT token with user ID and role
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
