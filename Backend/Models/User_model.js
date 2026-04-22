const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  UserName: {
    type: String,
    unique: [true, 'Username already exists'],
    required: true,
    },
    email: {
    type: String,
    required: true,
    unique: [true, 'Email already exists'],
    },
    password: { 
    
    type: String,
    required: true,

});

module.exports = mongoose.model('User', UserSchema);