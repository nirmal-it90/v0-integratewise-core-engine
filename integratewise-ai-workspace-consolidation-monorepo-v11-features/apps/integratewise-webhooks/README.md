# IntegrateWise Webhooks Worker

**Unified webhook infrastructure for all IntegrateWise tools and services**

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Type check
pnpm typecheck

# Deploy to Cloudflare Workers
wrangler deploy
```

## 📋 Features

- ✅ **30+ Webhook Endpoints** - All tools, integrations, and services
- ✅ **Tool Registry** - Centralized configuration
- ✅ **Health Checks** - Built-in monitoring for all tools
- ✅ **Idempotency** - Prevents duplicate processing
- ✅ **Structured Logging** - Complete audit trail
- ✅ **Zero Code Changes** - Enable/disable tools via config

## 🔌 Endpoints

### System
- `GET /health` - System health
- `GET /tools` - List all tools
- `GET /tools/health` - All tools health check
- `GET /tools/:id` - Get tool info
- `GET /tools/:id/health` - Tool health check

### Integrations
- `POST /webhooks/stripe` - Stripe webhooks
- `POST /webhooks/hubspot` - HubSpot webhooks
- `POST /webhooks/slack` - Slack webhooks
- `POST /webhooks/discord` - Discord webhooks
- `POST /webhooks/notion` - Notion webhooks
- `POST /webhooks/ai-relay` - AI-Relay webhooks
- `POST /webhooks/asana` - Asana webhooks
- `POST /webhooks/github` - GitHub webhooks
- `POST /webhooks/webflow` - Webflow webhooks

### Cron Jobs
- `POST|GET /webhooks/cron/daily-insights`
- `POST|GET /webhooks/cron/hourly-insights`
- `POST|GET /webhooks/cron/spend-insights`
- `POST|GET /webhooks/cron/outbox`
- `POST|GET /webhooks/cron/integrity-check`
- `POST|GET /webhooks/cron/sync-scheduler`

### Data Loaders
- `POST /webhooks/loader/slack`
- `POST /webhooks/loader/hubspot`
- `POST /webhooks/loader/notion`
- `POST /webhooks/loader/gmail`
- `POST /webhooks/loader/sheets`

### API
- `GET|POST /webform` - Public contact form
- `POST /webhooks/brainstorm` - Brainstorm analysis
- `POST /webhooks/neutron/ingest` - Neutron ingestion
- `POST /webhooks/data-sync` - Data synchronization
- `POST /webhooks/scheduler/trigger` - Scheduled triggers

## 📖 Documentation

- [Webhook System Guide](./WEBHOOK_SYSTEM.md) - Complete system documentation
- [Webform Endpoint](./WEBFORM_ENDPOINT.md) - Webform API docs
- [Webflow Integration](./WEBFLOW_INTEGRATION.md) - Webflow webhook and API integration
- [Webflow Site Enhancement](./WEBFLOW_SITE_ENHANCEMENT.md) - **NEW!** Complete guide to enhancing your Webflow marketing site
- [Deployment Plan](../../DEPLOYMENT_PLAN.md) - Deployment instructions

## 🎨 Webflow Site Enhancement

Enhance your existing Webflow site to match the 36-page marketing site specification:

```bash
# Quick start - audit your site
export WEBFLOW_API_KEY=your-api-key
pnpm webflow:start

# Or run individual commands:
pnpm webflow:audit              # Audit current site state
pnpm webflow:enhance <site-id>  # Generate enhancement plan
pnpm webflow:content            # Populate CMS collections
```

See [WEBFLOW_SITE_ENHANCEMENT.md](./WEBFLOW_SITE_ENHANCEMENT.md) for complete instructions.

## 🛠️ Development

```bash
# Local development
wrangler dev

# Type check
pnpm typecheck

# Lint
pnpm lint
```

## 🔧 Configuration

Tools are configured in `src/lib/tool-registry.ts`. Enable/disable tools without code changes:

```typescript
{
  id: 'stripe',
  enabled: true, // Change to false to disable
  // ...
}
```

## 📊 Monitoring

All requests are logged with:
- Request ID
- Method and path
- Response status
- Duration
- Tool identifier

## 🔐 Security

- Signature verification for authenticated tools
- Idempotency for duplicate prevention
- Structured logging for audit trail
- CORS configuration

## 📝 License

MIT
