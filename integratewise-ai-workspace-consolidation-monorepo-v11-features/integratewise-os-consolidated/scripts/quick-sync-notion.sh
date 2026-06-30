#!/bin/bash

###############################################################################
# Quick Sync Script - Non-Interactive
# 
# Usage:
#   export NOTION_API_KEY="your_key"
#   export NOTION_PARENT_PAGE_ID="your_page_id"  # For new database
#   OR
#   export NOTION_CREDENTIALS_DB_ID="existing_db_id"  # For existing database
#   
#   ./scripts/quick-sync-notion.sh
###############################################################################

echo "🔐 Notion Credentials Sync"
echo "=========================="
echo ""

if [ -z "$NOTION_API_KEY" ]; then
  echo "❌ NOTION_API_KEY environment variable is required"
  echo ""
  echo "Get your API key from: https://www.notion.so/my-integrations"
  exit 1
fi

# If database ID is provided, use it directly
if [ -n "$NOTION_CREDENTIALS_DB_ID" ]; then
  echo "✅ Using existing database: $NOTION_CREDENTIALS_DB_ID"
  echo ""
  echo "🔄 Syncing credentials..."
  NOTION_CREDENTIALS_DB_ID="$NOTION_CREDENTIALS_DB_ID" npx tsx scripts/add-credentials-to-notion.ts
  exit $?
fi

# Otherwise, need to create database first
if [ -z "$NOTION_PARENT_PAGE_ID" ]; then
  echo "❌ Either NOTION_CREDENTIALS_DB_ID or NOTION_PARENT_PAGE_ID is required"
  echo ""
  echo "Option 1: Use existing database"
  echo "  export NOTION_CREDENTIALS_DB_ID='your_database_id'"
  echo ""
  echo "Option 2: Create new database"
  echo "  export NOTION_PARENT_PAGE_ID='your_page_id'"
  echo "  (Get page ID from Notion page URL)"
  exit 1
fi

echo "📝 Creating database and syncing..."
npx tsx scripts/setup-and-sync-notion.ts
