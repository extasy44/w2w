import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { OpenAIStreamPayload } from '@/types/openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert app development consultant helping users refine their app ideas and suggesting features based on their requirements.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    stream: true,
  });

  const stream = OpenAIStream(response as any);
  return new StreamingTextResponse(stream);
}
