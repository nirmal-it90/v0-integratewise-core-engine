# Webform Endpoint Documentation

**Endpoint:** `/webform`  
**Base URL:** `https://webhooks.integratewise.online/webform`  
**Methods:** `GET`, `POST`

---

## Overview

The webform endpoint is a public API for receiving contact form submissions, lead forms, and other webform data. It validates submissions and forwards them to the core engine as Spine events.

---

## Endpoints

### GET `/webform`

Returns endpoint information and schema.

**Response:**
```json
{
  "endpoint": "/webform",
  "method": "POST",
  "description": "Public webform submission endpoint",
  "requiredFields": ["name", "email", "message"],
  "optionalFields": ["company", "source", "referrer", "metadata"],
  "example": {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "message": "Interested in learning more about IntegrateWise",
    "source": "contact"
  }
}
```

### POST `/webform`

Accepts form submissions and forwards to core engine.

**Request Body:**
```json
{
  "name": "John Doe",              // Required: 1-200 characters
  "email": "john@example.com",     // Required: Valid email
  "company": "Acme Corp",          // Optional: Company name
  "message": "Interested in...",   // Required: 1-5000 characters
  "source": "contact",             // Optional: Form source (contact, demo, pricing, etc.)
  "referrer": "https://...",       // Optional: Referrer URL
  "metadata": {                    // Optional: Additional metadata
    "utm_source": "google",
    "utm_campaign": "summer2024"
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your submission. We will get back to you soon.",
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid form data",
  "details": {
    "fieldErrors": {
      "email": ["Invalid email format"],
      "message": ["Message is required"]
    }
  }
}
```

---

## Usage Examples

### JavaScript/Fetch

```javascript
async function submitContactForm(formData) {
  const response = await fetch('https://webhooks.integratewise.online/webform', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      message: formData.message,
      source: 'contact',
      referrer: document.referrer,
      metadata: {
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
      },
    }),
  });

  const result = await response.json();
  return result;
}
```

### cURL

```bash
curl -X POST https://webhooks.integratewise.online/webform \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "message": "Interested in learning more about IntegrateWise",
    "source": "contact"
  }'
```

### HTML Form (with JavaScript)

```html
<form id="contact-form">
  <input type="text" name="name" required placeholder="Name" />
  <input type="email" name="email" required placeholder="Email" />
  <input type="text" name="company" placeholder="Company" />
  <textarea name="message" required placeholder="Message"></textarea>
  <button type="submit">Submit</button>
</form>

<script>
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const response = await fetch('https://webhooks.integratewise.online/webform', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
      source: 'contact',
      referrer: document.referrer,
    }),
  });
  
  const result = await response.json();
  if (result.success) {
    alert('Thank you! We will get back to you soon.');
    e.target.reset();
  } else {
    alert('Error: ' + result.error);
  }
});
</script>
```

---

## Field Validation

| Field | Type | Required | Min Length | Max Length | Format |
|-------|------|----------|------------|------------|--------|
| `name` | string | Yes | 1 | 200 | - |
| `email` | string | Yes | - | - | Valid email |
| `company` | string | No | - | - | - |
| `message` | string | Yes | 1 | 5000 | - |
| `source` | string | No | - | - | - |
| `referrer` | string | No | - | - | Valid URL |
| `metadata` | object | No | - | - | Key-value pairs |

---

## Event Flow

1. **Client submits form** → POST to `/webform`
2. **Webhook worker validates** → Zod schema validation
3. **Creates Spine event** → Normalized event format
4. **Forwards to core engine** → POST to `${CORE_ENGINE_URL}/events`
5. **Returns success** → User receives confirmation (even if forwarding fails)

### Spine Event Format

```json
{
  "id": "uuid",
  "source": "webform",
  "type": "form.submission",
  "timestamp": "2026-01-18T10:00:00Z",
  "payload": {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "message": "Interested in...",
    "source": "contact",
    "referrer": "https://...",
    "metadata": {}
  },
  "metadata": {
    "userAgent": "Mozilla/5.0...",
    "ip": "192.168.1.1",
    "requestId": "req-123"
  }
}
```

---

## Error Handling

The endpoint uses a **fire-and-forget** pattern:
- Always returns success to the user (200 OK)
- Errors in forwarding are logged but don't affect the response
- This prevents form submission failures due to backend issues

**Error Logging:**
- All errors are logged with structured logging
- Includes request ID for tracing
- Failed events can be retried via dead letter queue (if configured)

---

## Security Considerations

1. **Rate Limiting:** Consider adding rate limiting for production
2. **CORS:** Currently allows all origins (configure as needed)
3. **Spam Protection:** Consider adding CAPTCHA or honeypot fields
4. **IP Logging:** IP addresses are logged in metadata (GDPR consideration)

---

## Monitoring

Monitor the following:
- Submission rate
- Error rate (forwarding failures)
- Response times
- Core engine processing

**Log Fields:**
- `email` (hashed in production)
- `source`
- `requestId`
- `status` (success/failure)

---

## Integration with Core Engine

The core engine should handle `form.submission` events:
- Store in database
- Send notifications
- Trigger workflows (e.g., CRM sync, email alerts)
- Update analytics

---

## Testing

### Test with cURL

```bash
# Test GET endpoint
curl https://webhooks.integratewise.online/webform

# Test POST endpoint
curl -X POST https://webhooks.integratewise.online/webform \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### Test Validation

```bash
# Missing required field
curl -X POST https://webhooks.integratewise.online/webform \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'

# Invalid email
curl -X POST https://webhooks.integratewise.online/webform \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "invalid-email",
    "message": "Test"
  }'
```

---

## Changelog

- **2026-01-18:** Initial implementation
  - Added GET and POST endpoints
  - Zod validation
  - Spine event forwarding
  - Structured logging

---

## Related Documentation

- [Deployment Plan](../DEPLOYMENT_PLAN.md)
- [Webhook Handlers](../src/handlers/)
- [Consolidation Map](../../CONSOLIDATION_MAP.json)
