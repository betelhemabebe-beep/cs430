// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Student Registration
router.post('/register/student', async (req, res) => {
  const { username, password } = req.body;
  const role = 'student';
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [user] = await db.execute(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
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
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [user] = await db.execute(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );
    await db.execute(
      'INSERT INTO clubs (user_id, name, description, contact_email) VALUES (?, ?, ?, ?)',
      [user.insertId, clubName, description, contactEmail]
    );
    res.status(201).json({ message: 'Club registration successful, awaiting admin approval' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ? AND role = ?', [username, role]);
    if (rows.length === 0) return res.status(400).json({ error: 'User not found' });
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Incorrect password' });

    // Admin hardcoded credentials
    if (role === 'admin' && username === 'admin') {
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
      return res.json({ token });
    }

    // For clubs, check if verified
    if (role === 'club') {
      const [clubs] = await db.execute('SELECT * FROM clubs WHERE user_id = ?', [user.id]);
      const club = clubs[0];
      if (!club || !club.verified) {
        return res.status(403).json({ error: 'Club not verified yet' });
      }
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
