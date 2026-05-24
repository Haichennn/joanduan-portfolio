import { sql } from '../lib/db';

async function migrate() {
  console.log('Running migration...');

  await sql`
    CREATE TABLE IF NOT EXISTS conversations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      session_id TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      user_query TEXT NOT NULL,
      assistant_response TEXT,
      model TEXT NOT NULL,
      config_version TEXT,
      latency_ms INTEGER,
      prompt_tokens INTEGER,
      completion_tokens INTEGER,
      error TEXT
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_conversations_session ON conversations(session_id)`;

  await sql`
    CREATE TABLE IF NOT EXISTS retrievals (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
      rank INTEGER NOT NULL,
      chunk_id TEXT NOT NULL,
      chunk_text TEXT NOT NULL,
      similarity_score REAL,
      source TEXT
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS idx_retrievals_conversation ON retrievals(conversation_id)`;

  console.log('Migration complete.');
  console.log('');
  console.log('Verifying tables:');

  const tables = await sql`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name IN ('conversations', 'retrievals')
    ORDER BY table_name
  `;
  console.log(tables);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
