import pdfParse from 'pdf-parse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeResume = async (fileBuffer) => {
  let resumeText;
  try {
    const { text } = await pdfParse(fileBuffer);
    resumeText = text;
  } catch (pdfError) {
    throw new Error('Failed to parse PDF. It may be encrypted or corrupt.');
  }

  const prompt = `
You are an expert technical recruiter and career coach. Analyze the following resume text and extract the information into a valid JSON object. The JSON object must conform to the following structure, and all fields must be populated. Do not include any text or markdown formatting before or after the JSON object.
If any field is missing in the resume, return null for strings or empty arrays [] for lists. Do not fabricate information.
"""
${resumeText}
"""

Return the response using this JSON structure only:
{
  "name": "string | null",
  "email": "string | null",
  "phone": "string | null",
  "linkedin_url": "string | null",
  "portfolio_url": "string | null",
  "summary": "string | null",
  "work_experience": [
    { "role": "string", "company": "string", "duration": "string", "description": ["string"] }
  ],
  "education": [
    { "degree": "string", "institution": "string", "graduation_year": "string" }
  ],
  "technical_skills": ["string"],
  "soft_skills": ["string"],
  "projects": [
    { "title": "string", "description": "string" }
  ],
  "achievements": ["string"],
  "resume_rating": "number (1-10)",
  "improvement_areas": "string",
  "upskill_suggestions": ["string"]
}
`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const textResponse = await result.response.text();
    const cleaned = textResponse.trim().replace(/^```json/, '').replace(/```$/, '');
    return JSON.parse(cleaned);
  } catch (error) {
    throw new Error('Failed to analyze the resume.');
  }
};
