import { z } from "zod"

// Server-side environment schema
export const serverEnvSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // AI APIs
  OPENAI_API_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1).optional(),
  DEEPSEEK_API_KEY: z.string().min(1).optional(),

  // Auth (Clerk)
  CLERK_SECRET_KEY: z.string().min(1),
  CLERK_JWKS_URL: z.string().url().optional(),

  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),

  // Razorpay
  RAZORPAY_KEY_ID: z.string().min(1).optional(),
  RAZORPAY_KEY_SECRET: z.string().min(1).optional(),

  // Cloudflare
  CLOUDFLARE_ACCOUNT_ID: z.string().min(1).optional(),
  CLOUDFLARE_API_TOKEN: z.string().min(1).optional(),

  // Slack
  SLACK_SIGNING_SECRET: z.string().min(1).optional(),
  SLACK_BOT_TOKEN: z.string().min(1).optional(),

  // Discord
  DISCORD_PUBLIC_KEY: z.string().min(1).optional(),
  DISCORD_BOT_TOKEN: z.string().min(1).optional(),

  // Notion
  NOTION_API_KEY: z.string().min(1).optional(),

  // Attio
  ATTIO_API_KEY: z.string().min(1).optional(),

  // Environment
  NODE_ENV: z.enum(["development", "staging", "production"]).default("development"),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

// Client-side environment schema (only public vars)
export const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_HUB_URL: z.string().url().optional(),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
})

export type ClientEnv = z.infer<typeof clientEnvSchema>

// Validate server environment
export function validateServerEnv(): ServerEnv {
  const result = serverEnvSchema.safeParse(process.env)

  if (!result.success) {
    console.error("Invalid server environment variables:")
    console.error(result.error.flatten().fieldErrors)
    throw new Error("Invalid server environment configuration")
  }

  return result.data
}

// Get typed environment variable
export function getEnv<K extends keyof ServerEnv>(key: K): ServerEnv[K] {
  const env = validateServerEnv()
  return env[key]
}
