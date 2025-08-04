import dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "openai";
// Ensure the OpenAI API key is set in the environment variables
if (!process.env.GITHUB_APP_ID || !process.env.GITHUB_PRIVATE_KEY_PATH) {
  throw new Error("The GITHUB_APP_ID or GITHUB_PRIVATE_KEY_PATH environment variable is missing or empty; please provide them in your environment or .env file.");
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error("The OPENAI_API_KEY environment variable is missing or empty; please provide it in your environment or .env file.");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

/**
 * @param {string} diff - The raw diff or code change to review
 * @returns {Promise<string>} - AI-generated review comment
 */
async function getReviewFromAI(diff) {
  const prompt = `
You are a senior software engineer. Review the following GitHub Pull Request diff and provide:
1. Suggestions to improve code quality or readability.
2. Any bugs or red flags.
3. If the code is good, briefly say why.

Respond in a conversational tone (as if commenting on GitHub).

PR Diff:
\`\`\`diff
${diff}
\`\`\`
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a code reviewer bot." },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 500,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("❌ AI review error:", err);
    return "⚠️ Could not generate review comment due to an error.";
  }
}

export { getReviewFromAI };
