import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { structuredLog, getRequestId } from './lib/logging';
import { idempotencyMiddleware } from './lib/idempotency';
import { TOOL_REGISTRY, getToolConfig } from './lib/tool-registry';

// Existing handlers
import { stripeHandler } from './handlers/stripe';
import { hubspotHandler } from './handlers/hubspot';
import { slackHandler } from './handlers/slack';
import { discordHandler } from './handlers/discord';
import { notionHandler } from './handlers/notion';
import { aiRelayHandler } from './handlers/ai-relay';
import { webformHandler, webformInfoHandler } from './handlers/webform';
import { webflowHandler } from './handlers/webflow';

// Cron handlers
import {
  dailyInsightsHandler,
  hourlyInsightsHandler,
  spendInsightsHandler,
  outboxHandler,
  integrityCheckHandler,
  syncSchedulerHandler,
} from './handlers/cron';

// Loader handlers
import {
  slackLoaderHandler,
  hubspotLoaderHandler,
  notionLoaderHandler,
  gmailLoaderHandler,
  sheetsLoaderHandler,
} from './handlers/loaders';

// API handlers
import {
  brainstormHandler,
  neutronIngestHandler,
  dataSyncHandler,
  webhookSchedulerHandler,
} from './handlers/api';

// Integration handlers
import { asanaHandler, githubHandler } from './handlers/integrations';

// Tools management handlers
import {
  toolsRegistryHandler,
  toolInfoHandler,
  toolsHealthHandler,
  createToolHealthHandler,
} from './handlers/tools';

type Bindings = {
  CORE_ENGINE_URL: string;
  STRIPE_WEBHOOK_SECRET: string;
  HUBSPOT_WEBHOOK_SECRET: string;
  SLACK_SIGNING_SECRET: string;
  AI_RELAY_WEBHOOK_SECRET: string;
  WEBFLOW_WEBHOOK_SECRET: string;
  WEBFLOW_API_KEY: string;
  ENVIRONMENT: string;
  // KV namespace for idempotency
  WEBHOOK_IDEMPOTENCY: KVNamespace;
  // Queue for dead letter
  DEAD_LETTER_QUEUE: Queue;
};

type Variables = {
  requestId: string;
  log: ReturnType<typeof structuredLog>;
  webhookRawBody?: string; // Stored raw body from idempotency middleware
  toolConfig?: ReturnType<typeof getToolConfig>;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// CORS for preflight
app.use('*', cors());

// Request ID and logging middleware
app.use('*', async (c, next) => {
  const requestId = getRequestId(c.req.header('x-request-id'));
  c.set('requestId', requestId);
  c.set('log', structuredLog(requestId, c.env.ENVIRONMENT));

  const log = c.get('log');
  const start = Date.now();

  log.info('Request started', {
    method: c.req.method,
    path: c.req.path,
  });

  await next();

  log.info('Request completed', {
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    durationMs: Date.now() - start,
  });

  c.res.headers.set('x-request-id', requestId);
});

// Tool config middleware - injects tool config for routes
app.use('/webhooks/*', async (c, next) => {
  const path = c.req.path;
  const tool = TOOL_REGISTRY.find(t => path.includes(t.endpoint));
  if (tool) {
    c.set('toolConfig', tool);
  }
  await next();
});

// ============================================================================
// SYSTEM ENDPOINTS
// ============================================================================

// Health check
app.get('/health', c => {
  return c.json({
    status: 'ok',
    worker: 'integratewise-webhooks',
    environment: c.env.ENVIRONMENT,
    timestamp: new Date().toISOString(),
    tools: {
      total: TOOL_REGISTRY.length,
      enabled: TOOL_REGISTRY.filter(t => t.enabled).length,
    },
  });
});

// Tools registry
app.get('/tools', toolsRegistryHandler);
app.get('/tools/health', toolsHealthHandler);
app.get('/tools/:id', toolInfoHandler);
app.get('/tools/:id/health', (c) => {
  const toolId = c.req.param('id');
  const handler = createToolHealthHandler(toolId);
  return handler(c);
});

// ============================================================================
// INTEGRATION WEBHOOKS
// ============================================================================

// Existing integrations (with idempotency where needed)
app.post('/webhooks/stripe', idempotencyMiddleware('stripe'), stripeHandler);
app.post('/webhooks/hubspot', idempotencyMiddleware('hubspot'), hubspotHandler);
app.post('/webhooks/slack', idempotencyMiddleware('slack'), slackHandler);
app.post('/webhooks/discord', discordHandler);
app.post('/webhooks/notion', notionHandler);
app.post('/webhooks/ai-relay', idempotencyMiddleware('ai-relay'), aiRelayHandler);

// Additional integrations
app.post('/webhooks/asana', asanaHandler);
app.post('/webhooks/github', githubHandler);
app.post('/webhooks/webflow', idempotencyMiddleware('webflow'), webflowHandler);

// ============================================================================
// CRON JOB WEBHOOKS
// ============================================================================

app.post('/webhooks/cron/daily-insights', dailyInsightsHandler);
app.get('/webhooks/cron/daily-insights', dailyInsightsHandler);
app.post('/webhooks/cron/hourly-insights', hourlyInsightsHandler);
app.get('/webhooks/cron/hourly-insights', hourlyInsightsHandler);
app.post('/webhooks/cron/spend-insights', spendInsightsHandler);
app.get('/webhooks/cron/spend-insights', spendInsightsHandler);
app.post('/webhooks/cron/outbox', outboxHandler);
app.get('/webhooks/cron/outbox', outboxHandler);
app.post('/webhooks/cron/integrity-check', integrityCheckHandler);
app.get('/webhooks/cron/integrity-check', integrityCheckHandler);
app.post('/webhooks/cron/sync-scheduler', syncSchedulerHandler);
app.get('/webhooks/cron/sync-scheduler', syncSchedulerHandler);

// ============================================================================
// DATA LOADER WEBHOOKS
// ============================================================================

app.post('/webhooks/loader/slack', idempotencyMiddleware('loader-slack'), slackLoaderHandler);
app.post('/webhooks/loader/hubspot', idempotencyMiddleware('loader-hubspot'), hubspotLoaderHandler);
app.post('/webhooks/loader/notion', idempotencyMiddleware('loader-notion'), notionLoaderHandler);
app.post('/webhooks/loader/gmail', idempotencyMiddleware('loader-gmail'), gmailLoaderHandler);
app.post('/webhooks/loader/sheets', idempotencyMiddleware('loader-sheets'), sheetsLoaderHandler);

// ============================================================================
// API WEBHOOKS
// ============================================================================

// Public webform endpoint
app.get('/webform', webformInfoHandler);
app.post('/webform', webformHandler);

// Brainstorm webhook
app.post('/webhooks/brainstorm', brainstormHandler);

// Neutron ingest webhook
app.post('/webhooks/neutron/ingest', idempotencyMiddleware('neutron-ingest'), neutronIngestHandler);

// Data sync webhook
app.post('/webhooks/data-sync', idempotencyMiddleware('data-sync'), dataSyncHandler);

// Webhook scheduler trigger
app.post('/webhooks/scheduler/trigger', webhookSchedulerHandler);

// ============================================================================
// HEALTH CHECKS FOR ALL TOOLS
// ============================================================================

// Register health check endpoints for all tools
TOOL_REGISTRY.forEach(tool => {
  if (tool.healthCheck) {
    app.get(tool.healthCheck, (c) => {
      const handler = createToolHealthHandler(tool.id);
      return handler(c);
    });
  }
});

// ============================================================================
// CATCH-ALL AND ERROR HANDLING
// ============================================================================

// Catch-all for unknown webhooks
app.all('/webhooks/*', c => {
  const log = c.get('log');
  log.warn('Unknown webhook endpoint', { path: c.req.path });
  
  // Check if it's a tool that exists but might be disabled
  const path = c.req.path;
  const tool = TOOL_REGISTRY.find(t => path.includes(t.endpoint));
  
  if (tool && !tool.enabled) {
    return c.json({ error: 'Tool is disabled', toolId: tool.id }, 503);
  }
  
  return c.json({ error: 'Unknown webhook endpoint' }, 404);
});

// Error handler
app.onError((err, c) => {
  const log = c.get('log');
  log.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
  });

  return c.json(
    {
      error: 'Internal server error',
      requestId: c.get('requestId'),
    },
    500,
  );
});

export default app;
