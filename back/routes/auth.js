const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post('/register/student', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: 'Student registration successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/register/club', upload.single('clubImage'), async (req, res) => {
  const { requesterName, password, clubName, contactEmail, description } = req.body;

  if (!requesterName || !password || !clubName || !contactEmail) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!contactEmail.endsWith('@truman.edu')) {
    return res.status(400).json({ error: 'Contact email must end with @truman.edu' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Club image is required' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      'INSERT INTO clubs (name, requester_name, password, description, contact_email, image_url, verified) VALUES (?, ?, ?, ?, ?, ?, 0)',
      [clubName, requesterName, hashedPassword, description, contactEmail, imageUrl]
    );

    res.status(201).json({ message: 'Club registration successful! Await admin approval.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login/admin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const adminUsername = 'admin';
  const adminPassword = 'adminpassword';

  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ username, type: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(400).json({ error: 'Invalid admin credentials' });
});

router.post('/login/club', async (req, res) => {
  const { clubName, password } = req.body;

  if (!clubName || !password) {
    return res.status(400).json({ error: 'Club name and password are required' });
  }

  try {
    const [clubs] = await db.execute('SELECT * FROM clubs WHERE name = ?', [clubName]);

    if (clubs.length === 0) {
      return res.status(400).json({ error: 'Club not found' });
    }

    const club = clubs[0];
    const match = await bcrypt.compare(password, club.password);

    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign(
      { id: club.id, club_id: club.id, type: 'club' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login/student', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const [users] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, type: 'student' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
