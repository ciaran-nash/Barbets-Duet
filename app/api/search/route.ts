import { generateText } from 'ai';
import { learningSites } from '@/lib/data/learning-sites';

// Search routes through the Vercel AI Gateway: pass a plain "provider/model"
// string and the gateway resolves the provider. On Vercel, auth is handled by
// OIDC automatically; for local dev set AI_GATEWAY_API_KEY in .env.local.
// Swap the model without code changes via SEARCH_MODEL
// (e.g. "anthropic/claude-haiku-4.5" or "openai/gpt-4o-mini").
const SEARCH_MODEL = process.env.SEARCH_MODEL ?? 'openai/gpt-4o-mini';

// TODO(multilingual): When implementing multilingual support:
// 1. Detect request language from Accept-Language header
// 2. Pass language as system prompt instruction: "Respond in ${language}"
// 3. East African sites use Kiswahili vocabulary; UK/USA sites English.
// 4. Consider maintaining translated visionStatements in LearningSite type.

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.query !== 'string' || !body.query.trim()) {
    return Response.json({ error: 'Query required' }, { status: 400 });
  }

  const { query } = body as { query: string };

  // Build context from learning sites (simple RAG over static data)
  const sitesContext = learningSites
    .map(
      (s) =>
        `Site: ${s.name}\nLocation: ${s.location}\nFocus: ${s.visionStatement}\nCategories: ${s.focusAreas?.join(', ') ?? s.category}`
    )
    .join('\n\n');

  try {
    const { text } = await generateText({
      model: SEARCH_MODEL,
      system: `You are a helpful assistant for Barbets Duet, a network of conservation learning sites across East Africa and beyond (Kenya, Tanzania, Uganda, UK, USA).
Help users discover which learning sites are relevant to their questions.
Be concise and direct — 2-4 sentences maximum.
Recommend the most relevant 1-3 sites by name when possible.`,
      prompt: `Available learning sites:\n${sitesContext}\n\nUser query: ${query}`,
      maxOutputTokens: 300,
    });

    return Response.json({ result: text });
  } catch (err) {
    console.error('[search] AI Gateway error:', err instanceof Error ? err.message : err);
    return Response.json(
      { error: 'Search is temporarily unavailable.' },
      { status: 503 }
    );
  }
}
