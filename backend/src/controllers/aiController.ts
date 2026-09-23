import { Response, NextFunction } from 'express';
import { GoogleGenAI } from '@google/genai';
import { AuthRequest } from '../middleware/auth';
import { aiGenerateSchema } from '../validators';
import { sendSuccess, sendError } from '../utils/response';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const generateTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { projectTitle, projectDescription } = aiGenerateSchema.parse(req.body);

    const prompt = `
      You are a project manager AI. Given a project title and description, generate a list of practical, actionable tasks to complete it.
      
      Project Title: ${projectTitle}
      Description: ${projectDescription}
      
      Please return the result ONLY as a JSON array of objects. Each object should have:
      - title (string)
      - description (string)
      - status (must be exactly 'To Do')
      - priority (must be exactly one of: 'Low', 'Medium', 'High')
      
      Do not include markdown blocks like \`\`\`json, just return the raw JSON array.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    const responseText = response.text || "[]";
    let tasks = [];
    try {
        const cleanedText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
        tasks = JSON.parse(cleanedText);
    } catch (e) {
        console.error("Failed to parse Gemini response:", responseText);
        return sendError(res, 'Failed to parse AI response', 500);
    }

    return sendSuccess(res, { tasks });
  } catch (error) {
    next(error);
  }
};
