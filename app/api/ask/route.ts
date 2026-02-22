import { GoogleGenAI, createUserContent } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { question, labels, label_summary, adjacencyMatrix } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const graphContext = labels && adjacencyMatrix
      ? `Current knowledge graph has ${labels.length} topics: ${labels.join(', ')}.

Topic summaries:
${labels.map((l: string, i: number) => `- ${l}: ${label_summary?.[i] ?? ''}`).join('\n')}

Prerequisite relationships (adjacencyMatrix[i][j]=1 means topic i must be learned before topic j):
${labels.map((l: string, i: number) =>
  adjacencyMatrix[i]
    .map((v: number, j: number) => v === 1 ? `${l} → ${labels[j]}` : null)
    .filter(Boolean)
    .join(', ')
).filter(Boolean).join('\n')}
`
      : 'No graph has been generated yet.';

    const systemPrompt = `You are a helpful study assistant. A student is asking questions about their knowledge graph — a map of topics from their study material and the prerequisite relationships between them. Answer concisely and helpfully based on the graph context provided.`;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: createUserContent([
        { text: systemPrompt },
        { text: `Graph context:\n${graphContext}\n\nStudent question: ${question}` },
      ]),
    });

    const answer = response.text;
    if (!answer) {
      return NextResponse.json({ error: 'Empty response from Gemini' }, { status: 500 });
    }

    return NextResponse.json({ answer });

  } catch (error) {
    console.error('Ask API Error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
