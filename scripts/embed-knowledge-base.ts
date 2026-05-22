import { config } from 'dotenv'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { knowledgeBase, type KnowledgeChunk } from '../app/lib/knowledge-base-raw'

config({ path: '.env.local' })

const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY
const MODEL = 'voyage-3'
const ENDPOINT = 'https://api.voyageai.com/v1/embeddings'
const REQUEST_DELAY_MS = 200
const OUTPUT_PATH = resolve('app/lib/knowledge-base-embedded.json')

if (!VOYAGE_API_KEY) {
  console.error(
    '❌ VOYAGE_API_KEY is missing. Add it to .env.local before running this script.'
  )
  process.exit(1)
}

interface VoyageEmbeddingResponse {
  data: { embedding: number[]; index: number; object: string }[]
  model: string
  usage: { total_tokens: number }
}

interface EmbeddedChunk extends KnowledgeChunk {
  embedding: number[]
}

async function embedText(text: string): Promise<number[]> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      input: [text],
      model: MODEL,
      input_type: 'document',
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Voyage API error ${response.status}: ${body}`)
  }

  const payload = (await response.json()) as VoyageEmbeddingResponse
  const embedding = payload.data[0]?.embedding
  if (!embedding) {
    throw new Error(
      `Voyage response missing embedding: ${JSON.stringify(payload)}`
    )
  }
  return embedding
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

async function main(): Promise<void> {
  const total = knowledgeBase.length
  const embedded: EmbeddedChunk[] = []

  for (let i = 0; i < total; i++) {
    const chunk = knowledgeBase[i]
    console.log(`Embedding chunk ${i + 1} of ${total}: ${chunk.id}`)
    const embedding = await embedText(chunk.text)
    embedded.push({
      id: chunk.id,
      type: chunk.type,
      text: chunk.text,
      metadata: chunk.metadata,
      embedding,
    })
    if (i < total - 1) {
      await sleep(REQUEST_DELAY_MS)
    }
  }

  const dimensions = embedded[0]?.embedding.length ?? 0

  const output = {
    model: MODEL,
    dimensions,
    chunk_count: embedded.length,
    chunks: embedded,
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8')

  console.log('')
  console.log('✅ Done.')
  console.log(`   Total chunks embedded: ${embedded.length}`)
  console.log(`   Embedding dimension:   ${dimensions}`)
  console.log(`   Output file:           ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error('❌ Embedding failed:', err)
  process.exit(1)
})
