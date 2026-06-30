/**
 * IntegrateWise Core Engine
 * Cloudflare Worker Entry Point
 */

import { SpineEventSchema } from './types/spine-event';
import {
  saveEvent,
  getEventsBySource,
  getEventById,
  getRecentEvents,
  checkDatabaseHealth,
} from './lib/database';
import { routeEvent, analyzeEvent } from './lib/ai-router';

// Import Hono for Cloudflare Workers
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import type { Env } from './types/env';

const app = new Hono<{ Bindings: Env }>();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
}));

// Health check with database status
app.get('/health', async (c) => {
  const dbHealthy = await checkDatabaseHealth(c.env.DATABASE_URL);
  
  return c.json({
    status: dbHealthy ? 'ok' : 'degraded',
    database: dbHealthy ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    service: 'integratewise-core-engine',
    version: '1.0.0',
    environment: c.env.ENVIRONMENT || 'production',
  });
});

// Readiness check
app.get('/readiness', async (c) => {
  const dbHealthy = await checkDatabaseHealth(c.env.DATABASE_URL);
  
  if (!dbHealthy) {
    return c.json({ ready: false, reason: 'database unavailable' }, 503);
  }
  
  return c.json({ ready: true });
});

// Receive normalized events from webhooks worker
app.post('/events', async (c) => {
  try {
    const payload: unknown = await c.req.json();
    const parsed = SpineEventSchema.safeParse(payload);

    if (!parsed.success) {
      return c.json({ 
        error: 'invalid_event', 
        details: parsed.error.flatten() 
      }, 400);
    }

    // Save event to database
    const saveResult = await saveEvent(parsed.data, c.env.DATABASE_URL);
    
    if (!saveResult.success) {
      console.error('[Core Engine] Failed to save event:', saveResult.error);
      return c.json({ 
        error: 'save_failed', 
        message: saveResult.error 
      }, 500);
    }

    // Analyze event for importance and actionability
    const analysis = analyzeEvent(parsed.data);

    // Route to AI for task generation (async, don't wait)
    if (analysis.actionable) {
      routeEvent({ event: parsed.data }, c.env)
        .then(result => {
          if (result.success && result.tasks && result.tasks.length > 0) {
            console.log('[Core Engine] Generated tasks:', result.tasks);
          }
        })
        .catch(err => {
          console.error('[Core Engine] AI routing failed:', err);
        });
    }

    return c.json({ 
      success: true, 
      event_id: parsed.data.id,
      analysis,
    });
  } catch (error) {
    console.error('[Core Engine] Event processing error:', error);
    return c.json({ 
      error: 'processing_failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// Get events by source
app.get('/events/:source', async (c) => {
  const source = c.req.param('source');
  const limit = parseInt(c.req.query('limit') || '100');

  try {
    const events = await getEventsBySource(source, limit, c.env.DATABASE_URL);
    
    return c.json({ 
      source, 
      count: events.length,
      events,
    });
  } catch (error) {
    console.error('[Core Engine] Failed to fetch events:', error);
    return c.json({ 
      error: 'fetch_failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// Get event by ID
app.get('/events/:source/:id', async (c) => {
  const id = c.req.param('id');

  try {
    const event = await getEventById(id, c.env.DATABASE_URL);
    
    if (!event) {
      return c.json({ error: 'not_found' }, 404);
    }

    return c.json({ event });
  } catch (error) {
    console.error('[Core Engine] Failed to fetch event:', error);
    return c.json({ 
      error: 'fetch_failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// Get recent events across all sources
app.get('/events', async (c) => {
  const limit = parseInt(c.req.query('limit') || '50');

  try {
    const events = await getRecentEvents(limit, c.env.DATABASE_URL);
    
    return c.json({ 
      count: events.length,
      events,
    });
  } catch (error) {
    console.error('[Core Engine] Failed to fetch recent events:', error);
    return c.json({ 
      error: 'fetch_failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// AI routing endpoint
app.post('/ai/route', async (c) => {
  try {
    const payload: unknown = await c.req.json();
    
    // Validate event
    const parsed = SpineEventSchema.safeParse(payload);
    if (!parsed.success) {
      return c.json({ 
        error: 'invalid_event', 
        details: parsed.error.flatten() 
      }, 400);
    }

    // Route to AI
    const result = await routeEvent({ event: parsed.data }, c.env);

    return c.json(result);
  } catch (error) {
    console.error('[Core Engine] AI routing error:', error);
    return c.json({ 
      error: 'routing_failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500);
  }
});

// Error handler
app.onError((err, c) => {
  console.error('[Core Engine] Unhandled error:', err);
  
  return c.json({
    error: 'internal_server_error',
    message: err.message,
    timestamp: new Date().toISOString(),
  }, 500);
});

export default app;
