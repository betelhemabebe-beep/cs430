const jwt = require('jsonwebtoken');

const authenticate = (expectedType) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: 'No token provided' });

    const actualToken = token.split(' ')[1];

    jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }

      if (expectedType && decoded.type !== expectedType) {
        return res.status(403).json({ error: 'Access denied: Incorrect user type' });
      }

      req.user = decoded;
      next();
    });
  };
};

module.exports = authenticate;
