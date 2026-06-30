# CURSOR SCAN PROMPT
## Complete Analysis of /Users/nirmal/Github/13.1

Copy and paste this prompt into Cursor:

---

**TASK: Complete Repository & Code Discovery**

Scan the entire `/Users/nirmal/Github/13.1` directory and provide a comprehensive analysis.

**INSTRUCTIONS:**

1. **Directory Structure Scan**
   - List ALL folders and repositories in `/Users/nirmal/Github/13.1`
   - Identify project types (Next.js, Node.js, Python, etc.)
   - Note monorepo vs single-app structures

2. **Repository Analysis** - For EACH repository found:
   - Repository name
   - Technology stack (package.json, requirements.txt, etc.)
   - Purpose/description (from README.md)
   - Key features implemented
   - Database schemas (find all .sql files)
   - API routes/endpoints (scan app/api, src/api, etc.)
   - Environment variables needed (.env.example, vercel.json)
   - Deployment status (vercel.json, Dockerfile, etc.)

3. **IntegrateWise-Related Discoveries**
   - Find ALL IntegrateWise-related projects
   - Identify webhook implementations
   - Locate AI/LLM integrations
   - Find Slack/Discord bot code
   - Discover n8n workflows
   - Identify any Supabase projects
   - Find any microservices or API gateways

4. **Code Pattern Search** - Search ALL repositories for:
   - `brainstorm` (any mentions)
   - `ai-relay` or `ai_relay` or `aiRelay`
   - `triage` (any implementations)
   - `health-score` or `health_score`
   - `pgvector` or `vector` (embeddings)
   - `webhook` implementations
   - `openai` or `anthropic` (AI provider integrations)
   - `slack` bot implementations
   - `stripe` or `razorpay` (payment integrations)

5. **SQL Schema Discovery** - Find and catalog:
   - All .sql files
   - Migration scripts
   - Table definitions
   - Database setup scripts
   - Seed data scripts

6. **Integration Points** - Identify:
   - External API integrations
   - Webhook endpoints
   - OAuth flows
   - Microservice communication
   - Message queues or event systems

7. **Documentation Discovery** - Find:
   - All README.md files
   - Architecture docs (*.md with "architecture" in name)
   - API documentation
   - Setup/deployment guides
   - Runbooks

8. **Configuration Files** - Catalog:
   - package.json (dependencies)
   - vercel.json (deployment config)
   - docker-compose.yml
   - .env.example
   - turbo.json (monorepo config)
   - tsconfig.json

**OUTPUT FORMAT:**

```markdown
# Complete Scan Results: /Users/nirmal/Github/13.1

## Summary
- Total repositories: X
- IntegrateWise-related: X
- Other projects: X

## Repository Inventory

### 1. [Repository Name]
- **Path:** `/Users/nirmal/Github/13.1/[name]`
- **Type:** [Next.js/Node.js/Python/etc.]
- **Purpose:** [Description]
- **Status:** [Active/Legacy/Archived]
- **Key Features:**
  - Feature 1
  - Feature 2
- **Database:** [PostgreSQL/MongoDB/etc.]
  - Tables: X
  - Migrations: X files
- **API Routes:** X endpoints
  - List key endpoints
- **Integrations:**
  - Integration 1
  - Integration 2
- **Environment Variables:**
  - VAR_1
  - VAR_2
- **README Summary:** [Key points]

### 2. [Next Repository]
...

## IntegrateWise Ecosystem Map

### Core Platform
- Main app repository: [path]
- Webhook system: [path]
- AI components: [path]

### Supporting Services
- Service 1: [path and purpose]
- Service 2: [path and purpose]

## Code Pattern Analysis

### Brainstorming Layer
- Found in: [list all files/locations]
- Implementation status: [%]
- Key files:
  - file1.ts
  - file2.ts

### AI-Relay
- Found in: [locations]
- Status: [implemented/planned]

### Triage System
- Found in: [locations]
- Status: [implemented/planned]

### Health Scoring
- Found in: [locations]
- Status: [implemented/planned]

### Webhooks
- Total webhook endpoints: X
- Providers:
  - Provider 1: [endpoint]
  - Provider 2: [endpoint]

### AI Integrations
- OpenAI: [usage locations]
- Anthropic: [usage locations]
- Other: [list]

## Database Schema Inventory

### SQL Files Found
1. `/path/to/file1.sql` - [description]
2. `/path/to/file2.sql` - [description]

### Table Count by Database
- Database 1: X tables
- Database 2: X tables

### Key Schemas
- Schema 1: [tables included]
- Schema 2: [tables included]

## Integration & Deployment Map

### Live Deployments
- App 1: [URL] - [purpose]
- App 2: [URL] - [purpose]

### External Integrations
- Slack: [status]
- Stripe: [status]
- Supabase: [status]
- n8n: [status]

### API Endpoints Summary
- Total API routes: X
- Webhooks: X
- Public APIs: X
- Internal APIs: X

## Configuration Summary

### Package Dependencies (Unique)
- Next.js: [versions across repos]
- React: [versions]
- Supabase: [versions]
- OpenAI: [versions]
- [Other key dependencies]

### Environment Variables (All Unique)
- SUPABASE_*
- OPENAI_*
- SLACK_*
- STRIPE_*
- [All others]

## Documentation Found

### Architecture Docs
1. [filename] - [summary]
2. [filename] - [summary]

### API Docs
1. [filename] - [summary]

### Setup Guides
1. [filename] - [summary]

## Recommendations

### Consolidation Opportunities
- [Duplicate code/repos that can be merged]

### Missing Components
- [Components mentioned in docs but not found in code]

### Integration Gaps
- [Services that should talk to each other but don't]

### Security Concerns
- [Any .env files committed, exposed keys, etc.]

## Summary Statistics

- Total Lines of Code: ~X
- Total API Endpoints: X
- Total Database Tables: X
- Total SQL Migrations: X
- Total Dependencies (unique): X
- Total Environment Variables: X
```

**SPECIAL ATTENTION:**

- Flag any n8n workflow files (*.json in n8n directories)
- Identify any Cloudflare Workers code
- Find any serverless functions
- Locate any GitHub Actions workflows
- Find any Docker configurations
- Identify any testing frameworks and test coverage

**DELIVERABLE:**

A complete markdown report that gives me:
1. Full visibility into what code exists
2. Understanding of how components connect
3. Identification of what's implemented vs planned
4. Clear path for consolidation
5. Integration opportunities
6. Security/cleanup recommendations

---

**START SCAN NOW**
