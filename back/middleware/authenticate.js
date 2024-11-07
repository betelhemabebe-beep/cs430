// middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (expectedRole) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(500).json({ error: 'Failed to authenticate token' });
      if (expectedRole && decoded.role !== expectedRole) return res.status(403).json({ error: 'Access denied' });
      req.user = decoded;
      next();
    });
  };
};

module.exports = authenticate;
