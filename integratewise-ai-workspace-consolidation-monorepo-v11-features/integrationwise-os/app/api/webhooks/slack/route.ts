import { type NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"
import { triageSlackMessage, type SlackMessage } from "@/lib/triage/triage-bot"
import crypto from "crypto"

// Verify Slack signature
function verifySlackSignature(signingSecret: string, signature: string, timestamp: string, body: string): boolean {
  const baseString = `v0:${timestamp}:${body}`
  const hmac = crypto.createHmac("sha256", signingSecret)
  hmac.update(baseString)
  const computedSignature = `v0=${hmac.digest("hex")}`
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature))
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const payload = JSON.parse(body)

    // Handle Slack URL verification challenge
    if (payload.type === "url_verification") {
      return NextResponse.json({ challenge: payload.challenge })
    }

    const signature = request.headers.get("x-slack-signature") || ""
    const timestamp = request.headers.get("x-slack-request-timestamp") || ""

    // Verify signature if secret is configured
    let signatureValid = true
    if (process.env.SLACK_SIGNING_SECRET) {
      signatureValid = verifySlackSignature(process.env.SLACK_SIGNING_SECRET, signature, timestamp, body)

      if (!signatureValid) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }

    const supabase = createServiceClient()

    // Log webhook
    await supabase.from("webhooks").insert({
      provider: "slack",
      event_type: payload.event?.type || payload.type || "unknown",
      event_id: payload.event_id || payload.event?.client_msg_id,
      payload,
      signature_valid: signatureValid,
    })

    // Process different event types
    if (payload.event) {
      const event = payload.event

      switch (event.type) {
        case "message":
          if (!event.bot_id && event.text) {
            // Phase 2: Triage Bot - Deduplication, Classification, Extraction
            const slackMessage: SlackMessage = {
              text: event.text,
              user: event.user,
              channel: event.channel,
              ts: event.ts,
              thread_ts: event.thread_ts,
              client_msg_id: event.client_msg_id,
              team_id: payload.team_id,
            }

            const triageResult = await triageSlackMessage(slackMessage)

            // Skip if duplicate
            if (triageResult.is_duplicate) {
              console.log(`[Triage] Duplicate message detected, skipping: ${triageResult.duplicate_of}`)
              return NextResponse.json({ ok: true, triaged: true, duplicate: true })
            }

            // Store message with triage metadata
            const { error: messageError } = await supabase.from("chat_messages").insert({
              platform: "slack",
              platform_id: event.client_msg_id || event.ts,
              channel_id: event.channel,
              team_id: payload.team_id,
              user_id: event.user,
              content: event.text,
              thread_id: event.thread_ts,
              is_bot: false,
              metadata: {
                channel: event.channel,
                user: event.user,
                thread_ts: event.thread_ts,
                team: payload.team_id,
                triage: {
                  classification: triageResult.classification,
                  priority: triageResult.priority,
                  confidence: triageResult.confidence,
                  should_route_to: triageResult.should_route_to,
                },
              },
              sent_at: new Date().toISOString(),
            })

            if (messageError) {
              console.error("Failed to store Slack message:", messageError)
            }

            // Route based on triage result
            if (triageResult.should_route_to === "spine" && triageResult.extracted_entities?.tasks) {
              // Create tasks in Spine
              for (const task of triageResult.extracted_entities.tasks) {
                const { error: taskError } = await supabase.from("tasks").insert({
                  title: task.title,
                  description: task.description || "",
                  status: "pending",
                  priority: triageResult.priority,
                  source: "slack",
                  metadata: {
                    channel: event.channel,
                    user: event.user,
                    ts: event.ts,
                    classification: triageResult.classification,
                  },
                })

                if (taskError) {
                  console.error("Failed to create task from Slack:", taskError)
                }
              }
            } else if (triageResult.should_route_to === "iq_hub") {
              // Store in IQ Hub (Brainstorming Layer)
              const { error: iqHubError } = await supabase.from("brainstorming_sessions").insert({
                title: `Slack: ${triageResult.classification}`,
                content: event.text,
                source: "slack",
                metadata: {
                  channel: event.channel,
                  user: event.user,
                  ts: event.ts,
                  classification: triageResult.classification,
                  priority: triageResult.priority,
                  extracted_entities: triageResult.extracted_entities,
                },
              })

              if (iqHubError) {
                console.error("Failed to store in IQ Hub:", iqHubError)
              }
            }
          }
          break

        case "app_mention":
          await supabase.from("tasks").insert({
            title: `Slack mention from ${event.user}`,
            description: event.text,
            status: "pending",
            priority: "medium",
            source: "slack",
            metadata: {
              channel: event.channel,
              user: event.user,
              ts: event.ts,
            },
          })
          break
      }
    }

    // Handle slash commands
    if (payload.command) {
      return NextResponse.json({
        response_type: "ephemeral",
        text: `Command received: ${payload.command} ${payload.text || ""}`,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Slack webhook error:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}
