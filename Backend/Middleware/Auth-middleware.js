const jwt = require('jsonwebtoken');
const blacklistModel = require('../Models/Blacklist_model');

async function authUser(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const blacklisted = await blacklistModel.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ message: 'Token is Invalid' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authUser;