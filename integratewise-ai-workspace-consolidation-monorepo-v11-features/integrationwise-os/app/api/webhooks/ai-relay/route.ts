/**
 * AI-Relay Gateway Webhook
 * 
 * Single entry/exit point for all AI agent messages and AI chat captures.
 * Standardizes payloads and creates an audit trail.
 * 
 * Phase 1: Basic intake, normalization, and audit logging
 */

import { type NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"
import crypto from "crypto"

// Standardized AI-Relay payload schema
interface AIRelayPayload {
  type: "chat.completion" | "chat.import" | "task.extraction" | "summary" | "insight" | "decision"
  source: "claude" | "chatgpt" | "gemini" | "perplexity" | "slack_ai" | "custom"
  workspace_id?: string
  user_id?: string
  conversation_id?: string
  message_id?: string
  content: {
    text?: string
    role?: "user" | "assistant" | "system"
    metadata?: Record<string, unknown>
  }
  context?: {
    channel?: string
    thread_id?: string
    url?: string
    timestamp?: string
  }
  extracted_entities?: {
    tasks?: Array<{ title: string; description?: string; priority?: string }>
    decisions?: Array<{ title: string; outcome: string }>
    notes?: Array<{ content: string; tags?: string[] }>
  }
  timestamp?: string
}

// Verify AI-Relay signature
function verifyAIRelaySignature(
  signingSecret: string,
  signature: string,
  timestamp: string,
  body: string,
): boolean {
  const baseString = `v1:${timestamp}:${body}`
  const hmac = crypto.createHmac("sha256", signingSecret)
  hmac.update(baseString)
  const computedSignature = `v1=${hmac.digest("hex")}`
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature))
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    let payload: AIRelayPayload

    try {
      payload = JSON.parse(body)
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 })
    }

    // Verify signature if secret is configured
    const signature = request.headers.get("x-ai-relay-signature") || ""
    const timestamp = request.headers.get("x-ai-relay-timestamp") || Date.now().toString()
    let signatureValid = true

    if (process.env.AI_RELAY_SIGNING_SECRET) {
      signatureValid = verifyAIRelaySignature(
        process.env.AI_RELAY_SIGNING_SECRET,
        signature,
        timestamp,
        body,
      )

      if (!signatureValid) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }

    const supabase = createServiceClient()

    // Generate event ID if not provided
    const eventId = payload.message_id || `ai-relay-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // 1. Audit log: Store raw webhook event
    const { error: webhookError } = await supabase.from("webhooks").insert({
      provider: "ai-relay",
      event_type: payload.type,
      event_id: eventId,
      payload: payload,
      signature_valid: signatureValid,
      metadata: {
        source: payload.source,
        workspace_id: payload.workspace_id,
        user_id: payload.user_id,
        conversation_id: payload.conversation_id,
      },
    })

    if (webhookError) {
      console.error("Failed to log AI-Relay webhook:", webhookError)
      // Continue processing even if audit log fails
    }

    // 2. Route to appropriate handler based on type
    switch (payload.type) {
      case "chat.completion":
      case "chat.import":
        // Store in IQ Hub (Brainstorming Layer)
        if (payload.content?.text) {
          const { error: brainstormError } = await supabase
            .from("brainstorming_sessions")
            .insert({
              title: `AI Chat from ${payload.source}`,
              content: payload.content.text,
              source: payload.source,
              metadata: {
                conversation_id: payload.conversation_id,
                message_id: payload.message_id,
                context: payload.context,
                role: payload.content.role,
              },
              workspace_id: payload.workspace_id || null,
            })

          if (brainstormError) {
            console.error("Failed to store in IQ Hub:", brainstormError)
          }
        }
        break

      case "task.extraction":
        // Extract tasks and store in Spine
        if (payload.extracted_entities?.tasks) {
          for (const task of payload.extracted_entities.tasks) {
            const { error: taskError } = await supabase.from("tasks").insert({
              title: task.title,
              description: task.description || "",
              status: "pending",
              priority: (task.priority as "low" | "medium" | "high") || "medium",
              source: "ai-relay",
              metadata: {
                source_type: payload.source,
                conversation_id: payload.conversation_id,
                extracted_at: new Date().toISOString(),
              },
              workspace_id: payload.workspace_id || null,
            })

            if (taskError) {
              console.error("Failed to create task:", taskError)
            }
          }
        }
        break

      case "summary":
      case "insight":
      case "decision":
        // Store as brainstorming content with special type
        const { error: insightError } = await supabase.from("brainstorming_content").insert({
          session_id: null, // Can be linked later
          content: payload.content?.text || JSON.stringify(payload.extracted_entities),
          content_type: payload.type,
          source: payload.source,
          metadata: {
            conversation_id: payload.conversation_id,
            context: payload.context,
          },
          workspace_id: payload.workspace_id || null,
        })

        if (insightError) {
          console.error("Failed to store insight:", insightError)
        }
        break
    }

    // 3. Return standardized response
    return NextResponse.json({
      ok: true,
      event_id: eventId,
      processed: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI-Relay webhook error:", error)
    return NextResponse.json(
      {
        error: "Failed to process AI-Relay webhook",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    service: "ai-relay-gateway",
    status: "operational",
    version: "1.0.0",
  })
}
