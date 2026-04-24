const jwt = require('jsonwebtoken');
const blacklistModel = require('../Models/Blacklist_model');

function authUser(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    blacklistModel.findOne({ token }, (err, blacklisted) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (blacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }
         });
          try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
}