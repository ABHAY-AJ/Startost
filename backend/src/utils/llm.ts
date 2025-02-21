import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OpenAI_API });

export const callLLM = async (query: string): Promise<string | null> => {
  const prompt = `Is "${query}" a variation of any known entity? Respond with the canonical name if yes, or "new" if it's a new entity.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
};