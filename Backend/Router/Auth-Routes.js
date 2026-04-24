const express = require('express');
const { registerUserController, loginUserController,logoutUserController } = require('../Controllers/Auth-Controller');

const authRouter = express.Router();

authRouter.post('/register', registerUserController);
authRouter.post('/login', loginUserController);
authRouter.get('/logout', logoutUserController);
authRouter.get('/get-me',);

module.exports = authRouter;