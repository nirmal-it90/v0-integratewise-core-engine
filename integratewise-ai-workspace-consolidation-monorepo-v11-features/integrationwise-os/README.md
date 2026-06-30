# IntegrateWise Operating System

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/integratewize/v0-integrate-wise-operating-system)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/nfzu7dmRmJT)

## Overview

IntegrateWise OS is an enterprise-grade customer success platform that unifies integrations, multi-AI routing, and governance tools.

## Quick Start

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## Environment Variables

Required variables (set in Vercel or `.env.local`):

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key (server only) | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes |

## Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── ping/          # Health check endpoint
│   │   ├── stripe/        # Stripe webhook handler
│   │   └── billing/       # Billing API routes
│   ├── auth/              # Authentication pages
│   └── (dashboard)/       # Protected dashboard routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── landing/          # Landing page components
├── lib/                   # Utilities and clients
│   ├── supabase/         # Supabase client (client.ts, server.ts)
│   ├── stripe.ts         # Stripe client and helpers
│   └── billing/          # Billing service
└── security-check.ts     # Security audit utility
\`\`\`

## Integrations

- **Supabase** - Database, auth, and vector storage
- **Stripe** - Payments and subscriptions
- **Vercel AI Gateway** - Multi-AI routing

## Security

Run security audit:

\`\`\`bash
pnpm check:org
\`\`\`

Verifies:
- Service role keys not exposed to client
- Org isolation on list endpoints
- Environment variables configured

## Design System

Uses the IntegrateWise canonical design system:
- Primary: `#1e40af` (Enterprise Blue)
- Clean white backgrounds
- Inter font family

## Deployment

Live at: **[https://vercel.com/integratewize/v0-integrate-wise-operating-system](https://vercel.com/integratewize/v0-integrate-wise-operating-system)**

Build on: **[https://v0.app/chat/nfzu7dmRmJT](https://v0.app/chat/nfzu7dmRmJT)**
