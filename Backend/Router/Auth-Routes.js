const express = require('express');
const { registerUserController, loginUserController,logoutUserController, getMeController } = require('../Controllers/Auth-Controller');
const authUser = require('../Middleware/Auth-middleware');

const authRouter = express.Router();

authRouter.post('/register', registerUserController);
authRouter.post('/login', loginUserController);
authRouter.get('/logout', logoutUserController);
authRouter.get('/get-me', authUser, getMeController);
module.exports = authRouter;