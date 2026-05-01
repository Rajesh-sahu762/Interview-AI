const InterviewReport = require('../Models/interviewReport.model');
const { generateInterviewReport } = require('../Services/ai.service');
const pdfParse = require('pdf-parse');


async function generateInterviewReportController(req, res) {
  try {

    const resumeContent = await pdfParse(req.file.buffer);
    const { jobDescription, selfDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description is required' });
    }

    const reportData = await generateInterviewReport(jobDescription, resumeContent, selfDescription);

    const interviewReport = await InterviewReport.create({
      jobDescription,
      resume: resumeContent || '',
      selfDescription: selfDescription || '',
      ...reportData,
      user: req.user._id,
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