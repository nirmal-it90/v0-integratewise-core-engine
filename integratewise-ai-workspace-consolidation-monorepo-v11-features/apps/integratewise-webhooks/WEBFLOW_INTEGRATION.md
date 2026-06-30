# Webflow Integration

Complete integration with Webflow for webhooks and API operations.

## 🚀 Overview

The Webflow integration provides:
- **Webhook Handler** - Receives and processes Webflow webhooks
- **API Client** - Full Webflow API v2 client for programmatic operations
- **Event Normalization** - Converts Webflow events to Spine events
- **Signature Verification** - Secure webhook validation

## 📋 Supported Events

### Form Submissions
- `form_submission` / `form_submit` - Form submissions from Webflow sites

### CMS Updates
- `collection_item_created` - New CMS collection items
- `collection_item_updated` - Updated CMS collection items
- `collection_item_deleted` - Deleted CMS collection items

### Site Events
- `site_published` - Site published event
- `site_unpublished` - Site unpublished event

### E-commerce
- `ecommerce_order_created` - New order created
- `ecommerce_order_updated` - Order updated

## 🔧 Setup

### 1. Get Webflow API Key

1. Go to [Webflow Account Settings](https://webflow.com/dashboard/account)
2. Navigate to **Apps & Integrations** → **API Access**
3. Generate a new API token
4. Copy the token (you'll need it for API operations)

### 2. Configure Webhook Secret (Optional but Recommended)

1. In your Webflow site settings, go to **Webhooks**
2. Create a new webhook pointing to: `https://your-domain.com/webhooks/webflow`
3. Copy the webhook secret (if provided by Webflow)
4. Set it as an environment variable

### 3. Set Environment Variables

```bash
# Set via wrangler secret put
wrangler secret put WEBFLOW_API_KEY
wrangler secret put WEBFLOW_WEBHOOK_SECRET
```

Or in `wrangler.toml` (for local development only - not recommended for production):

```toml
[vars]
WEBFLOW_API_KEY = "your-api-key-here"
WEBFLOW_WEBHOOK_SECRET = "your-webhook-secret-here"
```

## 📡 Webhook Endpoint

### Endpoint
```
POST /webhooks/webflow
```

### Headers
- `Content-Type: application/json`
- `x-webflow-signature` (optional, for signature verification)

### Request Body
Webflow sends webhook payloads in the following format:

```json
{
  "id": "event-id",
  "name": "form_submission",
  "site": "site-id",
  "formId": "form-id",
  "data": {
    "field1": "value1",
    "field2": "value2"
  },
  "submittedAt": "2024-01-18T10:00:00Z"
}
```

### Response
```json
{
  "received": true,
  "eventId": "event-id",
  "eventType": "form_submission"
}
```

## 🔌 API Client Usage

The Webflow API client provides full access to Webflow's API v2.

### Initialize Client

```typescript
import { createWebflowClient } from './lib/webflow-client';

const client = createWebflowClient(process.env.WEBFLOW_API_KEY);
```

### Get Sites

```typescript
// Get all sites
const sites = await client.getSites();

// Get specific site
const site = await client.getSite('site-id');
```

### Work with Collections

```typescript
// Get all collections for a site
const collections = await client.getCollections('site-id');

// Get specific collection
const collection = await client.getCollection('site-id', 'collection-id');

// Get collection items
const { items } = await client.getCollectionItems('site-id', 'collection-id', {
  limit: 100,
  offset: 0,
});

// Get specific item
const item = await client.getCollectionItem('site-id', 'collection-id', 'item-id');
```

### Create/Update/Delete Items

```typescript
// Create new item
const newItem = await client.createCollectionItem(
  'site-id',
  'collection-id',
  {
    name: 'New Item',
    slug: 'new-item',
    // ... other fields
  },
  true // isDraft
);

// Update item
const updatedItem = await client.updateCollectionItem(
  'site-id',
  'collection-id',
  'item-id',
  {
    name: 'Updated Item',
  }
);

// Delete item
await client.deleteCollectionItem('site-id', 'collection-id', 'item-id');

// Publish items
await client.publishCollectionItems('site-id', 'collection-id', ['item-id-1', 'item-id-2']);
```

### Get Form Submissions

```typescript
// Get all form submissions
const { submissions } = await client.getFormSubmissions('site-id');

// Get submissions for specific form
const { submissions } = await client.getFormSubmissions('site-id', 'form-id', {
  limit: 50,
  offset: 0,
});
```

## 🔐 Security

### Signature Verification

The webhook handler automatically verifies Webflow signatures if `WEBFLOW_WEBHOOK_SECRET` is configured:

1. Extracts signature from `x-webflow-signature` header
2. Computes HMAC SHA256 of request body
3. Compares signatures (constant-time comparison)
4. Rejects requests with invalid signatures (401)

### Best Practices

- ✅ Always set `WEBFLOW_WEBHOOK_SECRET` in production
- ✅ Use HTTPS for webhook endpoints
- ✅ Store API keys as secrets, never in code
- ✅ Rotate API keys periodically
- ✅ Monitor webhook logs for suspicious activity

## 📊 Event Flow

```
Webflow Site
    ↓
Webhook Event (form_submission, CMS update, etc.)
    ↓
POST /webhooks/webflow
    ↓
Signature Verification (if secret configured)
    ↓
Event Normalization
    ↓
Forward to Core Engine (/events)
    ↓
Spine Event Processing
```

## 🧪 Testing

### Test Webhook Locally

```bash
# Start local dev server
wrangler dev

# Send test webhook
curl -X POST http://localhost:8787/webhooks/webflow \
  -H "Content-Type: application/json" \
  -H "x-webflow-signature: test-signature" \
  -d '{
    "id": "test-event-id",
    "name": "form_submission",
    "site": "test-site-id",
    "formId": "test-form-id",
    "data": {
      "name": "Test User",
      "email": "test@example.com"
    }
  }'
```

### Health Check

```bash
curl http://localhost:8787/tools/webflow/health
```

Response:
```json
{
  "tool": "webflow",
  "name": "Webflow",
  "status": "ok",
  "timestamp": "2024-01-18T10:00:00Z",
  "environment": "development",
  "coreEngineReachable": true
}
```

## 🔍 Monitoring

All Webflow webhook events are logged with:
- Event ID
- Event type
- Site ID
- Processing status
- Forwarding status to core engine

Check logs in Cloudflare Workers dashboard or via structured logging.

## 🐛 Troubleshooting

### Webhook Not Receiving Events

1. Verify webhook URL is correct in Webflow settings
2. Check that webhook is enabled in Webflow
3. Verify signature secret matches (if using verification)
4. Check Cloudflare Workers logs for errors

### API Errors

1. Verify `WEBFLOW_API_KEY` is set correctly
2. Check API key has required permissions
3. Verify site ID and collection IDs are correct
4. Check Webflow API status

### Signature Verification Failing

1. Verify `WEBFLOW_WEBHOOK_SECRET` matches Webflow webhook secret
2. Check that raw body is being used for signature calculation
3. Verify signature header name is correct

## 📚 Resources

- [Webflow API Documentation](https://developers.webflow.com/)
- [Webflow Webhooks Guide](https://developers.webflow.com/webhooks)
- [Webflow API Reference](https://developers.webflow.com/reference)

## 🔄 Integration with Core Engine

All Webflow events are automatically forwarded to the core engine as Spine events:

```json
{
  "id": "spine-event-id",
  "source": "webflow",
  "type": "form_submission",
  "timestamp": "2024-01-18T10:00:00Z",
  "payload": {
    "normalized": {
      "formId": "form-id",
      "formName": "Contact Form",
      "siteId": "site-id",
      "fields": { ... },
      "submittedAt": "2024-01-18T10:00:00Z"
    }
  },
  "metadata": {
    "raw_event_id": "webflow-event-id"
  }
}
```

These events can then be processed by:
- Spine event handlers
- AI analysis pipelines
- Data normalization services
- Workflow automation

## ✅ Status

- ✅ Webhook handler implemented
- ✅ API client implemented
- ✅ Signature verification
- ✅ Event normalization
- ✅ Core engine integration
- ✅ Health checks
- ✅ Tool registry integration
- ✅ Documentation
