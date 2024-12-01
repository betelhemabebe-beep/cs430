const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/authenticate');

router.use(authenticate('admin'));

router.get('/clubs/pending', async (req, res) => {
  try {
    const [clubs] = await db.execute('SELECT * FROM clubs WHERE verified = 0');
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/clubs/:clubId/approve', async (req, res) => {
  const { clubId } = req.params;
  try {
    await db.execute('UPDATE clubs SET verified = 1 WHERE id = ?', [clubId]);
    res.json({ message: 'Club approved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/clubs/:clubId', async (req, res) => {
  const { clubId } = req.params;
  try {
    await db.execute('DELETE FROM clubs WHERE id = ?', [clubId]);
    res.json({ message: 'Club deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const [students] = await db.execute('SELECT id, username, email FROM users');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/clubs', async (req, res) => {
  try {
    const [clubs] = await db.execute('SELECT * FROM clubs WHERE verified = 1');
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await db.execute('DELETE FROM users WHERE id = ?', [userId]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
