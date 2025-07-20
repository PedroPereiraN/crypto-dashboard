import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userMessage = body.message;

  if (!userMessage) {
    return NextResponse.json(
      { error: "Missing user message" },
      { status: 400 },
    );
  }

  return await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    })
    .then((response) => {
      const aiResponse = response.choices[0].message.content;

      return NextResponse.json({ response: aiResponse });
    })
    .catch((error) => {
      console.error("OpenAI Error:", error);
      return NextResponse.json(
        { error: "Failed to generate response" },
        { status: 500 },
      );
    });
}
