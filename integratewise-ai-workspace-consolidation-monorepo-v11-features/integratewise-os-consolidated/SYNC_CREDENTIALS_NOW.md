# Sync Credentials to Notion - Quick Guide

## 🚀 To Sync Right Now

You need to provide your Notion API key. Here are two options:

### Option 1: Interactive Setup (Recommended)
```bash
npx tsx scripts/setup-and-sync-notion.ts
```
This will:
- Prompt you for your Notion API key
- Ask if you have an existing database or create a new one
- Sync all 20+ credentials automatically

### Option 2: Using Environment Variables

#### If you already have a database:
```bash
export NOTION_API_KEY="secret_your_key_here"
export NOTION_CREDENTIALS_DB_ID="your_database_id"

./scripts/quick-sync-notion.sh
```

#### To create a new database:
```bash
export NOTION_API_KEY="secret_your_key_here"
export NOTION_PARENT_PAGE_ID="your_page_id"

npx tsx scripts/setup-notion-credentials-db.ts
# Then note the Database ID from output
export NOTION_CREDENTIALS_DB_ID="database_id_from_above"
npx tsx scripts/add-credentials-to-notion.ts
```

## 📋 What Will Be Synced

The script will add these credentials to Notion:

### SSH Keys (2)
- ✅ Bitbucket SSH Key (with public key)
- ✅ GitHub SSH Key (with public key)

### Cloudflare (3)
- ✅ Cloudflare Workers - Webhooks Service
- ✅ Cloudflare Workers - Core Engine  
- ✅ Cloudflare API Token

### Supabase (3)
- ✅ Supabase URL
- ✅ Supabase Anon Key
- ✅ Supabase Service Role Key

### Webhook Secrets (6)
- ✅ HubSpot Webhook Secret
- ✅ Slack Signing Secret & Webhook URL
- ✅ Discord Public Key & Webhook URL
- ✅ GitHub Webhook Secret
- ✅ Asana Webhook Secret

### AI API Keys (3)
- ✅ Claude API Key
- ✅ OpenAI API Key
- ✅ DeepSeek API Key

### Other Secrets (3)
- ✅ Cron Secret
- ✅ Capture API Secret
- ✅ Webhook API Secret

**Total: 20 credentials**

## 🔑 Getting Your Notion API Key

1. Go to: https://www.notion.so/my-integrations
2. Click "New integration"
3. Name it "Credentials Manager"
4. Select your workspace
5. Copy the "Internal Integration Token"

## 📄 Getting Your Page ID (for new database)

1. Create or open a page in Notion where you want the database
2. Copy the page ID from the URL:
   - URL format: `https://www.notion.so/Workspace/Page-abc123def456...`
   - The ID is: `abc123def456...` (part after the last dash)

## ✅ After Sync

1. Open your Notion database
2. Add actual API key values to each entry
3. Update Cloudflare secrets in Cloudflare Dashboard
4. Mark credentials with correct status

---

**Ready to sync?** Run the interactive script:
```bash
npx tsx scripts/setup-and-sync-notion.ts
```
