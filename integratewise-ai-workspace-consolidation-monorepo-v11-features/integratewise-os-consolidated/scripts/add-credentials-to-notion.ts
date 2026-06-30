/**
 * Add Credentials to Notion
 * 
 * Adds known credentials (SSH keys, Cloudflare configs) to Notion database
 */

import { addCredential } from './notion-credentials-manager';

const CREDENTIALS_DB_ID = process.env.NOTION_CREDENTIALS_DB_ID || '';

if (!CREDENTIALS_DB_ID) {
  console.error('❌ NOTION_CREDENTIALS_DB_ID environment variable is required');
  console.log('\n💡 Set it with: export NOTION_CREDENTIALS_DB_ID="your_database_id"');
  process.exit(1);
}

/**
 * Known credentials to add
 */
const credentials = [
  // SSH Keys
  {
    serviceName: 'Bitbucket SSH Key',
    keyType: 'SSH Key' as const,
    sshPublicKey: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIh22XRuBQAJCUbwDRNzav+6KJwMD18o2tJJm/WjWnJ5 integratewise-bitbucket',
    serviceProvider: 'Bitbucket',
    environment: 'All' as const,
    status: 'Active' as const,
    description: 'SSH key for Bitbucket repository access',
    usage: 'Used for git operations with Bitbucket repositories',
    tags: ['Production', 'Team'],
    owner: 'DevOps Team',
    notes: 'Private key located at ~/.ssh/id_ed25519_bitbucket. Configured in ~/.ssh/config for bitbucket.org',
    rotationSchedule: 'On Demand' as const,
  },
  {
    serviceName: 'GitHub SSH Key',
    keyType: 'SSH Key' as const,
    sshPublicKey: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMhPHLx7jtmadGvV9gE4wtUGstXMd5Jxg+7Xeq2EAm6h "nirmpapri@gmail.com"',
    serviceProvider: 'GitHub',
    environment: 'All' as const,
    status: 'Active' as const,
    description: 'SSH key for GitHub repository access',
    usage: 'Used for git operations with GitHub repositories',
    tags: ['Production', 'Team'],
    owner: 'DevOps Team',
    notes: 'Private key located at ~/.ssh/id_ed25519_github',
    rotationSchedule: 'On Demand' as const,
  },
  
  // Cloudflare - Webhooks Service
  {
    serviceName: 'Cloudflare Workers - Webhooks Service',
    keyType: 'Access Token' as const,
    serviceProvider: 'Cloudflare',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Cloudflare Workers deployment and secrets for integratewise-webhooks service',
    usage: 'Deployed at Cloudflare Workers. Handles webhooks from various services (Slack, Discord, HubSpot, etc.)',
    tags: ['Production', 'Critical'],
    owner: 'DevOps Team',
    notes: 'Configure secrets in Cloudflare Dashboard or via wrangler secret put. Service: integratewise-webhooks',
    rotationSchedule: 'On Demand' as const,
    url: 'https://workers.cloudflare.com',
  },
  
  // Cloudflare - Core Engine Service
  {
    serviceName: 'Cloudflare Workers - Core Engine',
    keyType: 'Access Token' as const,
    serviceProvider: 'Cloudflare',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Cloudflare Workers deployment and secrets for integratewise-core-engine service',
    usage: 'AI routing and event processing service deployed on Cloudflare Workers',
    tags: ['Production', 'Critical'],
    owner: 'DevOps Team',
    notes: 'Configure secrets in Cloudflare Dashboard or via wrangler secret put. Service: integratewise-core-engine. Requires DATABASE_URL and AI model API keys.',
    rotationSchedule: 'On Demand' as const,
    url: 'https://workers.cloudflare.com',
  },
  
  // Cloudflare - General Account
  {
    serviceName: 'Cloudflare API Token',
    keyType: 'API Key' as const,
    serviceProvider: 'Cloudflare',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Cloudflare API token for managing Workers, DNS, and other Cloudflare services',
    usage: 'Used for wrangler CLI deployments and Cloudflare API operations',
    tags: ['Production', 'Admin'],
    owner: 'DevOps Team',
    notes: 'Required for deploying Workers. Get from Cloudflare Dashboard > My Profile > API Tokens. Needs Workers:Edit and Account:Read permissions.',
    rotationSchedule: 'Quarterly' as const,
    url: 'https://dash.cloudflare.com/profile/api-tokens',
  },
  
  // Supabase
  {
    serviceName: 'Supabase URL',
    keyType: 'API Key' as const,
    serviceProvider: 'Supabase',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Supabase project URL',
    usage: 'NEXT_PUBLIC_SUPABASE_URL - Used for database and authentication',
    tags: ['Production', 'Critical'],
    owner: 'DevOps Team',
    notes: 'Set in environment variables. Find in Supabase Dashboard > Settings > API',
    rotationSchedule: 'Never' as const,
  },
  {
    serviceName: 'Supabase Anon Key',
    keyType: 'API Key' as const,
    serviceProvider: 'Supabase',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Supabase anonymous/public API key',
    usage: 'NEXT_PUBLIC_SUPABASE_ANON_KEY - Client-side database access',
    tags: ['Production', 'Critical'],
    owner: 'DevOps Team',
    notes: 'Set in environment variables. Find in Supabase Dashboard > Settings > API',
    rotationSchedule: 'Quarterly' as const,
  },
  {
    serviceName: 'Supabase Service Role Key',
    keyType: 'Secret Key' as const,
    serviceProvider: 'Supabase',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Supabase service role key (admin access)',
    usage: 'SUPABASE_SERVICE_ROLE_KEY - Server-side admin operations',
    tags: ['Production', 'Critical', 'Admin'],
    owner: 'DevOps Team',
    notes: '⚠️ KEEP SECRET - Has full database access. Never expose to client. Find in Supabase Dashboard > Settings > API',
    rotationSchedule: 'Quarterly' as const,
  },
  
  // Webhook Secrets
  {
    serviceName: 'HubSpot Webhook Secret',
    keyType: 'Secret Key' as const,
    serviceProvider: 'HubSpot',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'HubSpot webhook signing secret',
    usage: 'HUBSPOT_WEBHOOK_SECRET - Verify HubSpot webhook signatures',
    tags: ['Production'],
    owner: 'DevOps Team',
    rotationSchedule: 'Quarterly' as const,
  },
  {
    serviceName: 'Slack Signing Secret',
    keyType: 'Secret Key' as const,
    serviceProvider: 'Slack',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Slack app signing secret',
    usage: 'SLACK_SIGNING_SECRET - Verify Slack request signatures',
    tags: ['Production'],
    owner: 'DevOps Team',
    notes: 'Find in Slack App Settings > Basic Information > App Credentials',
    rotationSchedule: 'Quarterly' as const,
  },
  {
    serviceName: 'Slack Webhook URL',
    keyType: 'Access Token' as const,
    serviceProvider: 'Slack',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Slack incoming webhook URL',
    usage: 'SLACK_WEBHOOK_URL - Send messages to Slack channels',
    tags: ['Production'],
    owner: 'DevOps Team',
    notes: 'Format: https://hooks.slack.com/services/...',
    rotationSchedule: 'On Demand' as const,
  },
  {
    serviceName: 'Discord Public Key',
    keyType: 'Secret Key' as const,
    serviceProvider: 'Discord',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Discord application public key',
    usage: 'DISCORD_PUBLIC_KEY - Verify Discord interactions',
    tags: ['Production'],
    owner: 'DevOps Team',
    notes: 'Find in Discord Developer Portal > Your App > General Information',
    rotationSchedule: 'Never' as const,
  },
  {
    serviceName: 'Discord Webhook URL',
    keyType: 'Access Token' as const,
    serviceProvider: 'Discord',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Discord webhook URL',
    usage: 'DISCORD_WEBHOOK_URL - Send messages to Discord channels',
    tags: ['Production'],
    owner: 'DevOps Team',
    notes: 'Format: https://discord.com/api/webhooks/...',
    rotationSchedule: 'On Demand' as const,
  },
  {
    serviceName: 'GitHub Webhook Secret',
    keyType: 'Secret Key' as const,
    serviceProvider: 'GitHub',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'GitHub webhook secret',
    usage: 'GITHUB_WEBHOOK_SECRET - Verify GitHub webhook signatures',
    tags: ['Production'],
    owner: 'DevOps Team',
    rotationSchedule: 'Quarterly' as const,
  },
  {
    serviceName: 'Asana Webhook Secret',
    keyType: 'Secret Key' as const,
    serviceProvider: 'Asana',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Asana webhook signing secret',
    usage: 'ASANA_WEBHOOK_SECRET - Verify Asana webhook signatures',
    tags: ['Production'],
    owner: 'DevOps Team',
    rotationSchedule: 'Quarterly' as const,
  },
  
  // AI API Keys
  {
    serviceName: 'Claude API Key',
    keyType: 'API Key' as const,
    serviceProvider: 'Anthropic',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Anthropic Claude API key',
    usage: 'CLAUDE_API_KEY - Used for AI insights and chat features',
    tags: ['Production', 'Critical'],
    owner: 'AI Team',
    notes: 'Get from Anthropic Console: https://console.anthropic.com',
    rotationSchedule: 'Quarterly' as const,
  },
  {
    serviceName: 'OpenAI API Key',
    keyType: 'API Key' as const,
    serviceProvider: 'OpenAI',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'OpenAI API key',
    usage: 'OPENAI_API_KEY - Used for AI features (alternative to Claude)',
    tags: ['Production'],
    owner: 'AI Team',
    notes: 'Get from OpenAI Platform: https://platform.openai.com/api-keys',
    rotationSchedule: 'Quarterly' as const,
  },
  {
    serviceName: 'DeepSeek API Key',
    keyType: 'API Key' as const,
    serviceProvider: 'Other',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'DeepSeek API key',
    usage: 'DEEPSEEK_API_KEY - Used for AI features (alternative model)',
    tags: ['Production'],
    owner: 'AI Team',
    rotationSchedule: 'Quarterly' as const,
  },
  
  // Other Secrets
  {
    serviceName: 'Cron Secret',
    keyType: 'Secret Key' as const,
    serviceProvider: 'Other',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Secret for authenticating cron job requests',
    usage: 'CRON_SECRET - Verify cron job API requests',
    tags: ['Production'],
    owner: 'DevOps Team',
    rotationSchedule: 'Quarterly' as const,
  },
  {
    serviceName: 'Capture API Secret',
    keyType: 'Secret Key' as const,
    serviceProvider: 'Other',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Secret for /api/capture endpoint',
    usage: 'CAPTURE_API_SECRET - Secure capture endpoint',
    tags: ['Production'],
    owner: 'DevOps Team',
    rotationSchedule: 'Quarterly' as const,
  },
  {
    serviceName: 'Webhook API Secret',
    keyType: 'Secret Key' as const,
    serviceProvider: 'Other',
    environment: 'Production' as const,
    status: 'Active' as const,
    description: 'Secret for /api/webhook endpoint',
    usage: 'WEBHOOK_API_SECRET - Secure webhook endpoint',
    tags: ['Production'],
    owner: 'DevOps Team',
    rotationSchedule: 'Quarterly' as const,
  },
];

/**
 * Add all credentials to Notion
 */
async function addAllCredentials() {
  console.log('📝 Adding credentials to Notion database...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const cred of credentials) {
    try {
      await addCredential(cred);
      successCount++;
      console.log(`✅ Added: ${cred.serviceName}`);
    } catch (error: any) {
      errorCount++;
      console.log(`❌ Failed to add ${cred.serviceName}: ${error.message}`);
    }
  }
  
  console.log(`\n✅ Complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Total: ${credentials.length}\n`);
  
  if (successCount > 0) {
    console.log('📊 Next steps:');
    console.log('   1. Open your Notion credentials database');
    console.log('   2. Verify all credentials were added correctly');
    console.log('   3. Add any missing API keys or tokens manually');
    console.log('   4. Update Cloudflare-specific secrets in Cloudflare Dashboard\n');
  }
}

// Run
addAllCredentials().catch(console.error);
