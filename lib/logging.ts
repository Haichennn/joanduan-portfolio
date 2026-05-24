import { sql } from './db';

export type RetrievalLog = {
  rank: number;
  chunk_id: string;
  chunk_text: string;
  similarity_score: number;
  source: string | null;
};

export type ConversationLog = {
  session_id: string | null;
  user_query: string;
  assistant_response: string | null;
  model: string;
  config_version: string | null;
  latency_ms: number;
  prompt_tokens: number | null;
  completion_tokens: number | null;
  error: string | null;
  retrievals: RetrievalLog[];
};

export async function logConversation(entry: ConversationLog): Promise<void> {
  try {
    const [row] = await sql`
      INSERT INTO conversations (
        session_id, user_query, assistant_response, model, config_version,
        latency_ms, prompt_tokens, completion_tokens, error
      ) VALUES (
        ${entry.session_id}, ${entry.user_query}, ${entry.assistant_response},
        ${entry.model}, ${entry.config_version}, ${entry.latency_ms},
        ${entry.prompt_tokens}, ${entry.completion_tokens}, ${entry.error}
      ) RETURNING id
    `;
    const conversationId = row.id as string;

    if (entry.retrievals.length > 0) {
      for (const r of entry.retrievals) {
        await sql`
          INSERT INTO retrievals (
            conversation_id, rank, chunk_id, chunk_text, similarity_score, source
          ) VALUES (
            ${conversationId}, ${r.rank}, ${r.chunk_id}, ${r.chunk_text},
            ${r.similarity_score}, ${r.source}
          )
        `;
      }
    }
  } catch (err) {
    console.error('[logging] Failed to write conversation log:', err);
  }
}
