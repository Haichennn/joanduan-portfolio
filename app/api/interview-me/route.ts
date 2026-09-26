/**
 * Interview Me API Route
 * ======================
 * POST /api/interview-me
 * Body: { query: string }
 * Response: streamed text (Claude's grounded answer)
 *
 * Uses direct fetch to Voyage REST API (the voyageai npm package has an ESM build bug
 * that breaks under Next.js Turbopack — fetch is simpler and bypasses the issue entirely).
 */

import Anthropic from "@anthropic-ai/sdk";
import { waitUntil } from "@vercel/functions";
import knowledgeBase from "../../lib/knowledge-base-embedded.json";
import { SYSTEM_PROMPT_TEMPLATE } from "../../lib/knowledge-base-raw";
import { logConversation } from "@/lib/logging";

export const runtime = "nodejs";
export const maxDuration = 30;

const CONFIG_VERSION = "v1-baseline";

// ---- Types ------------------------------------------------------------------
type Chunk = {
  id: string;
  type: string;
  text: string;
  metadata: { topic_tags: string[]; honesty_notes?: string[] };
  embedding: number[];
};
type ScoredChunk = Chunk & { score: number };

// ---- Cosine similarity ------------------------------------------------------
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(`Dim mismatch: ${a.length} vs ${b.length}`);
  }
  let dot = 0,
    nA = 0,
    nB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    nA += a[i] * a[i];
    nB += b[i] * b[i];
  }
  return dot / (Math.sqrt(nA) * Math.sqrt(nB));
}

// ---- Voyage embedding via REST (bypasses buggy SDK) -------------------------
async function embedQuery(query: string, apiKey: string): Promise<number[]> {
  const res = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      input: [query],
      model: "voyage-3",
      input_type: "query",
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Voyage API ${res.status}: ${errText}`);
  }
  const json = (await res.json()) as { data: { embedding: number[] }[] };
  return json.data[0].embedding;
}

// ---- Retrieve top-K chunks --------------------------------------------------
function retrieveTopK(queryEmbedding: number[], k: number = 3): ScoredChunk[] {
  const chunks = (knowledgeBase as { chunks: Chunk[] }).chunks;
  const scored = chunks.map((c) => ({
    ...c,
    score: cosineSimilarity(queryEmbedding, c.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k);
}

function buildContextBlock(chunks: ScoredChunk[]): string {
  return chunks
    .map(
      (c, i) => {
        const block = `--- Context ${i + 1} (relevance: ${c.score.toFixed(3)}, source: ${c.id}) ---\n${c.text}`;
        const notes = c.metadata?.honesty_notes ?? [];
        if (notes.length === 0) return block;
        return `${block}\n\nNotes for answering about this chunk:\n${notes
          .map((n) => `- ${n}`)
          .join("\n")}`;
      }
    )
    .join("\n\n");
}

// ---- POST handler -----------------------------------------------------------
export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query || typeof query !== "string" || !query.trim()) {
      return new Response(JSON.stringify({ error: "Query is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (query.length > 500) {
      return new Response(
        JSON.stringify({ error: "Query too long (max 500 chars)" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const voyageKey = process.env.VOYAGE_API_KEY;
    if (!anthropicKey || !voyageKey) {
      return new Response(
        JSON.stringify({ error: "Missing API keys in environment" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const startTime = Date.now();

    // Step 1: Embed query
    const queryEmbedding = await embedQuery(query, voyageKey);

    // Step 2: Retrieve top 5 chunks
    const topChunks = retrieveTopK(queryEmbedding, 5);
    const contextBlock = buildContextBlock(topChunks);

    // Step 3: Build grounded system prompt
    const systemPrompt = SYSTEM_PROMPT_TEMPLATE.replace("{CONTEXT}", contextBlock);

    // Step 4: Stream from Claude
    const anthropic = new Anthropic({ apiKey: anthropicKey });
    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: query }],
    });

    const MODEL_NAME = "claude-sonnet-4-5";
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        let responseBuffer = "";
        let outputTokens: number | null = null;
        let inputTokens: number | null = null;

        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              responseBuffer += event.delta.text;
              controller.enqueue(encoder.encode(event.delta.text));
            } else if (event.type === "message_start") {
              inputTokens = event.message.usage?.input_tokens ?? null;
            } else if (event.type === "message_delta") {
              outputTokens = event.usage?.output_tokens ?? null;
            }
          }
          controller.close();

          waitUntil(
            logConversation({
              session_id: null,
              user_query: query,
              assistant_response: responseBuffer,
              model: MODEL_NAME,
              config_version: CONFIG_VERSION,
              latency_ms: Date.now() - startTime,
              prompt_tokens: inputTokens,
              completion_tokens: outputTokens,
              error: null,
              retrievals: topChunks.map((c, i) => ({
                rank: i + 1,
                chunk_id: c.id,
                chunk_text: c.text,
                similarity_score: c.score,
                source: c.id,
              })),
            })
          );
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : String(err);
          controller.error(err);

          waitUntil(
            logConversation({
              session_id: null,
              user_query: query,
              assistant_response: responseBuffer || null,
              model: MODEL_NAME,
              config_version: CONFIG_VERSION,
              latency_ms: Date.now() - startTime,
              prompt_tokens: inputTokens,
              completion_tokens: outputTokens,
              error: errMsg,
              retrievals: topChunks.map((c, i) => ({
                rank: i + 1,
                chunk_id: c.id,
                chunk_text: c.text,
                similarity_score: c.score,
                source: c.id,
              })),
            })
          );
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[interview-me] Error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
