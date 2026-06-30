import type { Context } from 'hono';
import { verifyStripeSignature } from '../lib/signature';

type Log = {
  info: (message: string, data?: Record<string, unknown>) => void;
  warn: (message: string, data?: Record<string, unknown>) => void;
  error: (message: string, data?: Record<string, unknown>) => void;
};

export async function stripeHandler(c: Context) {
  const log = c.get('log') as Log;

  // Get raw body for signature verification (use stored body if available from idempotency middleware)
  const rawBody = (c.get('webhookRawBody') as string | undefined) || await c.req.text();
  const signature = c.req.header('stripe-signature');

  // Verify signature
  const isValid = await verifyStripeSignature(
    rawBody,
    signature ?? null,
    c.env.STRIPE_WEBHOOK_SECRET ?? null,
  );

  if (!isValid) {
    log.warn('Invalid Stripe signature', {
      hasSignature: !!signature,
    });
    return c.json({ error: 'Invalid signature' }, 401);
  }

  // Parse body
  const event = JSON.parse(rawBody);

  log.info('Stripe webhook received', {
    eventId: event.id,
    eventType: event.type,
    livemode: event.livemode,
  });

  // Handle event types
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(c, event, log);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionChange(c, event, log);
        break;

      case 'invoice.paid':
      case 'invoice.payment_failed':
        await handleInvoiceEvent(c, event, log);
        break;

      default:
        log.info('Unhandled Stripe event type', { eventType: event.type });
    }

    // Forward to core engine
    await forwardToEngine(c, {
      source: 'stripe',
      externalId: event.id,
      eventType: event.type,
      payload: event.data.object,
    });

    return c.json({ received: true, eventId: event.id });
  } catch (error) {
    log.error('Failed to process Stripe webhook', {
      eventId: event.id,
      eventType: event.type,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    // Send to dead letter queue
    await c.env.DEAD_LETTER_QUEUE?.send({
      source: 'stripe',
      eventId: event.id,
      eventType: event.type,
      payload: event,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    return c.json({ error: 'Processing failed' }, 500);
  }
}

async function handleCheckoutCompleted(
  _c: Context,
  event: any,
  log: Log,
) {
  const session = event.data.object;
  log.info('Checkout completed', {
    sessionId: session.id,
    customerId: session.customer,
    amountTotal: session.amount_total,
  });
}

async function handleSubscriptionChange(
  _c: Context,
  event: any,
  log: Log,
) {
  const subscription = event.data.object;
  log.info('Subscription changed', {
    subscriptionId: subscription.id,
    customerId: subscription.customer,
    status: subscription.status,
    eventType: event.type,
  });
}

async function handleInvoiceEvent(_c: Context, event: any, log: Log) {
  const invoice = event.data.object;
  log.info('Invoice event', {
    invoiceId: invoice.id,
    customerId: invoice.customer,
    status: invoice.status,
    eventType: event.type,
  });
}

async function forwardToEngine(
  c: Context,
  data: {
    source: string;
    externalId: string;
    eventType: string;
    payload: any;
  },
) {
  const log = c.get('log') as Log;

  try {
    const response = await fetch(`${c.env.CORE_ENGINE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-request-id': c.get('requestId'),
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        source: data.source,
        type: data.eventType,
        timestamp: new Date().toISOString(),
        payload: data.payload,
        metadata: {
          raw_event_id: data.externalId,
        },
      }),
    });

    if (!response.ok) {
      log.warn('Failed to forward to engine', {
        status: response.status,
      });
    }
  } catch (error) {
    log.error('Error forwarding to engine', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
