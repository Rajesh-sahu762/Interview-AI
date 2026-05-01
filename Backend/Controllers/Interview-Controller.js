const InterviewReport = require('../Models/interviewReport.model');
const { generateInterviewReport } = require('../Services/ai.service');
const pdfParse = require('pdf-parse/lib/pdf-parse.js');

async function generateInterviewReportController(req, res) {
  try {


    const resumeData = await pdfParse(req.file.buffer);

    const resumeContent = resumeData.text;

    const { jobDescription, selfDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description is required' });
    }

    const reportData = await generateInterviewReport({
        resume: resumeContent || '',
        selfDescription,
        jobDescription,
    });

    const interviewReport = await InterviewReport.create({
      jobDescription,
      resume: resumeContent || '',
      selfDescription: selfDescription || '',
      ...reportData,
      user: req.user.userId,
    });

    await interviewReport.save();

    res.status(201).json({
      message: 'Interview report generated successfully',
      report: interviewReport,
    });
  } catch (error) {
    console.error('Error in generateInterviewReportController:', error);
    res.status(500).json({
      message: 'Failed to generate interview report',
      error: error.message,
    });
  }
}

module.exports = {
  generateInterviewReportController,
};