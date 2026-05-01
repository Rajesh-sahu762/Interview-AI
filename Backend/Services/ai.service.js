const { GoogleGenerativeAI } = require("@google/generative-ai");
const {z} = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const interviewReportSchema = z.object({
  matchScore: z.number().min(0).max(100).describe("A score from 0 to 100 indicating how well the candidate matches the job description"),
  technicalQuestions: z.array(z.object({
    question: z.string().describe("A technical question relevant to the job description and candidate's background"),
    intention: z.string().describe("The intention behind the technical question"),
    answer: z.string().describe("A sample answer to the technical question"),
  }).describe("Technical Questions")),
  behaviouralQuestions: z.array(z.object({
    question: z.string().describe("A behavioral question relevant to the job description and candidate's background"),
    intention: z.string().describe("The intention behind the behavioral question"),
    answer: z.string().describe("A sample answer to the behavioral question"),
  }).describe("Behavioural Questions")),
  skillGapAnalysis: z.array(z.object({
    skill: z.string().describe("The skill that needs improvement"),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']).describe("The current level of the skill"),
    recommendation: z.string().describe("A recommendation for improving the skill"),
  })).describe("Skill Gap Analysis"),
  preparationPlan: z.array(z.object({
    day: z.string().describe("The day of the week"),
    focus: z.string().describe("The area of focus for the day"),
    tasks: z.string().describe("The tasks to be completed"),
  })).describe("Preparation Plan"),
});

const prompt = `You are an expert career counselor. Based on the candidate's resume, self-description, and job description, generate a comprehensive interview report in JSON format.

JOB DESCRIPTION: \${jobDescription}
RESUME: \${resume || 'Not provided'}
SELF DESCRIPTION: \${selfDescription || 'Not provided'}

Return ONLY valid JSON with this exact structure:
{
  "matchScore": <number 0-100>,
  "technicalQuestions": [
    {
      "question": "<technical question>",
      "intention": "<what it tests>",
      "answer": "<sample answer>"
    }
  ],
  "behaviouralQuestions": [
    {
      "question": "<behavioral question>",
      "intention": "<what it reveals>",
      "answer": "<sample answer>"
    }
  ],
  "skillGapAnalysis": [
    {
      "skill": "<skill name>",
      "level": "<Beginner|Intermediate|Advanced>",
      "recommendation": "<improvement suggestion>"
    }
  ],
  "preparationPlan": [
    {
      "day": "<Day 1-7>",
      "focus": "<focus area>",
      "tasks": "<comma-separated tasks>"
    }
  ]
}

Generate 5-7 technical questions, 3-5 behavioral questions, 4-6 skill gaps, and a 7-day plan.`;



async function generateInterviewReport(jobDescription, resume, selfDescription) {

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const dynamicPrompt = `You are an expert career counselor. Based on the candidate's resume, self-description, and job description, generate a comprehensive interview report in JSON format.

JOB DESCRIPTION: ${jobDescription}
RESUME: ${resume || 'Not provided'}
SELF DESCRIPTION: ${selfDescription || 'Not provided'}

Return ONLY valid JSON with this exact structure:
{
  "matchScore": <number 0-100>,
  "technicalQuestions": [
    {
      "question": "<technical question>",
      "intention": "<what it tests>",
      "answer": "<sample answer>"
    }
  ],
  "behaviouralQuestions": [
    {
      "question": "<behavioral question>",
      "intention": "<what it reveals>",
      "answer": "<sample answer>"
    }
  ],
  "skillGapAnalysis": [
    {
      "skill": "<skill name>",
      "level": "<Beginner|Intermediate|Advanced>",
      "recommendation": "<improvement suggestion>"
    }
  ],
  "preparationPlan": [
    {
      "day": "<Day 1-7>",
      "focus": "<focus area>",
      "tasks": "<comma-separated tasks>"
    }
  ]
}

Generate 5-7 technical questions, 3-5 behavioral questions, 4-6 skill gaps, and a 7-day plan.`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: dynamicPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const response = await result.response;
    const text = response.text();
    const report = interviewReportSchema.parse(JSON.parse(text));

    console.log('Generated Interview Report:', report);
    return report;

} catch (error) {
    console.error('Error generating interview report:', error);
    throw error;
}
  
}

module.exports = {
  generateInterviewReport,
};