#!/bin/bash

###############################################################################
# Quick Setup Script for Notion Credentials Database
###############################################################################

echo "🔐 Notion Credentials Database Setup"
echo "===================================="
echo ""

# Check for required environment variables
if [ -z "$NOTION_API_KEY" ]; then
  echo "❌ NOTION_API_KEY environment variable is not set"
  echo ""
  echo "💡 Set it with:"
  echo "   export NOTION_API_KEY='secret_your_key_here'"
  echo ""
  echo "   Get your key from: https://www.notion.so/my-integrations"
  exit 1
fi

if [ -z "$NOTION_PARENT_PAGE_ID" ]; then
  echo "❌ NOTION_PARENT_PAGE_ID environment variable is not set"
  echo ""
  echo "💡 Set it with:"
  echo "   export NOTION_PARENT_PAGE_ID='your_page_id_here'"
  echo ""
  echo "   Create a page in Notion and copy the ID from the URL"
  echo "   Example: https://www.notion.so/Workspace/Page-abc123def456..."
  echo "   The ID is: abc123def456..."
  exit 1
fi

# Check if tsx is available
if ! command -v npx &> /dev/null; then
  echo "❌ npx is not available. Please install Node.js"
  exit 1
fi

# Run the setup script
echo "🚀 Running setup script..."
echo ""

npx tsx scripts/setup-notion-credentials-db.ts
