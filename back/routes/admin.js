const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/authenticate');

// Middleware to verify admin
router.use(authenticate('admin'));

// Get list of unverified clubs
router.get('/clubs/pending', async (req, res) => {
  try {
    const [clubs] = await db.execute('SELECT * FROM clubs WHERE verified = FALSE');
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve a club
router.put('/clubs/:clubId/approve', async (req, res) => {
  const { clubId } = req.params;
  try {
    await db.execute('UPDATE clubs SET verified = TRUE WHERE id = ?', [clubId]);
    res.json({ message: 'Club approved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a club
router.delete('/clubs/:clubId', async (req, res) => {
  const { clubId } = req.params;
  try {
    await db.execute('DELETE FROM clubs WHERE id = ?', [clubId]);
    res.json({ message: 'Club deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get list of users with additional club details if role is club
router.get('/users', async (req, res) => {
  try {
    const [users] = await db.execute(`
      SELECT users.id, users.username, users.role, 
             clubs.name AS club_name, clubs.description, clubs.contact_email
      FROM users
      LEFT JOIN clubs ON users.id = clubs.user_id
    `);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
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
