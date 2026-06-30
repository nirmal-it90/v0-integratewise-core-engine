# IntegrateWise Deployment Guide

## Domain Strategy: .online Only

All deployments use `.online` domain for preview and production environments.

### Domains

- **Marketing**: `https://www.integratewise.online`
- **App Habitat**: `https://os.integratewise.online`
- **API**: `https://api.integratewise.online`
- **Webhooks**: `https://webhooks.integratewise.online`

### Vercel Projects

#### 1. Marketing Site
- **Project Name**: `integratewise-marketing`
- **Domain**: `www.integratewise.online`
- **Root Directory**: `apps/integrationwise-os` (marketing pages)
- **Branch**: `this-is-the-full-system` (main preview branch)
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

**Environment Variables**:
\`\`\`
NEXT_PUBLIC_APP_URL=https://os.integratewise.online
\`\`\`

**Ignored Build Step**:
\`\`\`bash
#!/bin/bash
git diff HEAD^ HEAD --quiet . || exit 1
exit 0
\`\`\`

#### 2. App Habitat (OS)
- **Project Name**: `integratewise-os`
- **Domain**: `os.integratewise.online`
- **Root Directory**: `apps/integrationwise-os`
- **Branch**: `this-is-the-full-system`
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`

**Environment Variables**:
- All Supabase vars (NEXT_PUBLIC_SUPABASE_URL, etc.)
- All Stripe vars (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, etc.)
- All Clerk vars (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, etc.)
- Database vars (POSTGRES_URL, NEON_DATABASE_URL, etc.)

#### 3. Core Engine API
- **Project Name**: `integratewise-core-engine`
- **Domain**: `api.integratewise.online`
- **Root Directory**: `apps/integratewise-core-engine`
- **Branch**: `this-is-the-full-system`

#### 4. Webhooks
- **Project Name**: `integratewise-webhooks`
- **Domain**: `webhooks.integratewise.online`
- **Root Directory**: `apps/integratewise-webhooks`
- **Branch**: `this-is-the-full-system`

### Build Optimization

**Enable**: "Skip deployments when there are no changes to the root directory or its dependencies"

This prevents unnecessary rebuilds when changes are made to other apps in the monorepo.

### Performance Targets

- **Marketing**: Lighthouse score ≥ 90
- **App**: Core 5 pages load < 2s, ISR caching enabled
- **API**: Response time < 200ms for read ops
- **Webhooks**: Process < 500ms

### Deployment Flow

1. Push to `this-is-the-full-system` branch
2. Vercel auto-deploys to `.online` subdomains
3. Run smoke tests on preview URLs
4. Verify Core 5 navigation + hub access
5. Check marketing CTAs point to `os.integratewise.online`
6. Validate integrations (Supabase, Stripe, Clerk)

### Cross-Site Linking

**Marketing → App**:
- "Get Started" → `https://os.integratewise.online/start`
- "Sign In" → `https://os.integratewise.online/auth/login`

**App → Marketing**:
- Footer: "Back to Site" → `https://www.integratewise.online`

### Health Checks

**Marketing**:
\`\`\`bash
curl https://www.integratewise.online
# Expect 200, HTML with "IntegrateWise"
\`\`\`

**App**:
\`\`\`bash
curl https://os.integratewise.online/api/health
# Expect {"status":"ok","timestamp":"..."}
\`\`\`

**API**:
\`\`\`bash
curl https://api.integratewise.online/health
# Expect {"status":"healthy"}
\`\`\`

**Webhooks**:
\`\`\`bash
curl https://webhooks.integratewise.online/api/health
# Expect 200
\`\`\`

### Troubleshooting

**Build fails with "Module not found"**:
- Check imports don't reference missing packages
- Verify `uuid` replaced with `crypto.randomUUID()`
- Ensure `@iw/types` imports removed (inline types instead)

**Page unresponsive**:
- Check for infinite loops in useEffect
- Verify Supabase clients use singleton pattern
- Enable ISR caching with `export const revalidate = 60`

**CORS errors**:
- Verify `next.config.mjs` has proper headers
- Check API responses include CORS headers

### Rollback

If deployment fails:
\`\`\`bash
# Via Vercel CLI
vercel rollback --yes

# Or redeploy previous commit
git revert HEAD
git push origin this-is-the-full-system
