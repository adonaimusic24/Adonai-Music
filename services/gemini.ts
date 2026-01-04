
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArtistBio = async (artistName: string, genre: string) => {
  const ai = getAI();
  const prompt = `Escreva uma biografia curta e profissional (máximo 200 caracteres) para um artista da gravadora gospel Adonai Music. Nome: ${artistName}, Estilo: ${genre}. O tom deve ser inspirador e espiritual, semelhante ao estilo da gravadora Todah Music.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Erro ao gerar biografia.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Erro na conexão com a inteligência artificial.";
  }
};

export const generateNewsArticle = async (topic: string) => {
  const ai = getAI();
  const prompt = `Escreva uma notícia curta e impactante para o blog de uma gravadora gospel sobre: ${topic}. Retorne um objeto JSON com 'title' (título chamativo) e 'content' (texto curto).`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING }
          },
          required: ["title", "content"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Error:", error);
    return { title: "Erro", content: "Não foi possível gerar a notícia." };
  }
};
