const mongoose = require('mongoose');



/* Technical Questions Schema */
const technicalQuestionsSchema = new mongoose.Schema({
    question: { type: String, required: [true, "Question is required"] },
    intention: { type: String, required: [true, "Intention is required"] },
    answer: { type: String, required: [true, "Answer is required"] },
},{
    _id: false
});

/* Behavioural Questions Schema */
const behaviouralQuestionsSchema = new mongoose.Schema({
      question: { type: String, required: [true, "Question is required"] },
    intention: { type: String, required: [true, "Intention is required"] },
    answer: { type: String, required: [true, "Answer is required"] },
},{
    _id: false
});

/* Skill Gap Analysis Schema */
const skillGapSchema = new mongoose.Schema({
    skill: { type: String, required: [true, "Skill is required"] },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    recommendation: { type: String, required: [true, "Recommendation is required"] },
},{
    _id: false
});

const preprationPlanSchema = new mongoose.Schema({
    day: { type: String, required: [true, "Day is required"] },
    focus: { type: String, required: [true, "Focus is required"] },
    tasks: { type: String, required: [true, "Tasks are required"] },
});




/* Overall Feedback Schema */
const interviewReportSchema = new mongoose.Schema({
    jobDescription: { type: String, required: true },
    resume: { type: String },
    selfDescription: { type: String},
    matchScore: { type: Number, min: 0, max: 100 },
    technicalQuestions: [technicalQuestionsSchema],
    behaviouralQuestions: [behaviouralQuestionsSchema],
    skillGapAnalysis: [skillGapSchema],
    preparationPlan: [preprationPlanSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
},{
    timestamps: true
});

const InterviewReport = mongoose.model('InterviewReport', interviewReportSchema);

module.exports = InterviewReport;