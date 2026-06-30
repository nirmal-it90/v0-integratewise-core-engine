/**
 * Environment types for Cloudflare Workers
 */

export interface Env {
  DATABASE_URL: string;
  OPENAI_API_KEY?: string;
  ANTHROPIC_API_KEY?: string;
  ENVIRONMENT?: string;
}
