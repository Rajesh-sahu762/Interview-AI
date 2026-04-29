const userModel = require('../Models/User_model');
const blacklistModel = require('../Models/Blacklist_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const existingUser = await userModel.findOne({ $or: [{ UserName: username }, { email }] }); 

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ UserName: username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 }); // 1 day
    res.status(201).json({ message: 'User registered successfully', token, user: { id: newUser._id, username: newUser.UserName, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }


}

async function loginUserController(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid Password' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 }); // 1 day
  res.status(200).json({ message: 'Login successful', token, user: { id: user._id, username: user.UserName, email: user.email } });
}


async function logoutUserController(req, res) {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (token) {
    await blacklistModel.create({ token });
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful' });
  } else {
    return res.status(400).json({ message: 'No token provided' });
  }

}

async function getMeController(req, res) {
  const user = await userModel.findById(req.user.userId);
  res.status(200).json({ 
    message: 'User details fetched successfully',
    user : {
      id: user._id,
      username: user.UserName,
      email: user.email
    } 
   });
}


module.exports = { registerUserController, loginUserController, logoutUserController, getMeController };