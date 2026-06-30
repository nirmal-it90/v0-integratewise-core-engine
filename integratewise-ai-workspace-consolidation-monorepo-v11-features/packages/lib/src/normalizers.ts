import { v4 as uuidv4 } from 'uuid';
import type {
  SpineEvent,
  StripeWebhook,
  SlackWebhook,
  DiscordInteraction,
  NotionWebhook,
} from '@integratewise/types';

// Normalize Stripe webhook to SpineEvent
export function normalizeStripeEvent(event: StripeWebhook): SpineEvent {
  return {
    id: uuidv4(),
    source: 'stripe',
    type: event.type,
    timestamp: new Date(event.created * 1000).toISOString(),
    payload: event.data.object,
    metadata: {
      raw_event_id: event.id,
    },
  };
}

// Normalize Slack webhook to SpineEvent
export function normalizeSlackEvent(event: SlackWebhook): SpineEvent {
  return {
    id: uuidv4(),
    source: 'slack',
    type: event.type,
    timestamp: new Date().toISOString(),
    payload: event.event || {},
    metadata: {
      workspace_id: event.team_id,
    },
  };
}

// Normalize Discord interaction to SpineEvent
export function normalizeDiscordEvent(event: DiscordInteraction): SpineEvent {
  return {
    id: uuidv4(),
    source: 'discord',
    type: `interaction.${event.type}`,
    timestamp: new Date().toISOString(),
    payload: event.data || {},
    metadata: {
      raw_event_id: event.id,
    },
  };
}

// Normalize Notion webhook to SpineEvent
export function normalizeNotionEvent(event: NotionWebhook): SpineEvent {
  return {
    id: uuidv4(),
    source: 'notion',
    type: event.type,
    timestamp: new Date().toISOString(),
    payload: event.data,
    metadata: {
      workspace_id: event.workspace_id,
    },
  };
}
