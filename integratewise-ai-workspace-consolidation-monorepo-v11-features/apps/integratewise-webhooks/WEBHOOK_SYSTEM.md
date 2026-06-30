# IntegrateWise Webhook System

**Complete webhook infrastructure for all tools, integrations, and services**

---

## 🎯 Overview

This webhook system provides a unified, extensible infrastructure for all IntegrateWise tools. Every tool, integration, cron job, and API endpoint has a corresponding webhook endpoint that:

- ✅ **Always Active** - Endpoints remain alive even when tools are inactive
- ✅ **Zero Code Changes** - Enable/disable tools via configuration, not code
- ✅ **Unified Interface** - All webhooks follow the same pattern
- ✅ **Health Monitoring** - Built-in health checks for all tools
- ✅ **Idempotency** - Prevents duplicate processing
- ✅ **Structured Logging** - Complete audit trail

---

## 📋 Tool Registry

All tools are registered in `src/lib/tool-registry.ts`. The registry includes:

### Categories

1. **Integration** - External service webhooks (Stripe, Slack, HubSpot, etc.)
2. **Cron** - Scheduled tasks (daily insights, outbox processing, etc.)
3. **Loader** - Data ingestion tools (Slack loader, Gmail loader, etc.)
4. **API** - API endpoint webhooks (webform, brainstorm, etc.)
5. **System** - System-level tools (health checks, monitoring)

### Tool Configuration

Each tool has:
- `id` - Unique identifier
- `name` - Human-readable name
- `enabled` - Active/inactive status
- `endpoint` - Webhook URL path
- `requiresAuth` - Whether authentication is required
- `requiresIdempotency` - Whether to use idempotency middleware
- `healthCheck` - Optional health check endpoint

---

## 🔌 Available Endpoints

### Integration Webhooks

| Tool | Endpoint | Method | Auth | Idempotency |
|------|----------|--------|------|-------------|
| Stripe | `/webhooks/stripe` | POST | ✅ | ✅ |
| HubSpot | `/webhooks/hubspot` | POST | ✅ | ✅ |
| Slack | `/webhooks/slack` | POST | ✅ | ✅ |
| Discord | `/webhooks/discord` | POST | ❌ | ❌ |
| Notion | `/webhooks/notion` | POST | ❌ | ❌ |
| AI-Relay | `/webhooks/ai-relay` | POST | ✅ | ✅ |
| Asana | `/webhooks/asana` | POST | ❌ | ❌ |
| GitHub | `/webhooks/github` | POST | ❌ | ❌ |

### Cron Job Webhooks

| Tool | Endpoint | Method | Schedule |
|------|----------|--------|----------|
| Daily Insights | `/webhooks/cron/daily-insights` | POST, GET | `0 9 * * *` |
| Hourly Insights | `/webhooks/cron/hourly-insights` | POST, GET | `0 * * * *` |
| Spend Insights | `/webhooks/cron/spend-insights` | POST, GET | `0 8 * * *` |
| Outbox Processor | `/webhooks/cron/outbox` | POST, GET | `*/5 * * * *` |
| Integrity Check | `/webhooks/cron/integrity-check` | POST, GET | `0 3 * * *` |
| Sync Scheduler | `/webhooks/cron/sync-scheduler` | POST, GET | `0 */6 * * *` |

### Data Loader Webhooks

| Tool | Endpoint | Method | Auth | Idempotency |
|------|----------|--------|------|-------------|
| Slack Loader | `/webhooks/loader/slack` | POST | ✅ | ✅ |
| HubSpot Loader | `/webhooks/loader/hubspot` | POST | ✅ | ✅ |
| Notion Loader | `/webhooks/loader/notion` | POST | ✅ | ✅ |
| Gmail Loader | `/webhooks/loader/gmail` | POST | ✅ | ✅ |
| Sheets Loader | `/webhooks/loader/sheets` | POST | ✅ | ✅ |

### API Webhooks

| Tool | Endpoint | Method | Auth | Idempotency |
|------|----------|--------|------|-------------|
| Webform | `/webform` | GET, POST | ❌ | ❌ |
| Brainstorm | `/webhooks/brainstorm` | POST | ❌ | ❌ |
| Neutron Ingest | `/webhooks/neutron/ingest` | POST | ✅ | ✅ |
| Data Sync | `/webhooks/data-sync` | POST | ✅ | ✅ |
| Webhook Scheduler | `/webhooks/scheduler/trigger` | POST | ❌ | ❌ |

### System Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | System health check |
| `/tools` | GET | List all tools |
| `/tools/health` | GET | Health check for all tools |
| `/tools/:id` | GET | Get specific tool info |
| `/tools/:id/health` | GET | Health check for specific tool |

---

## 🚀 Usage Examples

### List All Tools

```bash
curl https://webhooks.integratewise.online/tools
```

Response:
```json
{
  "tools": [...],
  "total": 30,
  "enabled": 28,
  "categories": {
    "integration": 8,
    "cron": 6,
    "loader": 5,
    "api": 5,
    "system": 1
  }
}
```

### Get Tool Info

```bash
curl https://webhooks.integratewise.online/tools/stripe
```

### Check Tool Health

```bash
curl https://webhooks.integratewise.online/tools/stripe/health
```

### Trigger Cron Job Manually

```bash
# POST request
curl -X POST https://webhooks.integratewise.online/webhooks/cron/daily-insights

# GET request (also works)
curl https://webhooks.integratewise.online/webhooks/cron/daily-insights
```

### Submit Webform

```bash
curl -X POST https://webhooks.integratewise.online/webform \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Interested in IntegrateWise"
  }'
```

---

## 🔧 Enabling/Disabling Tools

Tools can be enabled or disabled without code changes by updating the registry:

```typescript
// In src/lib/tool-registry.ts
{
  id: 'stripe',
  enabled: false, // Disable tool
  // ... other config
}
```

Disabled tools:
- Still respond to requests (returns 503)
- Log attempts for monitoring
- Can be re-enabled instantly

---

## 🏥 Health Checks

### System Health

```bash
curl https://webhooks.integratewise.online/health
```

### All Tools Health

```bash
curl https://webhooks.integratewise.online/tools/health
```

### Individual Tool Health

```bash
curl https://webhooks.integratewise.online/tools/stripe/health
```

Health checks verify:
- Tool is enabled
- Core engine is reachable
- Endpoint is responding

---

## 📊 Event Flow

```
┌─────────────┐
│   Client    │
│  (Stripe,   │
│   Slack,    │
│   etc.)     │
└──────┬──────┘
       │ POST /webhooks/{tool}
       ▼
┌─────────────────────┐
│  Webhook Worker     │
│  - Validate         │
│  - Idempotency      │
│  - Log              │
└──────┬──────────────┘
       │ POST /events
       ▼
┌─────────────────────┐
│  Core Engine        │
│  - Process          │
│  - Store            │
│  - Trigger Actions  │
└─────────────────────┘
```

---

## 🔐 Security

### Authentication

Tools with `requiresAuth: true` verify:
- **Stripe**: Signature verification
- **HubSpot**: HMAC signature
- **Slack**: Signature + timestamp
- **AI-Relay**: HMAC signature

### Idempotency

Tools with `requiresIdempotency: true`:
- Store event IDs in KV namespace
- Prevent duplicate processing
- Return success for duplicates

### Rate Limiting

Consider adding rate limiting for:
- Public endpoints (webform)
- High-frequency tools
- External integrations

---

## 📝 Adding New Tools

### 1. Add to Registry

```typescript
// In src/lib/tool-registry.ts
{
  id: 'new-tool',
  name: 'New Tool',
  description: 'Tool description',
  category: 'integration', // or 'cron', 'loader', 'api', 'system'
  enabled: true,
  endpoint: '/webhooks/new-tool',
  methods: ['POST'],
  requiresAuth: true,
  requiresIdempotency: true,
  handler: 'newToolHandler',
  healthCheck: '/tools/new-tool/health',
}
```

### 2. Create Handler

```typescript
// In src/handlers/integrations.ts (or appropriate file)
export const newToolHandler = createGenericHandler({
  toolId: 'new-tool',
  toolName: 'New Tool',
  validatePayload: (body) => {
    // Optional validation
    return { valid: true };
  },
});
```

### 3. Register Route

```typescript
// In src/index.ts
import { newToolHandler } from './handlers/integrations';

app.post('/webhooks/new-tool', 
  idempotencyMiddleware('new-tool'), // if needed
  newToolHandler
);
```

That's it! The tool is now active and has:
- ✅ Webhook endpoint
- ✅ Health check endpoint
- ✅ Registry entry
- ✅ Logging
- ✅ Error handling

---

## 🐛 Troubleshooting

### Tool Returns 503

- Check if tool is enabled in registry
- Verify tool configuration
- Check logs for errors

### Health Check Fails

- Verify core engine is reachable
- Check CORE_ENGINE_URL environment variable
- Review network connectivity

### Events Not Processing

- Check core engine logs
- Verify event format
- Check idempotency (might be duplicate)

### Unknown Endpoint Error

- Verify endpoint path matches registry
- Check if tool is registered
- Review route registration

---

## 📈 Monitoring

### Metrics to Monitor

- Request rate per tool
- Error rate
- Response times
- Core engine connectivity
- Idempotency hit rate

### Log Fields

All requests log:
- `requestId` - Unique request identifier
- `method` - HTTP method
- `path` - Request path
- `status` - Response status
- `durationMs` - Processing time
- `toolId` - Tool identifier (if applicable)

---

## 🔄 Maintenance

### Updating Tool Config

1. Edit `src/lib/tool-registry.ts`
2. Deploy worker
3. No code changes needed for enable/disable

### Adding New Category

1. Add category to `ToolConfig['category']` type
2. Add tools to registry
3. Create handlers
4. Register routes

---

## 📚 Related Documentation

- [Webform Endpoint](./WEBFORM_ENDPOINT.md)
- [Deployment Plan](../../DEPLOYMENT_PLAN.md)
- [Tool Registry Source](./src/lib/tool-registry.ts)

---

**Last Updated:** 2026-01-18  
**Version:** 1.0.0  
**Status:** Production Ready
