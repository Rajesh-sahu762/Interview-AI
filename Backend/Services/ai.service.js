const { GoogleGenAI } = require('@google/genai');
const {z} = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z.number().min(0).max(100).describe("Match Score"),
  technicalQuestionsSchema: z.array(z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string(),
  }).describe("Technical Question Schema")),
  behaviouralQuestionsSchema: z.array(z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string(),
  }).describe("Behavioural Question Schema")),
  skillGapSchema: z.array(z.object({
    skill: z.string(),
    gap: z.string(),
  })).describe("Skill Gap Schema"),
  preprationPlanSchema: z.array(z.object({
    day: z.string(),
    focus: z.string(),
    tasks: z.string(),
  })).describe("Preparation Plan Schema"),
});

async function generateInterviewReport( resume, selfDescription, jobDescription) {

module.exports = { generateInterviewReport };