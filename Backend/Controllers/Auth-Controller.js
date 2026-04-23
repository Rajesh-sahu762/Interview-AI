const userModel = require('../Models/User_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function registerUserController(req, res) {
  const { UserName, email, password } = req.body;

  if (!UserName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const existingUser = await userModel.findOne({ $or: [{ UserName }, { email }] }); 

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ UserName, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ message: 'User registered successfully', token });
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
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.status(200).json({ message: 'Login successful', token });
}

module.exports = { registerUserController, loginUserController };