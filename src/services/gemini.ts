import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const interviewService = {
  async startInterview(role: string, level: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an interviewer for a ${level} level ${role} position. 
      Start the interview by introducing yourself and asking the first question. 
      Keep it professional and realistic.`,
    });
    return response.text;
  },

  async getFeedback(history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: 'user', parts: [{ text: "Analyze the following interview session and provide scores (0-10) for communication, technical accuracy, and confidence. Also provide overall feedback and areas of improvement." }] },
        ...history as any
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            communication: { type: Type.NUMBER },
            technical: { type: Type.NUMBER },
            confidence: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["communication", "technical", "confidence", "feedback", "improvements"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }
};

export const resumeService = {
  async analyzeResume(text: string, jobDescription?: string) {
    const prompt = jobDescription 
      ? `Analyze this resume against the following job description. Provide matching score, missing skills, and suggestions for improvement.\n\nResume: ${text}\n\nJob Description: ${jobDescription}`
      : `Analyze this resume and provide a summary of strengths, weaknesses, and optimization tips for ATS.\n\nResume: ${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            atsScore: { type: Type.NUMBER }
          },
          required: ["strengths", "weaknesses", "suggestions"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }
};
