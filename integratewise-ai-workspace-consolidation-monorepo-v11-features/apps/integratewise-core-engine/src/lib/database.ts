import { neon } from '@neondatabase/serverless';
import type { SpineEvent } from '../types/spine-event';

// Create database client - accepts DATABASE_URL as parameter for Cloudflare Workers
function getDatabaseClient(databaseUrl: string) {
  return neon(databaseUrl);
}

/**
 * Database client for Neon Postgres
 * Used for storing SPINE events and related data
 */

export interface SaveEventResult {
  success: boolean;
  eventId?: string;
  error?: string;
}

/**
 * Save a SPINE event to the database
 */
export async function saveEvent(event: SpineEvent, databaseUrl: string): Promise<SaveEventResult> {
  try {
    const sql = getDatabaseClient(databaseUrl);
    // Insert event into spine_events table
    const result = await sql`
      INSERT INTO spine_events (
        id, 
        source, 
        type, 
        timestamp, 
        payload, 
        metadata,
        created_at,
        updated_at
      ) VALUES (
        ${event.id},
        ${event.source},
        ${event.type},
        ${event.timestamp},
        ${JSON.stringify(event.payload)},
        ${JSON.stringify(event.metadata || {})},
        NOW(),
        NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        payload = ${JSON.stringify(event.payload)},
        metadata = ${JSON.stringify(event.metadata || {})},
        updated_at = NOW()
      RETURNING id
    `;

    return {
      success: true,
      eventId: result[0]?.id,
    };
  } catch (error) {
    console.error('[DB] Failed to save event:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown database error',
    };
  }
}

/**
 * Get events by source
 */
export async function getEventsBySource(
  source: string,
  limit = 100,
  databaseUrl: string
): Promise<SpineEvent[]> {
  try {
    const sql = getDatabaseClient(databaseUrl);
    const results = await sql`
      SELECT * FROM spine_events
      WHERE source = ${source}
      ORDER BY timestamp DESC
      LIMIT ${limit}
    `;

    return results.map((row: any) => ({
      id: row.id,
      source: row.source,
      type: row.type,
      timestamp: row.timestamp,
      payload: typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload,
      metadata: typeof row.metadata === 'string' ? JSON.parse(row.metadata) : row.metadata,
    }));
  } catch (error) {
    console.error('[DB] Failed to fetch events by source:', error);
    return [];
  }
}

/**
 * Get event by ID
 */
export async function getEventById(id: string, databaseUrl: string): Promise<SpineEvent | null> {
  try {
    const sql = getDatabaseClient(databaseUrl);
    const results = await sql`
      SELECT * FROM spine_events
      WHERE id = ${id}
      LIMIT 1
    `;

    if (results.length === 0) {
      return null;
    }

    const row = results[0] as any;
    return {
      id: row.id,
      source: row.source,
      type: row.type,
      timestamp: row.timestamp,
      payload: typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload,
      metadata: typeof row.metadata === 'string' ? JSON.parse(row.metadata) : row.metadata,
    };
  } catch (error) {
    console.error('[DB] Failed to fetch event by ID:', error);
    return null;
  }
}

/**
 * Get recent events across all sources
 */
export async function getRecentEvents(limit = 50, databaseUrl: string): Promise<SpineEvent[]> {
  try {
    const sql = getDatabaseClient(databaseUrl);
    const results = await sql`
      SELECT * FROM spine_events
      ORDER BY timestamp DESC
      LIMIT ${limit}
    `;

    return results.map((row: any) => ({
      id: row.id,
      source: row.source,
      type: row.type,
      timestamp: row.timestamp,
      payload: typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload,
      metadata: typeof row.metadata === 'string' ? JSON.parse(row.metadata) : row.metadata,
    }));
  } catch (error) {
    console.error('[DB] Failed to fetch recent events:', error);
    return [];
  }
}

/**
 * Health check for database connection
 */
export async function checkDatabaseHealth(databaseUrl: string): Promise<boolean> {
  try {
    const sql = getDatabaseClient(databaseUrl);
    await sql`SELECT 1`;
    return true;
  } catch (error) {
    console.error('[DB] Health check failed:', error);
    return false;
  }
}
