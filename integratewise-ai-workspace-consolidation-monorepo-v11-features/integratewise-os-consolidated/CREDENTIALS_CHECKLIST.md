# Credentials Checklist

This document lists all credentials that should be added to the Notion Credentials Database.

## ✅ Already Added to Notion

### SSH Keys
- ✅ Bitbucket SSH Key (`id_ed25519_bitbucket`)
- ✅ GitHub SSH Key (`id_ed25519_github`)

### Cloudflare Services
- ✅ Cloudflare Workers - Webhooks Service
- ✅ Cloudflare Workers - Core Engine  
- ✅ Cloudflare API Token (structure documented)

## 📋 Credentials to Add Manually

### Cloudflare Secrets (Configure in Cloudflare Dashboard)

These need to be set up in Cloudflare Workers dashboard. Add them to Notion after configuration:

#### For `integratewise-webhooks` Worker:
- [ ] Slack Webhook URL
- [ ] Discord Webhook URL
- [ ] HubSpot API Key
- [ ] Asana API Token
- [ ] Stripe API Key
- [ ] Other webhook endpoints

#### For `integratewise-core-engine` Worker:
- [ ] DATABASE_URL (Neon PostgreSQL)
- [ ] OPENAI_API_KEY (if used)
- [ ] ANTHROPIC_API_KEY (if used)
- [ ] Other AI model API keys

### Database Credentials
- [ ] Supabase URL
- [ ] Supabase Service Role Key
- [ ] Neon Database Connection String
- [ ] Other database credentials

### API Keys
- [ ] Stripe API Keys (Publishable & Secret)
- [ ] HubSpot API Key
- [ ] Notion API Key (for credentials database)
- [ ] Slack API Tokens
- [ ] Discord Bot Token
- [ ] Other third-party API keys

### OAuth Tokens
- [ ] Google OAuth Client ID & Secret
- [ ] Microsoft OAuth Client ID & Secret
- [ ] GitHub OAuth Token
- [ ] Other OAuth credentials

### Environment Variables
- [ ] Check `.env.local` for any additional keys
- [ ] Check Cloudflare Workers secrets
- [ ] Check Vercel environment variables (if deployed there)

## 🔍 How to Find Cloudflare Secrets

### Option 1: Cloudflare Dashboard
1. Go to https://dash.cloudflare.com
2. Select your account
3. Go to Workers & Pages
4. Select the worker (integratewise-webhooks or integratewise-core-engine)
5. Go to Settings > Variables and Secrets
6. View configured secrets

### Option 2: Wrangler CLI
```bash
# List secrets (won't show values, but shows what's configured)
wrangler secret list

# Add a secret
wrangler secret put SECRET_NAME
```

### Option 3: Check Deployment Logs
- Check CI/CD logs for environment variable references
- Check GitHub Actions secrets
- Check deployment configuration files

## 📝 Adding to Notion

Use the credential manager script:

```bash
# Set database ID
export NOTION_CREDENTIALS_DB_ID="your_database_id"

# Add known credentials
npx tsx scripts/add-credentials-to-notion.ts
```

Or add manually in Notion:
1. Open your Credentials database
2. Click "New" to add a credential
3. Fill in all relevant fields
4. Make sure to set:
   - Service Name
   - Key Type
   - Service Provider
   - Environment
   - Status
   - Description

## 🔒 Security Notes

- **Never commit credentials** to git repositories
- **Use environment variables** for sensitive data
- **Rotate credentials regularly** based on rotation schedule
- **Mark revoked keys** with "Revoked" status immediately
- **Limit access** to Notion database to authorized team members only
- **Use Cloudflare Workers Secrets** for production secrets (not wrangler.toml)

## ✅ Verification Checklist

After adding credentials:

- [ ] All SSH keys documented
- [ ] All Cloudflare secrets documented
- [ ] All API keys documented
- [ ] All OAuth tokens documented
- [ ] All database credentials documented
- [ ] Environment (Dev/Staging/Prod) correctly set
- [ ] Status (Active/Inactive) correctly set
- [ ] Rotation schedule defined
- [ ] Owner/Team assigned
- [ ] Description and usage notes added

---

**Last Updated:** 2026-01-21
