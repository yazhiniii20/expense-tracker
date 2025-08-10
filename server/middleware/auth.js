const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId; // note: auth.js signs { userId: user._id }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
