const express = require('express');
const { registerUserController } = require('../Controllers/Auth-Controller');

const authRouter = express.Router();

authRouter.post('/register', registerUserController);   

module.exports = authRouter;