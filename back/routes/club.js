// routes/club.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/authenticate');

// Middleware to verify club
router.use(authenticate('club'));

// Check if club is verified
router.use(async (req, res, next) => {
  try {
    const [clubs] = await db.execute('SELECT * FROM clubs WHERE user_id = ?', [req.user.id]);
    const club = clubs[0];
    if (!club || !club.verified) {
      return res.status(403).json({ error: 'Club not verified' });
    }
    req.club = club;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all services for the club (missing route)
router.get('/services', async (req, res) => {
  try {
    const [services] = await db.execute('SELECT * FROM services WHERE club_id = ?', [req.club.id]);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a service
router.post('/services', async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  try {
    await db.execute(
      'INSERT INTO services (club_id, name, description, price, image_url) VALUES (?, ?, ?, ?, ?)',
      [req.club.id, name, description, price, imageUrl]
    );
    res.status(201).json({ message: 'Service added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a service
router.delete('/services/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  try {
    await db.execute('DELETE FROM services WHERE id = ? AND club_id = ?', [serviceId, req.club.id]);
    res.json({ message: 'Service removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle service availability
router.put('/services/:serviceId/toggle', async (req, res) => {
  const { serviceId } = req.params;
  try {
    await db.execute(
      'UPDATE services SET active = !active WHERE id = ? AND club_id = ?',
      [serviceId, req.club.id]
    );
    res.json({ message: 'Service availability toggled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get orders
router.get('/orders', async (req, res) => {
  try {
    const [orders] = await db.execute(
      `SELECT o.*, s.name as service_name, u.username as student_username
       FROM orders o
       JOIN services s ON o.service_id = s.id
       JOIN users u ON o.student_id = u.id
       WHERE s.club_id = ? AND o.status = 'requested'`,
      [req.club.id]
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Confirm an order
router.put('/orders/:orderId/confirm', async (req, res) => {
  const { orderId } = req.params;
  try {
    await db.execute(
      'UPDATE orders SET status = "confirmed" WHERE id = ?',
      [orderId]
    );
    res.json({ message: 'Order confirmed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
