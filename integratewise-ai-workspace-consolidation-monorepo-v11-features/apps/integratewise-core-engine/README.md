# IntegrateWise Core Engine

> Central event processing and AI routing engine for IntegrateWise

## Overview

The **Core Engine** is a lightweight Node.js backend service built with Hono that serves as the central hub for:

1. **Event Ingestion** - Receives normalized SPINE events from webhook workers
2. **Event Storage** - Persists events to Neon Postgres database  
3. **AI Routing** - Routes events to appropriate AI models for task generation
4. **Task Generation** - Creates actionable tasks from events

## Architecture

```
┌──────────────────┐
│  Webhook Workers │ (Cloudflare Workers)
│  - Stripe        │
│  - Slack         │
│  - HubSpot       │
│  - Notion        │
└────────┬─────────┘
         │ SPINE Events
         ↓
┌──────────────────┐
│   Core Engine    │ (This service)
│  - Event Storage │
│  - AI Routing    │
│  - Task Gen      │
└────────┬─────────┘
         │
         ↓
┌──────────────────┐
│  Neon Postgres   │
│  - spine_events  │
│  - ai_tasks      │
└──────────────────┘
```

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Hono (fast, lightweight HTTP framework)
- **Database**: Neon Postgres (serverless)
- **Language**: TypeScript
- **Validation**: Zod schemas

## Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
```

## Environment Variables

Required:
```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
PORT=3001
NODE_ENV=production
```

Optional:
```env
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
```

## Development

```bash
# Start development server (with hot reload)
pnpm dev

# Type check
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format
```

## Database Setup

Run migrations to create required tables:

```bash
cd migrations
psql $DATABASE_URL < 001_create_spine_events.sql
psql $DATABASE_URL < 002_create_ai_tasks.sql
```

See [migrations/README.md](./migrations/README.md) for details.

## API Endpoints

### Health & Status

#### `GET /health`
Health check with database status.

**Response:**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-01-14T10:30:00Z",
  "service": "integratewise-core-engine",
  "version": "1.0.0"
}
```

#### `GET /readiness`
Readiness probe for load balancers.

### Events

#### `POST /events`
Receive and store a SPINE event.

**Request:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "source": "stripe",
  "type": "payment_intent.succeeded",
  "timestamp": "2026-01-14T10:30:00Z",
  "payload": {
    "amount": 5000,
    "currency": "usd",
    "customer": "cus_123"
  },
  "metadata": {
    "workspace_id": "ws_123"
  }
}
```

**Response:**
```json
{
  "success": true,
  "event_id": "550e8400-e29b-41d4-a716-446655440000",
  "analysis": {
    "summary": "stripe event: payment_intent.succeeded",
    "importance": "high",
    "actionable": true
  }
}
```

#### `GET /events/:source`
Get events by source (stripe, slack, etc.).

**Query Parameters:**
- `limit` (optional, default: 100) - Number of events to return

**Response:**
```json
{
  "source": "stripe",
  "count": 10,
  "events": [...]
}
```

#### `GET /events/:source/:id`
Get a specific event by ID.

**Response:**
```json
{
  "event": {
    "id": "...",
    "source": "stripe",
    "type": "payment_intent.succeeded",
    ...
  }
}
```

#### `GET /events`
Get recent events across all sources.

**Query Parameters:**
- `limit` (optional, default: 50)

### AI Routing

#### `POST /ai/route`
Route an event to AI for task generation.

**Request:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "source": "slack",
  "type": "app_mention",
  "timestamp": "2026-01-14T10:30:00Z",
  "payload": {
    "text": "@bot help me with this task"
  }
}
```

**Response:**
```json
{
  "success": true,
  "model": "claude-3-haiku",
  "tasks": [
    {
      "title": "Respond to Slack mention",
      "description": "You were mentioned in Slack: @bot help me with this task",
      "priority": "medium"
    }
  ],
  "insights": [
    "New conversation activity detected"
  ]
}
```

## Deployment

### Cloudflare Workers (Recommended)

The core engine can be deployed to Cloudflare Workers:

```bash
# Deploy to production
pnpm deploy

# Deploy to staging
wrangler deploy --env staging
```

### Docker

```bash
# Build image
docker build -t integratewise-core-engine .

# Run container
docker run -p 3001:3001 \
  -e DATABASE_URL="postgresql://..." \
  integratewise-core-engine
```

### Traditional Node.js

```bash
# Build
pnpm build

# Start
NODE_ENV=production node dist/server.js
```

## Testing

```bash
# Run unit tests
pnpm test

# With coverage
pnpm test:coverage
```

## Monitoring

The service exposes standard health check endpoints for monitoring:

- `GET /health` - Overall health (includes DB connectivity)
- `GET /readiness` - Readiness for traffic

Logs are structured JSON for easy parsing:

```json
{
  "level": "info",
  "timestamp": "2026-01-14T10:30:00Z",
  "message": "Event processed",
  "event_id": "550e8400-...",
  "source": "stripe"
}
```

## Performance

- **Latency**: < 50ms for event ingestion (P95)
- **Throughput**: ~1000 events/second
- **Database**: Connection pooling via Neon

## Security

- All events are validated using Zod schemas
- Database connections use SSL
- No sensitive data logged
- CORS enabled for cross-origin requests

## Contributing

1. Create a feature branch
2. Make changes
3. Run `pnpm typecheck && pnpm lint`
4. Submit PR

## License

Proprietary - IntegrateWise Inc.
