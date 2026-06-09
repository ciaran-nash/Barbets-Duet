import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { learningSites } from '@/lib/data/learning-sites';

// TODO(multilingual): When implementing multilingual support:
// 1. Detect request language from Accept-Language header
// 2. Pass language as system prompt instruction: "Respond in ${language}"
// 3. Learning site names in KE/TZ/UG/UK/USA are in:
//    - Kiswahili (East African sites): Jumuiya, Mwasama, Msichoke vocabulary
//    - English (UK/USA sites): standard
// 4. Consider maintaining translated visionStatements in LearningSite type
// 5. OpenRouter free models support multilingual responses adequately

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY ?? '',
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.query !== 'string' || !body.query.trim()) {
    return Response.json({ error: 'Query required' }, { status: 400 });
  }

  const { query } = body as { query: string };

  if (!process.env.OPENROUTER_API_KEY) {
    return Response.json(
      { error: 'Search service not configured. OPENROUTER_API_KEY is missing.' },
      { status: 503 }
    );
  }

  // Build context from learning sites (simple RAG over static data)
  const sitesContext = learningSites
    .map(
      (s) =>
        `Site: ${s.name}\nLocation: ${s.location}\nFocus: ${s.visionStatement}\nCategories: ${s.focusAreas?.join(', ') ?? s.category}`
    )
    .join('\n\n');

  const { text } = await generateText({
    model: openrouter('meta-llama/llama-3.1-8b-instruct:free'),
    system: `You are a helpful assistant for Barbets Duet, a network of conservation learning sites across East Africa and beyond (Kenya, Tanzania, Uganda, UK, USA).
Help users discover which learning sites are relevant to their questions.
Be concise and direct — 2-4 sentences maximum.
Recommend the most relevant 1-3 sites by name when possible.`,
    prompt: `Available learning sites:\n${sitesContext}\n\nUser query: ${query}`,
    maxOutputTokens: 300,
  });

  return Response.json({ result: text });
}
