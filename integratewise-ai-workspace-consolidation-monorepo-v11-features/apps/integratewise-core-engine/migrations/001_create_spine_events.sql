-- Migration: Create SPINE Events table
-- Description: Store normalized webhook events in SPINE format
-- Date: 2026-01-14

-- Create spine_events table
CREATE TABLE IF NOT EXISTS spine_events (
  id UUID PRIMARY KEY,
  source VARCHAR(50) NOT NULL,
  type VARCHAR(255) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_spine_events_source ON spine_events(source);
CREATE INDEX IF NOT EXISTS idx_spine_events_type ON spine_events(type);
CREATE INDEX IF NOT EXISTS idx_spine_events_timestamp ON spine_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_spine_events_source_timestamp ON spine_events(source, timestamp DESC);

-- Create index for JSONB payload queries (GIN index)
CREATE INDEX IF NOT EXISTS idx_spine_events_payload ON spine_events USING GIN (payload);
CREATE INDEX IF NOT EXISTS idx_spine_events_metadata ON spine_events USING GIN (metadata);

-- Add comment
COMMENT ON TABLE spine_events IS 'Normalized webhook events in SPINE format from external services';
COMMENT ON COLUMN spine_events.id IS 'UUID of the event (from webhook worker or generated)';
COMMENT ON COLUMN spine_events.source IS 'Source of the event (stripe, slack, discord, notion, etc.)';
COMMENT ON COLUMN spine_events.type IS 'Event type (e.g., payment_intent.succeeded, message.created)';
COMMENT ON COLUMN spine_events.timestamp IS 'Original event timestamp from source system';
COMMENT ON COLUMN spine_events.payload IS 'Normalized event payload (JSONB)';
COMMENT ON COLUMN spine_events.metadata IS 'Additional metadata (workspace_id, user_id, etc.)';
