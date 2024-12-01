const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../middleware/authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.use(authenticate('club'));

router.use(async (req, res, next) => {
  try {
    const [clubs] = await db.execute('SELECT * FROM clubs WHERE id = ?', [req.user.club_id]);
    const club = clubs[0];
    if (!club || !club.verified) {
      return res.status(403).json({ error: 'Access denied: Club not verified' });
    }
    req.club = club;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const [clubs] = await db.execute(
      'SELECT name, description, contact_email, image_url FROM clubs WHERE id = ?',
      [req.club.id]
    );
    if (clubs.length === 0) {
      return res.status(404).json({ error: 'Club not found' });
    }
    res.json(clubs[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.put('/profile', upload.single('image'), async (req, res) => {
  const { name, description, contactEmail } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !contactEmail) {
    return res.status(400).json({ error: 'Name and contact email are required' });
  }

  try {
    await db.execute(
      'UPDATE clubs SET name = ?, description = ?, contact_email = ?, image_url = COALESCE(?, image_url) WHERE id = ?',
      [name, description, contactEmail, imageUrl, req.club.id]
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.get('/services', async (req, res) => {
  try {
    const [services] = await db.execute('SELECT * FROM services WHERE club_id = ?', [req.club.id]);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

router.post('/services', upload.single('image'), async (req, res) => {
  const { name, description, price } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !description || price == null) {
    return res.status(400).json({ error: 'Missing required fields: name, description, or price' });
  }

  try {
    await db.execute(
      'INSERT INTO services (club_id, name, description, price, image_url) VALUES (?, ?, ?, ?, ?)',
      [req.club.id, name, description, price, imageUrl]
    );
    res.status(201).json({ message: 'Service added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add service' });
  }
});

router.delete('/services/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM services WHERE id = ? AND club_id = ?', [
      serviceId,
      req.club.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found or not owned by club' });
    }
    res.json({ message: 'Service removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

router.put('/services/:serviceId/toggle', async (req, res) => {
  const { serviceId } = req.params;
  try {
    const [result] = await db.execute(
      'UPDATE services SET active = !active WHERE id = ? AND club_id = ?',
      [serviceId, req.club.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found or not owned by club' });
    }
    res.json({ message: 'Service availability toggled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle service availability' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const [orders] = await db.execute(
      `SELECT o.*, s.name AS service_name, u.username AS student_username
       FROM orders o
       JOIN services s ON o.service_id = s.id
       JOIN users u ON o.student_id = u.id
       WHERE s.club_id = ?`,
      [req.club.id]
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.put('/orders/:orderId/status', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!['confirmed', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const [result] = await db.execute(
      'UPDATE orders SET status = ? WHERE id = ? AND status != "completed"',
      [status, orderId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found or already completed' });
    }
    res.json({ message: `Order ${status} successfully` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

module.exports = router;
