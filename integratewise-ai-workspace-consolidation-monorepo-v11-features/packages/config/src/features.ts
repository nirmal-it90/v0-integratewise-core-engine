import { z } from 'zod';

// Feature flag schema
export const featureFlagsSchema = z.object({
  CONTENT_MODERATION_ENABLED: z.coerce.boolean().default(false),
  CRON_ENABLED: z.coerce.boolean().default(false),
  AUTO_EXECUTE_LOW_RISK_ACTIONS: z.coerce.boolean().default(false),
  AI_ROUTING_ENABLED: z.coerce.boolean().default(true),
  WEBHOOK_RETRY_ENABLED: z.coerce.boolean().default(true),
});

export type FeatureFlags = z.infer<typeof featureFlagsSchema>;

// Get feature flags from environment
export function getFeatureFlags(): FeatureFlags {
  const result = featureFlagsSchema.safeParse({
    CONTENT_MODERATION_ENABLED: process.env.CONTENT_MODERATION_ENABLED,
    CRON_ENABLED: process.env.CRON_ENABLED,
    AUTO_EXECUTE_LOW_RISK_ACTIONS: process.env.AUTO_EXECUTE_LOW_RISK_ACTIONS,
    AI_ROUTING_ENABLED: process.env.AI_ROUTING_ENABLED,
    WEBHOOK_RETRY_ENABLED: process.env.WEBHOOK_RETRY_ENABLED,
  });

  if (!result.success) {
    console.warn('Feature flags validation warning:', result.error.flatten().fieldErrors);
    return featureFlagsSchema.parse({});
  }

  return result.data;
}

// Check if a feature is enabled
export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags();
  return flags[flag];
}
