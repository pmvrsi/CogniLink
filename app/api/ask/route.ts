import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { question, labels, label_summary, adjacencyMatrix } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    let context = '';
    if (labels && label_summary && adjacencyMatrix) {
      context = `
Context (Knowledge Graph):
Topics: ${labels.join(', ')}
Summaries: ${label_summary.join(' | ')}
Adjacency Matrix (1 means row is prerequisite for column): ${JSON.stringify(adjacencyMatrix)}

Please answer the user's question based on the provided knowledge graph context.
`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: context ? `${context}\n\nQuestion: ${question}` : question,
    });

    return NextResponse.json({ answer: response.text });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Ask API Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
