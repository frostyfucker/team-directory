
import { GoogleGenAI } from "@google/genai";
import { TeamMember } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we will alert the user.
  // The API key is expected to be set in the environment.
  alert("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateDescription = async (profession: string): Promise<string> => {
  try {
    const prompt = `Generate a brief, professional description for a team member whose profession is "${profession}". Focus on their key responsibilities and potential skills. The tone should be positive and encouraging for a corporate team directory. Keep it to 2-3 sentences.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating description:", error);
    return "Failed to generate description. Please try again.";
  }
};

export const generateAvatar = async (profession: string): Promise<string> => {
    try {
        const prompt = `A professional, minimalist, vector-style avatar for a "${profession}". The avatar should be gender-neutral, friendly, and suitable for a corporate directory. Use a simple, modern color palette on a light gray background (#f3f4f6). No text.`;

        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        }
        throw new Error("No image was generated.");
    } catch (error) {
        console.error("Error generating avatar:", error);
        return "";
    }
};
