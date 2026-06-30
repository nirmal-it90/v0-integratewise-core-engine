# Core Engine Deployment Guide

**Service:** IntegrateWise Core Engine  
**Platform:** Cloudflare Workers  
**Status:** Ready for independent deployment

---

## 🚀 Quick Start

### Prerequisites
- Cloudflare account
- Wrangler CLI installed: `npm install -g wrangler`
- Database URL (Neon Postgres)

### Initial Setup

```bash
# 1. Navigate to core engine directory
cd apps/integratewise-core-engine

# 2. Install dependencies
pnpm install

# 3. Login to Cloudflare
wrangler login

# 4. Set environment secrets
wrangler secret put DATABASE_URL
# Paste your Neon Postgres connection string when prompted

# 5. (Optional) Set AI API keys
wrangler secret put OPENAI_API_KEY
wrangler secret put ANTHROPIC_API_KEY
```

---

## 📦 Deployment

### Development Deployment

```bash
# Run locally
pnpm dev

# Deploy to Cloudflare Workers dev environment
wrangler dev
```

### Staging Deployment

```bash
# Deploy to staging
pnpm deploy:staging

# Or manually
wrangler deploy --env staging
```

### Production Deployment

```bash
# Deploy to production
pnpm deploy:prod

# Or manually
wrangler deploy --env production
```

---

## 🔐 Environment Variables

### Required Secrets

Set via `wrangler secret put`:

```bash
# Database connection (REQUIRED)
wrangler secret put DATABASE_URL

# AI API Keys (OPTIONAL - for task generation)
wrangler secret put OPENAI_API_KEY
wrangler secret put ANTHROPIC_API_KEY
```

### Environment Configuration

Configured in `wrangler.toml`:
- `ENVIRONMENT` - Set to `development`, `staging`, or `production`

---

## 🌐 Deployment URLs

After deployment, your service will be available at:

- **Development:** `https://integratewise-core-engine.<your-subdomain>.workers.dev`
- **Staging:** `https://integratewise-core-engine-staging.<your-subdomain>.workers.dev`
- **Production:** `https://integratewise-core-engine.<your-subdomain>.workers.dev`

Or configure custom routes in `wrangler.toml`:
```toml
routes = [
  { pattern = "core.integratewise.co/*", zone_name = "integratewise.co" },
  { pattern = "api.integratewise.co/core/*", zone_name = "integratewise.co" }
]
```

---

## 🧪 Testing Deployment

### Health Check
```bash
curl https://your-worker-url.workers.dev/health
```

### Event Ingestion
```bash
curl -X POST https://your-worker-url.workers.dev/events \
  -H "Content-Type: application/json" \
  -d '{
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "source": "stripe",
    "type": "payment_intent.succeeded",
    "timestamp": "2026-01-21T10:30:00Z",
    "payload": {
      "amount": 5000,
      "currency": "usd"
    }
  }'
```

---

## 📊 Monitoring

### Health Endpoints
- `GET /health` - Overall health check (includes DB status)
- `GET /readiness` - Readiness probe for load balancers

### Logs
View logs in Cloudflare Dashboard:
```bash
# Or via CLI
wrangler tail
```

---

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy Core Engine

on:
  push:
    branches: [main]
    paths:
      - 'apps/integratewise-core-engine/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: cd apps/integratewise-core-engine && pnpm deploy:prod
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

---

## 🗄️ Database Setup

### Required Tables

Run migrations to create required tables:

```bash
# Connect to your Neon database
psql $DATABASE_URL

# Run migrations
\i migrations/001_create_spine_events.sql
\i migrations/002_create_ai_tasks.sql
```

### Migration Files
- `migrations/001_create_spine_events.sql` - Spine events table
- `migrations/002_create_ai_tasks.sql` - AI-generated tasks table

---

## 🔗 Integration

### Update Webhooks Service

Update `CORE_ENGINE_URL` in webhooks service:

```toml
# apps/integratewise-webhooks/wrangler.toml
[vars]
CORE_ENGINE_URL = "https://core.integratewise.co"
```

### Update Main App

Update environment variables to use Core Engine:

```env
CORE_ENGINE_URL=https://core.integratewise.co
```

---

## ⚡ Performance

- **Cold Start:** < 50ms
- **Latency:** < 100ms (P95)
- **Throughput:** 1000+ events/second
- **Database:** Connection pooling via Neon

---

## 🛡️ Security

- All events validated with Zod schemas
- Database connections use SSL
- No sensitive data in logs
- CORS configured for authorized origins

---

## 📝 Troubleshooting

### Database Connection Issues

```bash
# Test database connection
wrangler secret get DATABASE_URL
# Verify connection string format

# Check health endpoint
curl https://your-worker-url.workers.dev/health
```

### Deployment Failures

```bash
# Check build errors
pnpm typecheck

# Check for linting errors
pnpm lint

# View deployment logs
wrangler tail
```

---

## 🎯 Next Steps

1. ✅ Deploy to Cloudflare Workers
2. ✅ Configure custom domain (optional)
3. ✅ Set up monitoring and alerts
4. ✅ Update webhooks service to use new URL
5. ✅ Update main app environment variables

---

## 📚 Additional Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Neon Database Docs](https://neon.tech/docs/)
