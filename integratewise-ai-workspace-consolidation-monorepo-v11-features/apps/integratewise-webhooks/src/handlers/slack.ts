import type { Context } from 'hono';
import { SlackWebhookSchema } from '@integratewise/types/webhooks';
import { normalizeSlackEvent } from '@integratewise/lib/normalizers';
import { verifySlackSignature } from '../lib/signature';

type Log = {
  info: (message: string, data?: Record<string, unknown>) => void;
  warn: (message: string, data?: Record<string, unknown>) => void;
  error: (message: string, data?: Record<string, unknown>) => void;
};

export async function slackHandler(c: Context) {
  const log = c.get('log') as Log;

  // Get raw body for signature verification (use stored body if available from idempotency middleware)
  const rawBody = (c.get('webhookRawBody') as string | undefined) || await c.req.text();
  const signature = c.req.header('x-slack-signature');
  const timestamp = c.req.header('x-slack-request-timestamp');

  // Parse body
  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    log.warn('Invalid JSON payload');
    return c.json({ error: 'Invalid payload' }, 400);
  }

  const parsed = SlackWebhookSchema.safeParse(body);

  if (!parsed.success) {
    log.warn('Invalid Slack payload schema', { errors: parsed.error.flatten() });
    return c.json({ error: 'Invalid payload' }, 400);
  }

  // Handle URL verification challenge (must respond before signature check per Slack docs)
  if (parsed.data.challenge) {
    return c.text(parsed.data.challenge);
  }

  // Verify Slack signature for actual events
  const isValid = await verifySlackSignature(
    rawBody,
    signature ?? null,
    timestamp ?? null,
    c.env.SLACK_SIGNING_SECRET ?? '',
  );

  if (!isValid) {
    log.warn('Invalid Slack signature', {
      hasSignature: !!signature,
      hasTimestamp: !!timestamp,
    });
    return c.json({ error: 'Invalid signature' }, 401);
  }

  log.info('Slack webhook received', {
    eventType: parsed.data.event?.type,
    teamId: parsed.data.team_id,
  });

  const spineEvent = normalizeSlackEvent(parsed.data);

  // Forward to core engine
  const response = await fetch(`${c.env.CORE_ENGINE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-request-id': c.get('requestId'),
    },
    body: JSON.stringify(spineEvent),
  });

  if (!response.ok) {
    log.error('Failed to forward Slack event', { status: response.status });
    return c.json({ error: 'Failed to forward event' }, 500);
  }

  return c.json({ ok: true });
}
