const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/authenticate');

router.use(authenticate('student'));

router.get('/clubs', async (req, res) => {
  try {
    const [clubs] = await db.execute(`
      SELECT c.*,
        EXISTS(SELECT 1 FROM services s WHERE s.club_id = c.id) AS hasServices
      FROM clubs c
      WHERE c.verified = TRUE
    `);

    const updatedClubs = clubs.map((club) => ({
      ...club,
      image_url: club.image_url
        ? `${req.protocol}://${req.get('host')}${club.image_url}`
        : null,
      hasServices: !!club.hasServices,
    }));

    res.status(200).json(updatedClubs);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/clubs/:clubId/services', async (req, res) => {
  const { clubId } = req.params;
  try {
    const [services] = await db.execute(
      `SELECT id, name, description, price, 
              CONCAT('${req.protocol}://${req.get('host')}', image_url) AS image_url 
       FROM services 
       WHERE club_id = ? AND active = TRUE`,
      [clubId]
    );
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/services/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  try {
    const [service] = await db.execute('SELECT * FROM services WHERE id = ?', [serviceId]);
    if (service.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const [user] = await db.execute('SELECT username FROM users WHERE id = ?', [req.user.id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const [orders] = await db.execute(
      `SELECT o.*, s.name AS service_name, c.name AS club_name, o.created_at
       FROM orders o
       JOIN services s ON o.service_id = s.id
       JOIN clubs c ON s.club_id = c.id
       WHERE o.student_id = ?`, 
      [req.user.id]
    );

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/orders', async (req, res) => {
  const { serviceId, quantity, location, additionalInfo } = req.body;

  if (!serviceId || !quantity || !location) {
    return res.status(400).json({ error: 'Service ID, quantity, and location are required' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO orders (service_id, student_id, quantity, location, additional_info) VALUES (?, ?, ?, ?, ?)',
      [serviceId, req.user.id, quantity, location, additionalInfo || null]
    );

    res.status(201).json({ message: 'Order placed successfully', orderId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const [result] = await db.execute(
      'DELETE FROM orders WHERE id = ? AND student_id = ?',
      [orderId, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found or you do not have permission to delete this order' });
    }

    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
