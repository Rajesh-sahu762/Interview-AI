const express = require('express');
const { registerUserController, loginUserController } = require('../Controllers/Auth-Controller');

const authRouter = express.Router();

authRouter.post('/register', registerUserController);
authRouter.post('/login', loginUserController);

module.exports = authRouter;