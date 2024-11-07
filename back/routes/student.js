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

// Place an order
router.post('/orders', async (req, res) => {
  const { serviceId, quantity } = req.body;
  try {
    await db.execute(
      'INSERT INTO orders (service_id, student_id, quantity) VALUES (?, ?, ?)',
      [serviceId, req.user.id, quantity]
    );
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Confirm order delivery
router.put('/orders/:orderId/confirm', async (req, res) => {
  const { orderId } = req.params;
  try {
    await db.execute(
      'UPDATE orders SET status = "completed" WHERE id = ? AND student_id = ?',
      [orderId, req.user.id]
    );
    res.json({ message: 'Order confirmed as completed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
