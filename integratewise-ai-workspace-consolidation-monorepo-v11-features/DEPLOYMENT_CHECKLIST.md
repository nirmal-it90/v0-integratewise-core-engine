# Deployment Checklist

Pre-deployment verification for IntegrateWise Customer Success landing page.

## Dependencies

- [ ] `package.json` contains `next`, `react`, `react-dom`
- [ ] Dependencies installed: `pnpm install`
- [ ] Lock file committed: `pnpm-lock.yaml`

## Router Hygiene

- [ ] App Router only: `app/` directory exists
- [ ] Pages Router removed: no `pages/` directory at root
- [ ] Single router pattern (no dual routers)

## Workspace Scope

- [ ] `pnpm-workspace.yaml` includes `apps/*` and `packages/*`
- [ ] Workspace packages use source exports (`./src/index.ts`)
- [ ] `transpilePackages` configured in `next.config.mjs`

## Vercel Settings

- [ ] Root Directory: `.` (monorepo root)
- [ ] Framework: Next.js (auto-detected)
- [ ] Install Command: `pnpm install`
- [ ] Build Command: `pnpm build`
- [ ] Output Directory: `.next`
- [ ] Node.js Version: 20.x (via `.nvmrc`)

## Configuration Files

- [ ] `vercel.json` present with correct settings
- [ ] `.nvmrc` contains `20`
- [ ] `next.config.mjs` has `transpilePackages`

## Verification Gates

### Build

- [ ] `pnpm build` passes locally
- [ ] No "Next.js version not detected" errors
- [ ] Static pages generated

### Accessibility

- [ ] H1 present in Hero section
- [ ] Skip to content link in header
- [ ] Focus visible on interactive elements
- [ ] `prefers-reduced-motion` respected
- [ ] WCAG AA color contrast met

### Performance

- [ ] First Load JS < 100KB per route
- [ ] Images use AVIF/WebP formats
- [ ] Lighthouse Performance >= 90

## Preview Confirmation

- [ ] Vercel preview deployment succeeds
- [ ] Preview URL renders landing page
- [ ] All sections visible: Hero, KPIs, HowItWorks, Agents, Trust, Badges, FAQ, Footer
- [ ] No console errors
- [ ] Mobile responsive

## Post-Deployment

- [ ] Production URL accessible
- [ ] Analytics tracking active
- [ ] Monitoring configured
