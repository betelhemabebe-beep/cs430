// routes/student.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/authenticate');

// Middleware to verify student
router.use(authenticate('student'));

// Get list of verified clubs
router.get('/clubs', async (req, res) => {
  try {
    const [clubs] = await db.execute('SELECT * FROM clubs WHERE verified = TRUE');
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get services of a club
router.get('/clubs/:clubId/services', async (req, res) => {
  const { clubId } = req.params;
  try {
    const [services] = await db.execute('SELECT * FROM services WHERE club_id = ? AND active = TRUE', [clubId]);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get details for a specific service by ID
router.get('/services/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  try {
    const [service] = await db.execute('SELECT * FROM services WHERE id = ?', [serviceId]);
    if (service.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get student profile details
router.get('/profile', async (req, res) => {
  try {
    const [user] = await db.execute('SELECT username FROM users WHERE id = ?', [req.user.id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get order history for a student
router.get('/orders', async (req, res) => {
  try {
    const [orders] = await db.execute(
      `SELECT o.*, s.name AS service_name, c.name AS club_name, o.created_at
       FROM orders o
       JOIN services s ON o.service_id = s.id
       JOIN clubs c ON s.club_id = c.id
       WHERE o.student_id = ?`, [req.user.id]
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Place an order
router.post('/orders', async (req, res) => {
  const { serviceId, quantity, location, additionalInfo } = req.body;

  if (!serviceId || !quantity || !location) {
    return res.status(400).json({ error: 'Service ID, quantity, and location are required' });
  }

  try {
    await db.execute(
      'INSERT INTO orders (service_id, student_id, quantity, location, additional_info) VALUES (?, ?, ?, ?, ?)',
      [serviceId, req.user.id, quantity, location, additionalInfo || null]
    );
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
