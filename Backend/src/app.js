const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('../Router/Auth-Routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend URL
    credentials: true
}));

app.use('/api/auth', authRouter);


module.exports = app;
