# Doppler Secrets Management Setup

This guide walks you through setting up Doppler for IntegrateWise secret management.

## Why Doppler?

- **Single Source of Truth**: All secrets in one place
- **Environment Management**: Easy dev/staging/production configs
- **Automatic Syncing**: Secrets sync to GitHub, Vercel, Cloudflare
- **Audit Logs**: Track who accessed what secrets when
- **Secret Rotation**: Scheduled rotation with notifications
- **Team Access Control**: Fine-grained permissions

---

## Step 1: Install Doppler CLI

```bash
# macOS
brew install dopplerhq/cli/doppler

# Ubuntu/Debian
curl -sLf --retry 3 --tlsv1.2 --proto "=https" \
  'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' | \
  sudo gpg --dearmor -o /usr/share/keyrings/doppler-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/doppler-archive-keyring.gpg] \
  https://packages.doppler.com/public/cli/deb/debian any-version main" | \
  sudo tee /etc/apt/sources.list.d/doppler-cli.list
sudo apt-get update && sudo apt-get install doppler

# Verify installation
doppler --version
```

## Step 2: Login to Doppler

```bash
doppler login
```

## Step 3: Create Project and Environments

```bash
# Create the project
doppler projects create integratewise

# The project automatically gets these configs:
# - dev (Development)
# - stg (Staging) 
# - prd (Production)
```

## Step 4: Add Secrets to Each Environment

### Development (dev)

```bash
doppler secrets set --config dev \
  NEXTAUTH_URL="http://localhost:3000" \
  NEXTAUTH_SECRET="$(openssl rand -base64 32)" \
  DATABASE_URL="postgresql://dev-user:dev-pass@localhost:5432/integratewise_dev"
```

### Staging (stg)

```bash
doppler secrets set --config stg \
  NEXTAUTH_URL="https://preview.integratewise.co" \
  NEXTAUTH_SECRET="$(openssl rand -base64 32)" \
  DATABASE_URL="your-staging-neon-url"
```

### Production (prd)

```bash
doppler secrets set --config prd \
  NEXTAUTH_URL="https://app.integratewise.co" \
  NEXTAUTH_SECRET="$(openssl rand -base64 32)" \
  DATABASE_URL="your-production-neon-url"
```

## Step 5: Add All Required Secrets

Run this for each environment (dev, stg, prd):

```bash
CONFIG="prd"  # Change to dev or stg as needed

doppler secrets set --config $CONFIG \
  # Authentication
  NEXTAUTH_URL="https://app.integratewise.co" \
  NEXTAUTH_SECRET="your-nextauth-secret" \
  GOOGLE_CLIENT_ID="your-google-client-id" \
  GOOGLE_CLIENT_SECRET="your-google-client-secret" \
  CLERK_SECRET_KEY="your-clerk-secret-key" \
  CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key" \
  \
  # Database
  DATABASE_URL="postgresql://user:pass@host/db?sslmode=require&pgbouncer=true" \
  DATABASE_URL_UNPOOLED="postgresql://user:pass@host/db?sslmode=require" \
  \
  # AI APIs
  XAI_API_KEY="your-xai-api-key" \
  ANTHROPIC_API_KEY="your-anthropic-api-key" \
  OPENAI_API_KEY="your-openai-api-key" \
  \
  # Payments
  STRIPE_SECRET_KEY="sk_live_..." \
  STRIPE_WEBHOOK_SECRET="whsec_..." \
  STRIPE_PUBLISHABLE_KEY="pk_live_..." \
  \
  # Infrastructure
  CLOUDFLARE_API_TOKEN="your-cloudflare-token" \
  CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id" \
  VERCEL_TOKEN="your-vercel-token"
```

## Step 6: Generate Service Tokens for GitHub Actions

```bash
# Production token (for main branch deploys)
doppler configs tokens create github-actions-prd \
  --config prd \
  --max-age 0  # No expiration for CI/CD

# Staging token (for preview deploys)
doppler configs tokens create github-actions-stg \
  --config stg \
  --max-age 0

# Development token (for tests)
doppler configs tokens create github-actions-dev \
  --config dev \
  --max-age 0
```

## Step 7: Add Tokens to GitHub Secrets

Go to: **GitHub Repo → Settings → Secrets and variables → Actions**

Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `DOPPLER_TOKEN_PRD` | Production service token |
| `DOPPLER_TOKEN_STG` | Staging service token |
| `DOPPLER_TOKEN_DEV` | Development service token |

Or use the CLI:

```bash
# Get the token values first
PRD_TOKEN=$(doppler configs tokens create github-prd --config prd --plain)
STG_TOKEN=$(doppler configs tokens create github-stg --config stg --plain)
DEV_TOKEN=$(doppler configs tokens create github-dev --config dev --plain)

# Add to GitHub
gh secret set DOPPLER_TOKEN_PRD --body "$PRD_TOKEN"
gh secret set DOPPLER_TOKEN_STG --body "$STG_TOKEN"
gh secret set DOPPLER_TOKEN_DEV --body "$DEV_TOKEN"
```

## Step 8: Enable GitHub Workflows

Rename the Doppler workflow files:

```bash
cd .github/workflows

# Replace old workflows with Doppler versions
mv ci.yml ci.yml.backup
mv ci-with-doppler.yml ci.yml

mv deploy-core-engine.yml deploy-core-engine.yml.backup
mv deploy-hub.yml deploy-hub.yml.backup
mv deploy-os.yml deploy-os.yml.backup
mv deploy-webhooks.yml deploy-webhooks.yml.backup
mv deploy-with-doppler.yml deploy.yml
```

---

## Local Development

### Setup Local Environment

```bash
# Navigate to project root
cd /path/to/integratewise-ai-workspace

# Link to Doppler project
doppler setup

# Select the dev config when prompted
```

### Run with Doppler Secrets

```bash
# Run any command with secrets injected
doppler run -- pnpm dev

# Run specific app
doppler run -- pnpm dev:os

# Run tests
doppler run -- pnpm test
```

### View Secrets (Masked)

```bash
doppler secrets
```

### View Specific Secret

```bash
doppler secrets get DATABASE_URL --plain
```

---

## Sync to Other Platforms (Optional)

### Sync to Vercel

```bash
doppler integrations sync vercel \
  --config prd \
  --project integratewise \
  --import-from-vercel false
```

### Sync to Cloudflare

```bash
doppler integrations sync cloudflare \
  --config prd \
  --account-id YOUR_ACCOUNT_ID
```

---

## Secret Rotation

### Generate New Secret Values

```bash
# Rotate NEXTAUTH_SECRET
doppler secrets set NEXTAUTH_SECRET="$(openssl rand -base64 32)" --config prd

# Rotate all JWT secrets
for config in dev stg prd; do
  doppler secrets set NEXTAUTH_SECRET="$(openssl rand -base64 32)" --config $config
done
```

### View Secret History

```bash
doppler activity --config prd
```

---

## Team Access

### Invite Team Members

```bash
doppler team members add teammate@integratewise.co
```

### Set Permissions

- **Owner**: Full access to all secrets and settings
- **Admin**: Manage secrets, cannot delete project
- **Developer**: Read secrets, cannot modify
- **Viewer**: Read-only access to non-sensitive secrets

---

## Troubleshooting

### "DOPPLER_TOKEN is not set"

Make sure the GitHub secret is correctly named and the workflow references it:

```yaml
env:
  DOPPLER_TOKEN: ${{ secrets.DOPPLER_TOKEN_PRD }}
```

### "Config not found"

Verify the config exists:

```bash
doppler configs
```

### "Token expired"

Generate a new service token:

```bash
doppler configs tokens create new-github-token --config prd
```

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `doppler login` | Authenticate CLI |
| `doppler setup` | Link directory to project |
| `doppler secrets` | List all secrets |
| `doppler secrets set KEY=value` | Set a secret |
| `doppler secrets get KEY --plain` | Get secret value |
| `doppler run -- command` | Run command with secrets |
| `doppler configs tokens create NAME` | Create service token |

---

## Resources

- [Doppler Documentation](https://docs.doppler.com/)
- [GitHub Actions Integration](https://docs.doppler.com/docs/github-actions)
- [Vercel Integration](https://docs.doppler.com/docs/vercel)
- [Cloudflare Integration](https://docs.doppler.com/docs/cloudflare-workers)
