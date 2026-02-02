
import { GoogleGenAI, Type } from "@google/genai";

/* Use process.env.API_KEY directly for initialization as per guidelines */
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateContentIdeas = async (topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Сгенеруй 3 ідеї для посту в Instagram для партнера MLM компанії BRIONEL. Тема: ${topic}. Відповідь повинна бути українською мовою.`,
    config: {
      temperature: 0.8,
    }
  });
  /* Access .text property instead of .text() method */
  return response.text;
};

export const startSimulationSession = async (candidateType: string, userMessage: string, history: {role: string, content: string}[]) => {
  const systemInstruction = `
    Ти - потенційний кандидат у MLM бізнес компанії BRIONEL. Твій типаж: ${candidateType}. 
    Твоя мета - бути реалістичним. Не погоджуйся одразу, став складні питання, проявляй сумніви, якщо це передбачено типажем.
    Спілкуйся українською мовою. Тримай відповіді короткими (1-3 речення), як у реальному месенджері.
  `;

  // Note: Standard chat interface might be better, but following simple generateContent pattern for reliability
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { 
        parts: [
            { text: systemInstruction },
            /* Convert history messages to a linear prompt structure for simpler simulation control */
            ...history.map(h => ({ text: `${h.role === 'user' ? 'Партнер' : 'Кандидат'}: ${h.content}` })),
            { text: `Партнер: ${userMessage}` }
        ] 
    }
  });

  /* Access .text property instead of .text() method */
  return response.text;
};

export const evaluateResponse = async (dialogue: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Проаналізуй цей діалог партнера MLM з кандидатом. Дай оцінку від 1 до 10 та 2 конкретні поради для покращення. Діалог: ${dialogue}. Відповідь у форматі JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["score", "feedback"]
      }
    }
  });
  /* Access .text property and ensure whitespace removal before parsing */
  return JSON.parse(response.text?.trim() || "{}");
};
