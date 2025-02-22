import type { APIRoute } from "astro";
import OpenAI from "openai";
import fs from "node:fs/promises";

const url = new URL("./_SystemMessageContent.txt", import.meta.url);
const systemContent = await fs.readFile(url, "utf-8");
const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});
export const POST: APIRoute = async ({ request }) => {
  try {
    const { userPrompt } = await request.json();
    const chatbotResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemContent,
        },
        { role: "user", content: userPrompt },
      ],
      model: "gpt-3.5-turbo-1106",

      temperature: 0.8, // Higher values means the model will take more risks.
      max_tokens: 2500, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      frequency_penalty: 1.2, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    return new Response(
      JSON.stringify(chatbotResponse.choices[0].message.content!.trim()),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Oops! Something went wrong. Please try again.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
