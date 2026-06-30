# MCP Notion Credentials Setup

This guide explains how to use MCP (Model Context Protocol) Notion tools to manage your credentials database.

## 🔌 What is MCP?

MCP allows AI assistants (like Cursor) to directly interact with Notion using specialized tools, providing better integration than API calls.

## ✅ MCP Notion Tools Available

The following MCP Notion tools are available in Cursor:

### Database Management
- `mcp_Notion_notion-create-database` - Create new database
- `mcp_Notion_notion-update-database` - Update database schema
- `mcp_Notion_notion-fetch` - Get database/page details

### Page Management
- `mcp_Notion_notion-create-pages` - Create credential entries
- `mcp_Notion_notion-update-page` - Update credential entries
- `mcp_Notion_notion-move-pages` - Reorganize credentials
- `mcp_Notion_notion-duplicate-page` - Duplicate credential entries

### Search & Query
- `mcp_Notion_notion-search` - Search for credentials
- `mcp_Notion_notion-fetch` - Get specific credential details

## 🚀 Quick Start with MCP

### Step 1: Create Credentials Database

Ask Cursor to create the database using MCP:

```
"Create a Notion database for storing credentials with these properties:
- Service Name (title)
- Key Type (select: API Key, SSH Key, OAuth Token, etc.)
- API Key (rich text)
- SSH Public Key (rich text)
- Service Provider (select: GitHub, Bitbucket, Cloudflare, etc.)
- Environment (select: Development, Staging, Production)
- Status (select: Active, Inactive, Revoked)
- Description (rich text)
- Tags (multi-select)
- And other fields as needed"
```

### Step 2: Add Credentials

Ask Cursor to add credentials:

```
"Add these credentials to the Notion database:
1. Bitbucket SSH Key: ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIh22XRuBQAJCUbwDRNzav+6KJwMD18o2tJJm/WjWnJ5 integratewise-bitbucket
2. GitHub SSH Key: ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMhPHLx7jtmadGvV9gE4wtUGstXMd5Jxg+7Xeq2EAm6h
3. Cloudflare Workers configs
4. All environment variables from ENV_VARIABLES.md"
```

## 📋 Using MCP Tools Directly

### Create Database

```json
{
  "tool": "mcp_Notion_notion-create-database",
  "parameters": {
    "title": [{"text": {"content": "🔐 Credentials & Keys"}}],
    "properties": {
      "Service Name": {"type": "title", "title": {}},
      "Key Type": {"type": "select", "select": {...}},
      // ... other properties
    }
  }
}
```

### Add Credential Entry

```json
{
  "tool": "mcp_Notion_notion-create-pages",
  "parameters": {
    "parent": {"database_id": "your_database_id"},
    "pages": [{
      "properties": {
        "Service Name": "Bitbucket SSH Key",
        "Key Type": "SSH Key",
        "SSH Public Key": "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIh22XRuBQAJCUbwDRNzav+6KJwMD18o2tJJm/WjWnJ5",
        "Service Provider": "Bitbucket",
        "Environment": "All",
        "Status": "Active"
      }
    }]
  }
}
```

### Search Credentials

```json
{
  "tool": "mcp_Notion_notion-search",
  "parameters": {
    "query": "Bitbucket SSH Key",
    "query_type": "internal"
  }
}
```

## 🎯 MCP vs API Approach

### MCP Advantages:
- ✅ Direct integration with Cursor AI
- ✅ No need for API keys in scripts
- ✅ Better error handling
- ✅ Can search semantically
- ✅ Native Notion integration

### When to Use MCP:
- Managing credentials from Cursor
- Searching for specific credentials
- Quick updates via AI assistant
- Creating entries interactively

### When to Use API:
- Automated scripts
- CI/CD pipelines
- Batch operations
- External integrations

## 🔄 Migration from API to MCP

If you already have credentials in Notion via API:

1. **Use MCP to fetch existing entries:**
   ```
   "Fetch the Notion credentials database and show me all entries"
   ```

2. **Use MCP to update:**
   ```
   "Update the Bitbucket SSH Key entry with the latest public key"
   ```

3. **Use MCP to search:**
   ```
   "Search for all Cloudflare credentials in the database"
   ```

## 📝 Example: Adding Credentials via MCP

Simply ask Cursor:

```
"Add the following credentials to my Notion credentials database:

1. Bitbucket SSH Key
   - Public Key: ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIh22XRuBQAJCUbwDRNzav+6KJwMD18o2tJJm/WjWnJ5 integratewise-bitbucket
   - Service Provider: Bitbucket
   - Environment: All
   - Status: Active
   - Notes: Private key at ~/.ssh/id_ed25519_bitbucket

2. GitHub SSH Key
   - Public Key: ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMhPHLx7jtmadGvV9gE4wtUGstXMd5Jxg+7Xeq2EAm6h
   - Service Provider: GitHub
   - Environment: All
   - Status: Active

3. Cloudflare Workers - Webhooks Service
   - Service Provider: Cloudflare
   - Environment: Production
   - Description: Cloudflare Workers service for webhooks
   - Notes: Configure secrets in Cloudflare Dashboard"
```

## 🔍 MCP Search Examples

### Find All SSH Keys
```
"Search the Notion credentials database for SSH keys"
```

### Find Production Credentials
```
"Find all credentials with environment Production in the credentials database"
```

### Find Cloudflare Credentials
```
"Search for all Cloudflare-related credentials"
```

## 🛠️ Maintenance via MCP

### Update Credential Status
```
"Update the Bitbucket SSH Key status to Revoked in the credentials database"
```

### Add New Credential
```
"Add a new credential:
- Service Name: Stripe API Key
- Key Type: API Key
- Service Provider: Stripe
- Environment: Production
- Status: Active"
```

### Search and Review
```
"Show me all active credentials that need rotation"
```

## ✅ MCP Benefits

1. **Natural Language Interface** - Just ask Cursor what you need
2. **Semantic Search** - Find credentials by meaning, not just keywords
3. **No Scripts Needed** - Direct interaction with Notion
4. **Better Context** - Cursor understands your codebase and credentials
5. **Integrated Workflow** - Works seamlessly within Cursor

---

**Ready to use MCP?** Just ask Cursor to manage your credentials database using natural language!
