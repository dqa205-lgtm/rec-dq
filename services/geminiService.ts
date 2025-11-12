
import { GoogleGenAI } from "@google/genai";
import { Place } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set in environment variables. Using a placeholder. Please set your API key for full functionality.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_HERE" });

export const generateRecommendationSummary = async (place: Place): Promise<string> => {
  const prompt = `
  You are an expert trip planner for a group of 3 friends based in Gangnam, Seoul.
  Given the following meeting place and its key tags, generate a short, creative, and appealing 1-2 sentence summary of a potential plan for a day out there.
  The tone should be exciting and friendly.
  
  Place: ${place.name}
  Tags: ${place.tags.join(', ')}

  Example:
  Place: 롯데타워 & 롯데월드
  Tags: #도심, #실내액티비티, #아이스링크
  Summary: 스릴 넘치는 어트랙션을 즐기고 아이스링크에서 낭만을 더한 후, 서울의 야경이 한눈에 들어오는 롯데타워에서 완벽한 하루를 마무리해보세요!

  Now, generate a summary for the provided place.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini API:", error);
    return "AI 요약을 생성하는 데 실패했습니다. 잠시 후 다시 시도해주세요.";
  }
};
