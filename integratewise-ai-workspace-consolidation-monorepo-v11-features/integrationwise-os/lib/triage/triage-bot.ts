/**
 * Triage Bot (Triage Head)
 * 
 * Orchestrates triage, routing, and pre-conversation readiness within Slack.
 * Handles deduplication, classification, extraction, and edge learning.
 * 
 * Phase 2: Core triage logic
 */

import { createServiceClient } from "@/lib/supabase/server"

export interface SlackMessage {
  text: string
  user: string
  channel: string
  ts: string
  thread_ts?: string
  client_msg_id?: string
  team_id: string
}

export interface TriageResult {
  is_duplicate: boolean
  duplicate_of?: string
  classification: "task" | "question" | "note" | "decision" | "escalation" | "other"
  priority: "low" | "medium" | "high" | "urgent"
  extracted_entities?: {
    tasks?: Array<{ title: string; description?: string; due_date?: string }>
    people?: string[]
    projects?: string[]
    clients?: string[]
  }
  should_route_to?: "spine" | "iq_hub" | "cs_dashboard" | "support"
  confidence: number
}

/**
 * Check if message is a duplicate using content similarity and time window
 */
export async function checkDeduplication(
  message: SlackMessage,
  timeWindowMinutes: number = 60,
): Promise<{ is_duplicate: boolean; duplicate_of?: string }> {
  const supabase = createServiceClient()
  if (!supabase) {
    return { is_duplicate: false }
  }

  // Look for similar messages in the same channel within time window
  const timeWindow = new Date(Date.now() - timeWindowMinutes * 60 * 1000).toISOString()

  const { data: recentMessages } = await supabase
    .from("chat_messages")
    .select("id, content, platform_id, sent_at")
    .eq("platform", "slack")
    .eq("channel_id", message.channel)
    .gte("sent_at", timeWindow)
    .order("sent_at", { ascending: false })
    .limit(20)

  if (!recentMessages || recentMessages.length === 0) {
    return { is_duplicate: false }
  }

  // Simple content similarity check (can be enhanced with embeddings)
  const messageText = message.text.toLowerCase().trim()
  for (const recent of recentMessages) {
    const recentText = (recent.content as string)?.toLowerCase().trim() || ""
    
    // Exact match or very high similarity (>90%)
    if (recentText === messageText || calculateSimilarity(messageText, recentText) > 0.9) {
      return { is_duplicate: true, duplicate_of: recent.id }
    }
  }

  return { is_duplicate: false }
}

/**
 * Classify message type and priority
 */
export async function classifyMessage(message: SlackMessage): Promise<{
  classification: TriageResult["classification"]
  priority: TriageResult["priority"]
  confidence: number
}> {
  const text = message.text.toLowerCase()

  // Classification patterns
  const patterns = {
    task: [
      /todo:|task:|action:|need to|should do|must do|follow up|remind me/i,
      /^\s*[-*]\s*(do|fix|update|create|send|call|meet)/i,
    ],
    question: [
      /^\?|how|what|when|where|why|who|can you|could you|is there|does/i,
      /\?$/,
    ],
    decision: [
      /decided|decision|agreed|consensus|approved|rejected|chose|selected/i,
      /let's go with|we'll use|we're going to/i,
    ],
    escalation: [
      /urgent|asap|emergency|critical|blocking|escalate|help needed|stuck/i,
      /@here|@channel|@everyone/,
    ],
    note: [
      /note:|summary:|update:|status:|meeting notes|recap/i,
    ],
  }

  let classification: TriageResult["classification"] = "other"
  let maxMatches = 0

  for (const [type, typePatterns] of Object.entries(patterns)) {
    const matches = typePatterns.filter((pattern) => pattern.test(text)).length
    if (matches > maxMatches) {
      maxMatches = matches
      classification = type as TriageResult["classification"]
    }
  }

  // Priority detection
  let priority: TriageResult["priority"] = "medium"
  if (text.includes("urgent") || text.includes("asap") || text.includes("critical")) {
    priority = "urgent"
  } else if (text.includes("important") || text.includes("high priority") || text.includes("!")) {
    priority = "high"
  } else if (text.includes("low") || text.includes("whenever") || text.includes("nice to have")) {
    priority = "low"
  }

  // Confidence based on pattern matches
  const confidence = Math.min(0.5 + maxMatches * 0.15, 0.95)

  return { classification, priority, confidence }
}

/**
 * Extract entities from message (tasks, people, projects, clients)
 */
export async function extractEntities(message: SlackMessage): Promise<TriageResult["extracted_entities"]> {
  const text = message.text
  const entities: TriageResult["extracted_entities"] = {
    tasks: [],
    people: [],
    projects: [],
    clients: [],
  }

  // Extract tasks (lines starting with "todo:", "-", "*", or numbered)
  const taskPatterns = [
    /todo:\s*(.+)/gi,
    /^\s*[-*]\s*(.+)/gm,
    /^\s*\d+\.\s*(.+)/gm,
  ]

  for (const pattern of taskPatterns) {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      const taskText = match[1]?.trim()
      if (taskText && taskText.length > 3) {
        entities.tasks?.push({
          title: taskText,
          description: undefined,
        })
      }
    }
  }

  // Extract people mentions (@username or names)
  const peoplePattern = /@(\w+)/g
  const peopleMatches = text.matchAll(peoplePattern)
  for (const match of peopleMatches) {
    if (match[1] && !entities.people?.includes(match[1])) {
      entities.people?.push(match[1])
    }
  }

  // Extract project/client names (capitalized words, common patterns)
  const projectPattern = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/g
  const projectMatches = text.matchAll(projectPattern)
  for (const match of projectMatches) {
    const potentialProject = match[1]
    // Filter out common words
    if (
      potentialProject.length > 3 &&
      !["The", "This", "That", "There", "These", "Those"].includes(potentialProject)
    ) {
      entities.projects?.push(potentialProject)
    }
  }

  return entities
}

/**
 * Determine routing destination
 */
export function determineRouting(
  classification: TriageResult["classification"],
  priority: TriageResult["priority"],
): TriageResult["should_route_to"] {
  if (classification === "escalation" || priority === "urgent") {
    return "support"
  }

  if (classification === "task") {
    return "spine"
  }

  if (classification === "question" || classification === "note") {
    return "iq_hub"
  }

  if (classification === "decision") {
    return "spine" // Decisions should be stored in Spine
  }

  return "iq_hub" // Default to IQ Hub for unstructured content
}

/**
 * Main triage function
 */
export async function triageSlackMessage(message: SlackMessage): Promise<TriageResult> {
  // 1. Deduplication
  const { is_duplicate, duplicate_of } = await checkDeduplication(message)

  if (is_duplicate) {
    return {
      is_duplicate: true,
      duplicate_of,
      classification: "other",
      priority: "low",
      confidence: 1.0,
    }
  }

  // 2. Classification
  const { classification, priority, confidence } = await classifyMessage(message)

  // 3. Entity extraction
  const extracted_entities = await extractEntities(message)

  // 4. Routing decision
  const should_route_to = determineRouting(classification, priority)

  return {
    is_duplicate: false,
    classification,
    priority,
    extracted_entities,
    should_route_to,
    confidence,
  }
}

/**
 * Simple string similarity (Jaccard similarity)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const words1 = new Set(str1.split(/\s+/))
  const words2 = new Set(str2.split(/\s+/))

  const intersection = new Set([...words1].filter((x) => words2.has(x)))
  const union = new Set([...words1, ...words2])

  return intersection.size / union.size
}
