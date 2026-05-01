const express = require('express');
const { generateInterviewReportController } = require('../Controllers/Interview-Controller');
const authUser = require('../Middleware/Auth-middleware');
const upload = require('../Middleware/file.middleware');


const interviewRouter = express.Router();

interviewRouter.post('/generate', authUser, upload.single('resume'), generateInterviewReportController);

module.exports = interviewRouter;