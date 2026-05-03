const InterviewReport = require('../Models/interviewReport.model');
const { generateInterviewReport } = require('../Services/ai.service');
const { extractTextFromFile } = require('../Services/file-parser.service');

async function generateInterviewReportController(req, res) {
  try {
    const { jobDescription, selfDescription, resumeText } = req.body;
    let resumeContent = '';

    if (req.file) {
      const fileType = req.file.mimetype;
      try {
        resumeContent = await extractTextFromFile(req.file.buffer, fileType);
      } catch (error) {
        console.error('File parsing error:', error);
        return res.status(400).json({
          message: 'Failed to parse uploaded file. Please ensure it\'s a valid PDF, DOCX, or TXT file.'
        });
      }
    } else if (resumeText && resumeText.trim()) {
      resumeContent = resumeText.trim();
    } else {
      return res.status(400).json({ message: 'Resume file or resume text is required' });
    }

    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description is required' });
    }

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

async function getInterviewReportController(req, res) {
  try {
    const reportId = req.params.id;
    const report = await InterviewReport.findOne({ _id: reportId, user: req.user.userId });

    if (!report) {
      return res.status(404).json({ message: 'Interview report not found' });
    }

    res.status(200).json({ report });
  } catch (error) {
    console.error('Error in getInterviewReportController:', error);
    res.status(500).json({
      message: 'Failed to fetch interview report',
      error: error.message,
    });
  }
}

// getAllInterviewReportsController
async function getAllInterviewReportsController(req, res) {
  try {
    const reports = await InterviewReport.find({ user: req.user.userId }).sort({ createdAt: -1 }).select('-resume -selfDescription -technicalQuestions -BehavioralQuestions -jobDescription -skillGapAnalysis -__v -preparationPlan'); // Exclude __v field
    res.status(200).json({ reports });
  } catch (error) {
    console.error('Error in getAllInterviewReportsController:', error);
    res.status(500).json({
      message: 'Failed to fetch interview reports',
      error: error.message,
    });
  }
}

module.exports = {
  generateInterviewReportController,
  getInterviewReportController,
  getAllInterviewReportsController,
};