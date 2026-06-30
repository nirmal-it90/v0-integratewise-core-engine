/**
 * Spine Event Type Definition
 * Standalone version for Core Engine
 */

import { z } from 'zod';

/**
 * Spine Event Schema
 * Normalized event format from webhook workers
 */
export const SpineEventSchema = z.object({
  id: z.string().uuid(),
  source: z.string().describe('Event source (stripe, slack, hubspot, etc.)'),
  type: z.string().describe('Event type (payment_intent.succeeded, app_mention, etc.)'),
  timestamp: z.string(),
  payload: z.record(z.unknown()).describe('Event payload data'),
  metadata: z.record(z.unknown()).optional().describe('Additional metadata'),
});

export type SpineEvent = z.infer<typeof SpineEventSchema>;
