const express = require('express');
const { registerUserController, loginUserController,logoutUserController, getMeController } = require('../Controllers/Auth-Controller');
const authUser = require('../Middleware/Auth-middleware');

const authRouter = express.Router();

// Public Routes
authRouter.post('/register', registerUserController);
authRouter.post('/login', loginUserController);
authRouter.post('/logout', logoutUserController);

// Protected Routes
authRouter.get('/get-me', authUser, getMeController);


module.exports = authRouter;