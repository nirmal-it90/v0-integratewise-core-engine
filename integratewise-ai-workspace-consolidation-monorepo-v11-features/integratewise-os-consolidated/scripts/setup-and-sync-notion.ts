/**
 * Complete Setup and Sync Script
 * 
 * Creates Notion database (if needed) and syncs all credentials
 * Usage: npx tsx scripts/setup-and-sync-notion.ts
 */

import { Client } from '@notionhq/client';
import { addCredential } from './notion-credentials-manager';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupAndSync() {
  console.log('🔐 Notion Credentials Database Setup & Sync\n');
  console.log('This script will:');
  console.log('  1. Create Notion database (if needed)');
  console.log('  2. Add all credentials from Cloudflare, SSH keys, and environment variables\n');
  
  // Get API key
  let apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) {
    apiKey = await question('Enter your Notion API Key (get from https://www.notion.so/my-integrations): ');
    if (!apiKey) {
      console.error('❌ API key is required');
      process.exit(1);
    }
  }
  
  const notion = new Client({ auth: apiKey });
  
  // Check if database exists
  let dbId = process.env.NOTION_CREDENTIALS_DB_ID;
  
  if (!dbId) {
    // Ask if database exists
    const hasDb = await question('\nDo you already have a Credentials database? (y/n): ');
    
    if (hasDb.toLowerCase() === 'y') {
      dbId = await question('Enter your existing database ID: ');
      dbId = dbId.trim();
    } else {
      // Create new database
      console.log('\n📝 Creating new database...');
      const parentPageId = process.env.NOTION_PARENT_PAGE_ID || 
        await question('Enter Notion Page ID where database should be created: ');
      
      try {
        const database = await notion.databases.create({
          parent: {
            type: 'page_id',
            page_id: parentPageId.trim(),
          },
          title: [
            {
              type: 'text',
              text: { content: '🔐 Credentials & Keys' },
            },
          ],
          description: [
            {
              type: 'text',
              text: {
                content: 'Centralized storage for API keys, SSH keys, OAuth tokens, and other credentials',
              },
            },
          ],
          properties: {
            'Service Name': { title: {} },
            'Key Type': {
              select: {
                options: [
                  { name: 'API Key', color: 'blue' },
                  { name: 'SSH Key', color: 'orange' },
                  { name: 'OAuth Token', color: 'green' },
                  { name: 'Access Token', color: 'purple' },
                  { name: 'Secret Key', color: 'red' },
                  { name: 'Password', color: 'pink' },
                  { name: 'Database Connection', color: 'yellow' },
                  { name: 'Other', color: 'gray' },
                ],
              },
            },
            'API Key': { rich_text: {} },
            'SSH Key': { rich_text: {} },
            'SSH Public Key': { rich_text: {} },
            'Secret/Token': { rich_text: {} },
            'Service Provider': {
              select: {
                options: [
                  { name: 'GitHub', color: 'default' },
                  { name: 'Bitbucket', color: 'blue' },
                  { name: 'AWS', color: 'orange' },
                  { name: 'Cloudflare', color: 'orange' },
                  { name: 'Supabase', color: 'green' },
                  { name: 'Stripe', color: 'purple' },
                  { name: 'OpenAI', color: 'green' },
                  { name: 'Anthropic', color: 'purple' },
                  { name: 'Slack', color: 'purple' },
                  { name: 'Discord', color: 'gray' },
                  { name: 'HubSpot', color: 'orange' },
                  { name: 'Other', color: 'gray' },
                ],
              },
            },
            'Environment': {
              select: {
                options: [
                  { name: 'Development', color: 'green' },
                  { name: 'Staging', color: 'yellow' },
                  { name: 'Production', color: 'red' },
                  { name: 'Local', color: 'blue' },
                  { name: 'All', color: 'gray' },
                ],
              },
            },
            'Status': {
              select: {
                options: [
                  { name: 'Active', color: 'green' },
                  { name: 'Inactive', color: 'gray' },
                  { name: 'Revoked', color: 'red' },
                  { name: 'Expired', color: 'orange' },
                ],
              },
            },
            'Description': { rich_text: {} },
            'Usage/Purpose': { rich_text: {} },
            'Created Date': { date: {} },
            'Expiry Date': { date: {} },
            'Last Used': { date: {} },
            'Tags': {
              multi_select: {
                options: [
                  { name: 'Critical', color: 'red' },
                  { name: 'Production', color: 'orange' },
                  { name: 'Team', color: 'blue' },
                ],
              },
            },
            'Owner/Team': { rich_text: {} },
            'Notes': { rich_text: {} },
            'Rotation Schedule': {
              select: {
                options: [
                  { name: 'Never', color: 'gray' },
                  { name: 'Monthly', color: 'blue' },
                  { name: 'Quarterly', color: 'yellow' },
                  { name: 'Annually', color: 'orange' },
                  { name: 'On Demand', color: 'green' },
                ],
              },
            },
            'URL/Endpoint': { url: {} },
          },
        });
        
        dbId = database.id;
        console.log('✅ Database created successfully!');
        console.log(`   Database ID: ${dbId}`);
        console.log(`   URL: https://www.notion.so/${dbId.replace(/-/g, '')}\n`);
      } catch (error: any) {
        console.error('❌ Error creating database:', error.message);
        process.exit(1);
      }
    }
  }
  
  // Set for the addCredential function
  process.env.NOTION_CREDENTIALS_DB_ID = dbId;
  process.env.NOTION_API_KEY = apiKey;
  
  // Now sync credentials
  console.log('🔄 Syncing credentials to Notion...\n');
  
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
      notes: 'Private key at ~/.ssh/id_ed25519_bitbucket. Configured in ~/.ssh/config',
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
      notes: 'Private key at ~/.ssh/id_ed25519_github',
      rotationSchedule: 'On Demand' as const,
    },
    // Cloudflare
    {
      serviceName: 'Cloudflare Workers - Webhooks',
      keyType: 'Access Token' as const,
      serviceProvider: 'Cloudflare',
      environment: 'Production' as const,
      status: 'Active' as const,
      description: 'Cloudflare Workers service for webhooks (Slack, Discord, HubSpot, etc.)',
      usage: 'Deployed at Cloudflare Workers. Service: integratewise-webhooks',
      tags: ['Production', 'Critical'],
      owner: 'DevOps Team',
      notes: 'Configure secrets in Cloudflare Dashboard. Service handles webhook endpoints.',
      rotationSchedule: 'On Demand' as const,
      url: 'https://workers.cloudflare.com',
    },
    {
      serviceName: 'Cloudflare Workers - Core Engine',
      keyType: 'Access Token' as const,
      serviceProvider: 'Cloudflare',
      environment: 'Production' as const,
      status: 'Active' as const,
      description: 'AI routing and event processing service on Cloudflare Workers',
      usage: 'Service: integratewise-core-engine. Requires DATABASE_URL and AI API keys.',
      tags: ['Production', 'Critical'],
      owner: 'DevOps Team',
      notes: 'Configure secrets via wrangler secret put. Needs Neon DB and AI model keys.',
      rotationSchedule: 'On Demand' as const,
      url: 'https://workers.cloudflare.com',
    },
    {
      serviceName: 'Cloudflare API Token',
      keyType: 'API Key' as const,
      serviceProvider: 'Cloudflare',
      environment: 'Production' as const,
      status: 'Active' as const,
      description: 'Cloudflare API token for Workers, DNS, and services',
      usage: 'Used for wrangler CLI deployments and Cloudflare API operations',
      tags: ['Production', 'Admin'],
      owner: 'DevOps Team',
      notes: 'Get from Cloudflare Dashboard > My Profile > API Tokens. Needs Workers:Edit permissions.',
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
      description: 'Supabase project URL - NEXT_PUBLIC_SUPABASE_URL',
      usage: 'Database and authentication',
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
      description: 'Supabase anonymous/public key - NEXT_PUBLIC_SUPABASE_ANON_KEY',
      usage: 'Client-side database access',
      tags: ['Production', 'Critical'],
      owner: 'DevOps Team',
      notes: 'Set in environment variables. Supabase Dashboard > Settings > API',
      rotationSchedule: 'Quarterly' as const,
    },
    {
      serviceName: 'Supabase Service Role Key',
      keyType: 'Secret Key' as const,
      serviceProvider: 'Supabase',
      environment: 'Production' as const,
      status: 'Active' as const,
      description: 'Supabase service role key - SUPABASE_SERVICE_ROLE_KEY',
      usage: 'Server-side admin operations - ⚠️ FULL DATABASE ACCESS',
      tags: ['Production', 'Critical', 'Admin'],
      owner: 'DevOps Team',
      notes: '⚠️ KEEP SECRET - Never expose to client. Supabase Dashboard > Settings > API',
      rotationSchedule: 'Quarterly' as const,
    },
    // Webhooks
    {
      serviceName: 'HubSpot Webhook Secret',
      keyType: 'Secret Key' as const,
      serviceProvider: 'HubSpot',
      environment: 'Production' as const,
      status: 'Active' as const,
      description: 'HUBSPOT_WEBHOOK_SECRET - Webhook signing secret',
      usage: 'Verify HubSpot webhook signatures',
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
      description: 'SLACK_SIGNING_SECRET - Slack app signing secret',
      usage: 'Verify Slack request signatures',
      tags: ['Production'],
      owner: 'DevOps Team',
      notes: 'Slack App Settings > Basic Information > App Credentials',
      rotationSchedule: 'Quarterly' as const,
    },
    {
      serviceName: 'Slack Webhook URL',
      keyType: 'Access Token' as const,
      serviceProvider: 'Slack',
      environment: 'Production' as const,
      status: 'Active' as const,
      description: 'SLACK_WEBHOOK_URL - Incoming webhook URL',
      usage: 'Send messages to Slack channels',
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
      description: 'DISCORD_PUBLIC_KEY - Discord application public key',
      usage: 'Verify Discord interactions',
      tags: ['Production'],
      owner: 'DevOps Team',
      notes: 'Discord Developer Portal > Your App > General Information',
      rotationSchedule: 'Never' as const,
    },
    {
      serviceName: 'Discord Webhook URL',
      keyType: 'Access Token' as const,
      serviceProvider: 'Discord',
      environment: 'Production' as const,
      status: 'Active' as const,
      description: 'DISCORD_WEBHOOK_URL - Discord webhook URL',
      usage: 'Send messages to Discord channels',
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
      description: 'GITHUB_WEBHOOK_SECRET - Webhook secret',
      usage: 'Verify GitHub webhook signatures',
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
      description: 'ASANA_WEBHOOK_SECRET - Webhook signing secret',
      usage: 'Verify Asana webhook signatures',
      tags: ['Production'],
      owner: 'DevOps Team',
      rotationSchedule: 'Quarterly' as const,
    },
    // AI Keys
    {
      serviceName: 'Claude API Key',
      keyType: 'API Key' as const,
      serviceProvider: 'Anthropic',
      environment: 'Production' as const,
      status: 'Active' as const,
      description: 'CLAUDE_API_KEY - Anthropic Claude API key',
      usage: 'AI insights and chat features',
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
      description: 'OPENAI_API_KEY - OpenAI API key',
      usage: 'AI features (alternative to Claude)',
      tags: ['Production'],
      owner: 'AI Team',
      notes: 'OpenAI Platform: https://platform.openai.com/api-keys',
      rotationSchedule: 'Quarterly' as const,
    },
    {
      serviceName: 'DeepSeek API Key',
      keyType: 'API Key' as const,
      serviceProvider: 'Other',
      environment: 'Production' as const,
      status: 'Active' as const,
      description: 'DEEPSEEK_API_KEY - DeepSeek API key',
      usage: 'AI features (alternative model)',
      tags: ['Production'],
      owner: 'AI Team',
      rotationSchedule: 'Quarterly' as const,
    },
    // Other
    {
      serviceName: 'Cron Secret',
      keyType: 'Secret Key' as const,
      serviceProvider: 'Other',
      environment: 'Production' as const,
      status: 'Active' as const,
      description: 'CRON_SECRET - Authenticate cron job requests',
      usage: 'Verify cron job API requests',
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
      description: 'CAPTURE_API_SECRET - Secure /api/capture endpoint',
      usage: 'Protect capture endpoint',
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
      description: 'WEBHOOK_API_SECRET - Secure /api/webhook endpoint',
      usage: 'Protect webhook endpoint',
      tags: ['Production'],
      owner: 'DevOps Team',
      rotationSchedule: 'Quarterly' as const,
    },
  ];
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const cred of credentials) {
    try {
      await addCredential(cred);
      successCount++;
      console.log(`✅ Added: ${cred.serviceName}`);
    } catch (error: any) {
      errorCount++;
      console.log(`❌ Failed: ${cred.serviceName} - ${error.message}`);
    }
  }
  
  console.log(`\n✅ Sync Complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Total: ${credentials.length}\n`);
  
  if (successCount > 0) {
    console.log(`📊 Database URL: https://www.notion.so/${dbId.replace(/-/g, '')}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Open your Notion credentials database');
    console.log('   2. Add actual API key values to each entry');
    console.log('   3. Update Cloudflare secrets in Cloudflare Dashboard\n');
  }
  
  rl.close();
}

setupAndSync().catch(error => {
  console.error('❌ Error:', error);
  rl.close();
  process.exit(1);
});
