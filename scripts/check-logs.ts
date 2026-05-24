import { sql } from '../lib/db';

async function check() {
  const convs = await sql`
    SELECT id, created_at, user_query, 
           LEFT(assistant_response, 80) as preview,
           latency_ms, prompt_tokens, completion_tokens, model, config_version, error 
    FROM conversations 
    ORDER BY created_at DESC 
    LIMIT 3
  `;
  console.log('=== Latest 3 conversations ===');
  console.table(convs);

  if (convs.length > 0) {
    const latestId = convs[0].id;
    const rets = await sql`
      SELECT rank, chunk_id, 
             ROUND(similarity_score::numeric, 3) as score,
             LEFT(chunk_text, 60) as text_preview 
      FROM retrievals 
      WHERE conversation_id = ${latestId} 
      ORDER BY rank
    `;
    console.log('');
    console.log('=== Retrievals for latest conversation ===');
    console.table(rets);
  }
}

check().catch((err) => {
  console.error('Check failed:', err);
  process.exit(1);
});