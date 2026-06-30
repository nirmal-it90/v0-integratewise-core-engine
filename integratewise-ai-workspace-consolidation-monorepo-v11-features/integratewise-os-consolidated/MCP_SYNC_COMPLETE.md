# MCP Notion Credentials Database - Setup Complete

## ✅ Database Created

**Database Name:** 🔐 Credentials & Keys  
**Database URL:** https://www.notion.so/2efc7e4792524411a145272a7aa46547  
**Data Source ID:** `c4ac2d66-9c1a-4969-a92a-f95e894a8218`

## 📊 Database Schema

The database has been created with the following properties:

### Core Properties
- **Service Name** (Title) - Name of the service
- **Key Type** (Select) - API Key, SSH Key, OAuth Token, etc.
- **Service Provider** (Select) - GitHub, Bitbucket, Cloudflare, Supabase, etc.
- **Environment** (Select) - Development, Staging, Production, Local, All
- **Status** (Select) - Active, Inactive, Revoked, Expired

### Credential Storage
- **API Key** (Rich Text)
- **SSH Key** (Rich Text)
- **SSH Public Key** (Rich Text)
- **Secret/Token** (Rich Text)

### Metadata
- **Description** (Rich Text)
- **Usage/Purpose** (Rich Text)
- **Tags** (Multi-select)
- **Owner/Team** (Rich Text)
- **Notes** (Rich Text)
- **Rotation Schedule** (Select)
- **URL/Endpoint** (URL)
- **Created Date** (Date)
- **Expiry Date** (Date)
- **Last Used** (Date)

## 📝 Credentials Ready to Add

The following credentials are documented and ready to be added:

### SSH Keys
1. **Bitbucket SSH Key**
   - Public Key: `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIh22XRuBQAJCUbwDRNzav+6KJwMD18o2tJJm/WjWnJ5 integratewise-bitbucket`
   - Private key location: `~/.ssh/id_ed25519_bitbucket`

2. **GitHub SSH Key**
   - Public Key: `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMhPHLx7jtmadGvV9gE4wtUGstXMd5Jxg+7Xeq2EAm6h`
   - Private key location: `~/.ssh/id_ed25519_github`

### Cloudflare Services
3. **Cloudflare Workers - Webhooks Service**
4. **Cloudflare Workers - Core Engine**
5. **Cloudflare API Token**

### Supabase
6. **Supabase URL** (NEXT_PUBLIC_SUPABASE_URL)
7. **Supabase Anon Key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)
8. **Supabase Service Role Key** (SUPABASE_SERVICE_ROLE_KEY)

### Webhook Secrets
9. **HubSpot Webhook Secret**
10. **Slack Signing Secret**
11. **Slack Webhook URL**
12. **Discord Public Key**
13. **Discord Webhook URL**
14. **GitHub Webhook Secret**
15. **Asana Webhook Secret**

### AI API Keys
16. **Claude API Key** (CLAUDE_API_KEY)
17. **OpenAI API Key** (OPENAI_API_KEY)
18. **DeepSeek API Key** (DEEPSEEK_API_KEY)

### Other Secrets
19. **Cron Secret** (CRON_SECRET)
20. **Capture API Secret** (CAPTURE_API_SECRET)
21. **Webhook API Secret** (WEBHOOK_API_SECRET)

## 🚀 Next Steps

### Option 1: Add via MCP (Recommended)
Ask Cursor to add credentials using MCP Notion tools:

```
"Add these credentials to the Notion Credentials database:
1. Bitbucket SSH Key with public key ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIh22XRuBQAJCUbwDRNzav+6KJwMD18o2tJJm/WjWnJ5
2. GitHub SSH Key with public key ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMhPHLx7jtmadGvV9gE4wtUGstXMd5Jxg+7Xeq2EAm6h
3. Cloudflare Workers services
4. All credentials from ENV_VARIABLES.md"
```

### Option 2: Manual Entry
1. Open the database: https://www.notion.so/2efc7e4792524411a145272a7aa46547
2. Click "New" to add each credential
3. Fill in the properties from the list above

### Option 3: Use API Scripts
```bash
export NOTION_CREDENTIALS_DB_ID="c4ac2d66-9c1a-4969-a92a-f95e894a8218"
export NOTION_API_KEY="your_api_key"
npx tsx scripts/add-credentials-to-notion.ts
```

## 📋 MCP Benefits

Using MCP for credentials management provides:
- ✅ Natural language interface
- ✅ Direct integration with Cursor
- ✅ Semantic search capabilities
- ✅ No need for API keys in scripts
- ✅ Better error handling

---

**Database is ready!** You can now add credentials using MCP tools or manually in Notion.
