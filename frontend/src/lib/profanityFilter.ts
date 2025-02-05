const bannedWords = ["badword1", "badword2"];

export const analyzeMessage = (content: string): boolean => {
  return bannedWords.some((word) => content.toLowerCase().includes(word));
};

// import OpenAI from "openai";
//
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//
// export const analyzeMessage = async (content: string) => {
//   const response = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [{ role: "system", content: "Detect compliance violations in this message." }, { role: "user", content }]
//   });
//   return response.choices[0].message.content.includes("violation");
// };