import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

import knowledgeBase from '../../app/lib/knowledge-base-embedded.json' assert { type: 'json' }

const VOYAGE_API_KEY = process.env.VOYAGE_API_KEY
const VOYAGE_MODEL = 'voyage-3'
const VOYAGE_ENDPOINT = 'https://api.voyageai.com/v1/embeddings'
const REQUEST_DELAY_MS = 200
const TOP_K_VALUES = [1, 3, 5]
const RETRIEVAL_K = Math.max(...TOP_K_VALUES)

const GROUND_TRUTH_PATH = resolve('scripts/eval/ground-truth.json')
const OUTPUT_DIR = resolve('scripts/eval/results')

if (!VOYAGE_API_KEY) {
  console.error('VOYAGE_API_KEY is missing. Add it to .env.local before running.')
  process.exit(1)
}

type Chunk = {
  id: string
  type: string
  text: string
  metadata: Record<string, unknown>
  embedding: number[]
}

type GroundTruthQuery = {
  id: string
  persona: string
  query: string
  relevant_chunks: string[]
  expected_to_fail?: boolean
  note?: string
}

type GroundTruth = {
  version: string
  config_version: string
  notes: string
  queries: GroundTruthQuery[]
}

type QueryResult = {
  id: string
  persona: string
  query: string
  relevant_chunks: string[]
  retrieved_chunks: Array<{ id: string; score: number; is_relevant: boolean }>
  recall_at: Record<number, number>
  reciprocal_rank: number
  expected_to_fail?: boolean
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Embedding dimension mismatch')
  }
  let dot = 0
  let nA = 0
  let nB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    nA += a[i] * a[i]
    nB += b[i] * b[i]
  }
  return dot / (Math.sqrt(nA) * Math.sqrt(nB))
}

async function embedQuery(query: string): Promise<number[]> {
  const res = await fetch(VOYAGE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      input: [query],
      model: VOYAGE_MODEL,
      input_type: 'query',
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Voyage API ${res.status}: ${body}`)
  }
  const json = (await res.json()) as { data: { embedding: number[] }[] }
  return json.data[0].embedding
}

function retrieveTopK(queryEmbedding: number[], chunks: Chunk[], k: number) {
  const scored = chunks.map((c) => ({
    id: c.id,
    score: cosineSimilarity(queryEmbedding, c.embedding),
  }))
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, k)
}

function computeRecallAtK(retrieved: Array<{ id: string }>, relevant: string[], k: number): number {
  const topK = retrieved.slice(0, k).map((r) => r.id)
  const hits = topK.filter((id) => relevant.includes(id)).length
  return relevant.length === 0 ? 0 : hits / relevant.length
}

function computeReciprocalRank(retrieved: Array<{ id: string }>, relevant: string[]): number {
  for (let i = 0; i < retrieved.length; i++) {
    if (relevant.includes(retrieved[i].id)) {
      return 1 / (i + 1)
    }
  }
  return 0
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + '%'
}

function mean(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((a, b) => a + b, 0) / values.length
}

async function main() {
  const groundTruthRaw = await readFile(GROUND_TRUTH_PATH, 'utf-8')
  const groundTruth = JSON.parse(groundTruthRaw) as GroundTruth
  const chunks = (knowledgeBase as { chunks: Chunk[] }).chunks

  console.log('')
  console.log('========================================')
  console.log('Interview Me — Retrieval Evaluation')
  console.log('========================================')
  console.log(`Config:         ${groundTruth.config_version}`)
  console.log(`Ground truth:   ${groundTruth.version}`)
  console.log(`Queries:        ${groundTruth.queries.length}`)
  console.log(`KB chunks:      ${chunks.length}`)
  console.log(`Retrieval K:    ${RETRIEVAL_K}`)
  console.log('')

  const results: QueryResult[] = []

  for (const q of groundTruth.queries) {
    process.stdout.write(`  [${q.id}] ${q.persona.padEnd(10)} ... `)
    const queryEmbedding = await embedQuery(q.query)
    const retrieved = retrieveTopK(queryEmbedding, chunks, RETRIEVAL_K)
    const retrievedAnnotated = retrieved.map((r) => ({
      ...r,
      is_relevant: q.relevant_chunks.includes(r.id),
    }))
    const recallAt: Record<number, number> = {}
    for (const k of TOP_K_VALUES) {
      recallAt[k] = computeRecallAtK(retrieved, q.relevant_chunks, k)
    }
    const rr = computeReciprocalRank(retrieved, q.relevant_chunks)
    results.push({
      id: q.id,
      persona: q.persona,
      query: q.query,
      relevant_chunks: q.relevant_chunks,
      retrieved_chunks: retrievedAnnotated,
      recall_at: recallAt,
      reciprocal_rank: rr,
      expected_to_fail: q.expected_to_fail,
    })
    const rrDisplay = rr === 0 ? '0.00' : rr.toFixed(2)
    console.log(`R@1=${pct(recallAt[1])} R@3=${pct(recallAt[3])} R@5=${pct(recallAt[5])} RR=${rrDisplay}`)
    await new Promise((r) => setTimeout(r, REQUEST_DELAY_MS))
  }

  console.log('')
  console.log('=== Per-query detail ===')
  console.log('')
  for (const r of results) {
    const flag = r.expected_to_fail ? ' [EXPECTED TO FAIL]' : ''
    console.log(`[${r.id}] ${r.query}${flag}`)
    console.log(`  relevant:  ${r.relevant_chunks.join(', ')}`)
    console.log(`  retrieved top-5:`)
    r.retrieved_chunks.forEach((c, i) => {
      const mark = c.is_relevant ? ' ✓' : ''
      console.log(`    ${i + 1}. ${c.id.padEnd(40)} score=${c.score.toFixed(3)}${mark}`)
    })
    console.log(`  R@1=${pct(r.recall_at[1])}  R@3=${pct(r.recall_at[3])}  R@5=${pct(r.recall_at[5])}  RR=${r.reciprocal_rank.toFixed(3)}`)
    console.log('')
  }

  console.log('')
  console.log('=== Aggregate (all queries) ===')
  for (const k of TOP_K_VALUES) {
    const r = mean(results.map((res) => res.recall_at[k]))
    console.log(`  Mean Recall@${k}:  ${pct(r)}`)
  }
  const mrr = mean(results.map((r) => r.reciprocal_rank))
  console.log(`  MRR:             ${mrr.toFixed(3)}`)
  console.log('')

  console.log('=== Aggregate by persona ===')
  const personas = [...new Set(results.map((r) => r.persona))]
  for (const persona of personas) {
    const subset = results.filter((r) => r.persona === persona)
    console.log(`  ${persona} (n=${subset.length}):`)
    for (const k of TOP_K_VALUES) {
      const r = mean(subset.map((res) => res.recall_at[k]))
      console.log(`    R@${k}:  ${pct(r)}`)
    }
    const personaMrr = mean(subset.map((r) => r.reciprocal_rank))
    console.log(`    MRR:  ${personaMrr.toFixed(3)}`)
  }
  console.log('')

  console.log('=== Aggregate excluding expected-to-fail ===')
  const filteredResults = results.filter((r) => !r.expected_to_fail)
  console.log(`  (excluded: ${results.length - filteredResults.length} query)`)
  for (const k of TOP_K_VALUES) {
    const r = mean(filteredResults.map((res) => res.recall_at[k]))
    console.log(`  Mean Recall@${k}:  ${pct(r)}`)
  }
  const filteredMrr = mean(filteredResults.map((r) => r.reciprocal_rank))
  console.log(`  MRR:             ${filteredMrr.toFixed(3)}`)
  console.log('')

  await mkdir(OUTPUT_DIR, { recursive: true })
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const outputPath = resolve(OUTPUT_DIR, `eval-${groundTruth.config_version}-${timestamp}.json`)
  await writeFile(
    outputPath,
    JSON.stringify(
      {
        config_version: groundTruth.config_version,
        ground_truth_version: groundTruth.version,
        timestamp: new Date().toISOString(),
        kb_chunk_count: chunks.length,
        query_count: results.length,
        aggregate: {
          recall_at_1: mean(results.map((r) => r.recall_at[1])),
          recall_at_3: mean(results.map((r) => r.recall_at[3])),
          recall_at_5: mean(results.map((r) => r.recall_at[5])),
          mrr: mean(results.map((r) => r.reciprocal_rank)),
        },
        aggregate_excluding_expected_to_fail: {
          recall_at_1: mean(filteredResults.map((r) => r.recall_at[1])),
          recall_at_3: mean(filteredResults.map((r) => r.recall_at[3])),
          recall_at_5: mean(filteredResults.map((r) => r.recall_at[5])),
          mrr: mean(filteredResults.map((r) => r.reciprocal_rank)),
        },
        per_query: results,
      },
      null,
      2
    )
  )
  console.log(`Results written to: ${outputPath}`)
  console.log('')
}

main().catch((err) => {
  console.error('Evaluation failed:', err)
  process.exit(1)
})
