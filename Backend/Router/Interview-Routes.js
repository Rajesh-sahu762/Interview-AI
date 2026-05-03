const express = require('express');
const { generateInterviewReportController, getAllInterviewReportsController, getInterviewReportController } = require('../Controllers/Interview-Controller');
const authUser = require('../Middleware/Auth-middleware');
const upload = require('../Middleware/file.middleware');


const interviewRouter = express.Router();

interviewRouter.post('/generate', authUser, upload.single('resume'), generateInterviewReportController);

interviewRouter.get('/reports/:id', authUser, getInterviewReportController);

interviewRouter.get('/', authUser, getAllInterviewReportsController);

module.exports = interviewRouter;