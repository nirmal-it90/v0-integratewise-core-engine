/**
 * Sync Credentials to Notion
 * 
 * Reads credentials from Cloudflare Workers configs, environment files,
 * and notes, then adds them to Notion credentials database
 */

import { addCredential } from './notion-credentials-manager';
import * as fs from 'fs';
import * as path from 'path';

const CREDENTIALS_DB_ID = process.env.NOTION_CREDENTIALS_DB_ID || '';

if (!CREDENTIALS_DB_ID) {
  console.error('❌ NOTION_CREDENTIALS_DB_ID environment variable is required');
  console.log('\n💡 Set it with: export NOTION_CREDENTIALS_DB_ID="your_database_id"');
  process.exit(1);
}

/**
 * Extract secrets from wrangler.toml
 */
function extractFromWrangler(filePath: string): Array<{name: string, value: string, description: string}> {
  const credentials: Array<{name: string, value: string, description: string}> = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Look for [vars] or [secrets] sections
    let inVarsSection = false;
    let inSecretsSection = false;
    
    for (const line of lines) {
      if (line.trim().startsWith('[vars]')) {
        inVarsSection = true;
        inSecretsSection = false;
        continue;
      }
      if (line.trim().startsWith('[secrets]')) {
        inSecretsSection = true;
        inVarsSection = false;
        continue;
      }
      if (line.trim().startsWith('[')) {
        inVarsSection = false;
        inSecretsSection = false;
        continue;
      }
      
      // Extract key-value pairs
      const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*["']?([^"'\n]+)["']?/);
      if (match && (inVarsSection || inSecretsSection)) {
        const [, key, value] = match;
        credentials.push({
          name: key,
          value: value.trim(),
          description: `From ${path.basename(filePath)} ${inSecretsSection ? '(Secret)' : '(Variable)'}`,
        });
      }
    }
  } catch (error) {
    console.log(`⚠️  Could not read ${filePath}: ${error}`);
  }
  
  return credentials;
}

/**
 * Extract from .env files
 */
function extractFromEnv(filePath: string): Array<{name: string, value: string, description: string}> {
  const credentials: Array<{name: string, value: string, description: string}> = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    for (const line of lines) {
      // Skip comments and empty lines
      if (line.trim().startsWith('#') || !line.trim()) continue;
      
      const match = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        credentials.push({
          name: key,
          value: value.trim().replace(/^["']|["']$/g, ''),
          description: `From ${path.basename(filePath)}`,
        });
      }
    }
  } catch (error) {
    console.log(`⚠️  Could not read ${filePath}: ${error}`);
  }
  
  return credentials;
}

/**
 * Map credential name to service provider
 */
function mapServiceProvider(name: string): string {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('github')) return 'GitHub';
  if (nameLower.includes('bitbucket')) return 'Bitbucket';
  if (nameLower.includes('aws')) return 'AWS';
  if (nameLower.includes('azure')) return 'Azure';
  if (nameLower.includes('gcp') || nameLower.includes('google')) return 'GCP';
  if (nameLower.includes('stripe')) return 'Stripe';
  if (nameLower.includes('supabase')) return 'Supabase';
  if (nameLower.includes('neon')) return 'Neon';
  if (nameLower.includes('vercel')) return 'Vercel';
  if (nameLower.includes('cloudflare')) return 'Cloudflare';
  if (nameLower.includes('notion')) return 'Notion';
  if (nameLower.includes('slack')) return 'Slack';
  if (nameLower.includes('discord')) return 'Discord';
  if (nameLower.includes('hubspot')) return 'HubSpot';
  if (nameLower.includes('openai')) return 'OpenAI';
  if (nameLower.includes('anthropic') || nameLower.includes('claude')) return 'Anthropic';
  
  return 'Other';
}

/**
 * Determine key type from name
 */
function determineKeyType(name: string, value: string): 'API Key' | 'SSH Key' | 'OAuth Token' | 'Access Token' | 'Secret Key' | 'Password' | 'Database Connection' | 'Other' {
  const nameLower = name.toLowerCase();
  const valueLower = value.toLowerCase();
  
  if (nameLower.includes('ssh') || valueLower.includes('ssh-') || valueLower.includes('BEGIN OPENSSH')) {
    return 'SSH Key';
  }
  if (nameLower.includes('token') || nameLower.includes('access_token')) {
    return 'Access Token';
  }
  if (nameLower.includes('secret')) {
    return 'Secret Key';
  }
  if (nameLower.includes('password') || nameLower.includes('passwd')) {
    return 'Password';
  }
  if (nameLower.includes('database') || nameLower.includes('db_') || nameLower.includes('connection')) {
    return 'Database Connection';
  }
  if (nameLower.includes('oauth') || nameLower.includes('refresh_token')) {
    return 'OAuth Token';
  }
  if (nameLower.includes('api_key') || nameLower.includes('apikey') || nameLower.endsWith('_key')) {
    return 'API Key';
  }
  
  return 'Other';
}

/**
 * Main sync function
 */
async function syncCredentialsToNotion() {
  console.log('🔄 Syncing credentials to Notion...\n');
  
  const projectRoot = path.resolve(__dirname, '..');
  const credentials: Array<{name: string, value: string, description: string, source: string}> = [];
  
  // 1. Check Cloudflare Workers configs
  console.log('📁 Checking Cloudflare Workers configs...');
  const wranglerFiles = [
    path.join(projectRoot, 'apps/integratewise-webhooks/wrangler.toml'),
    path.join(projectRoot, 'apps/integratewise-core-engine/wrangler.toml'),
  ];
  
  for (const wranglerFile of wranglerFiles) {
    if (fs.existsSync(wranglerFile)) {
      const extracted = extractFromWrangler(wranglerFile);
      extracted.forEach(cred => {
        credentials.push({
          ...cred,
          source: `Cloudflare: ${path.basename(path.dirname(wranglerFile))}`,
        });
      });
      console.log(`   ✅ Found ${extracted.length} credentials in ${path.basename(wranglerFile)}`);
    }
  }
  
  // 2. Check .env files
  console.log('\n📁 Checking environment files...');
  const envFiles = [
    path.join(projectRoot, '.env'),
    path.join(projectRoot, '.env.local'),
    path.join(projectRoot, '.env.production'),
    path.join(projectRoot, 'apps/integratewise-webhooks/.dev.vars'),
    path.join(projectRoot, 'apps/integratewise-core-engine/.dev.vars'),
  ];
  
  for (const envFile of envFiles) {
    if (fs.existsSync(envFile)) {
      const extracted = extractFromEnv(envFile);
      extracted.forEach(cred => {
        credentials.push({
          ...cred,
          source: `Environment: ${path.basename(envFile)}`,
        });
      });
      console.log(`   ✅ Found ${extracted.length} credentials in ${path.basename(envFile)}`);
    }
  }
  
  // 3. Add SSH keys we found earlier
  console.log('\n🔑 Adding SSH keys...');
  const sshKeys = [
    {
      name: 'Bitbucket SSH Key',
      publicKey: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIh22XRuBQAJCUbwDRNzav+6KJwMD18o2tJJm/WjWnJ5 integratewise-bitbucket',
      privateKeyPath: '~/.ssh/id_ed25519_bitbucket',
      serviceProvider: 'Bitbucket',
    },
    {
      name: 'GitHub SSH Key',
      publicKey: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMhPHLx7jtmadGvV9gE4wtUGstXMd5Jxg+7Xeq2EAm6h "nirmpapri@gmail.com"',
      privateKeyPath: '~/.ssh/id_ed25519_github',
      serviceProvider: 'GitHub',
    },
  ];
  
  for (const sshKey of sshKeys) {
    credentials.push({
      name: sshKey.name,
      value: sshKey.publicKey,
      description: `SSH Public Key (Private key at ${sshKey.privateKeyPath})`,
      source: 'Local SSH Keys',
    });
  }
  console.log(`   ✅ Added ${sshKeys.length} SSH keys`);
  
  // 4. Sync to Notion
  console.log(`\n📝 Syncing ${credentials.length} credentials to Notion...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const cred of credentials) {
    try {
      const serviceProvider = mapServiceProvider(cred.name);
      const keyType = determineKeyType(cred.name, cred.value);
      
      // Determine which field to use
      const props: any = {
        serviceName: cred.name,
        keyType: keyType,
        serviceProvider: serviceProvider,
        environment: 'Production' as const,
        status: 'Active' as const,
        description: `${cred.description}. Source: ${cred.source}`,
        usage: `Used in ${cred.source}`,
        tags: ['Production'],
        notes: `Imported from ${cred.source}`,
      };
      
      // Add to appropriate field based on key type
      if (keyType === 'SSH Key') {
        props.sshPublicKey = cred.value;
        props.notes = `Private key location: ${cred.value.includes('~/.ssh') ? cred.value : 'Check local SSH keys'}`
      } else if (keyType === 'API Key') {
        props.apiKey = cred.value;
      } else if (keyType === 'Secret Key' || keyType === 'Access Token' || keyType === 'OAuth Token') {
        props.secretToken = cred.value;
      } else if (keyType === 'Database Connection') {
        props.secretToken = cred.value; // Store connection string in secret field
      } else {
        props.secretToken = cred.value; // Default to secret token field
      }
      
      await addCredential(props);
      successCount++;
      console.log(`   ✅ Added: ${cred.name} (${serviceProvider})`);
    } catch (error: any) {
      errorCount++;
      console.log(`   ❌ Failed to add ${cred.name}: ${error.message}`);
    }
  }
  
  console.log(`\n✅ Sync complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Total: ${credentials.length}\n`);
}

// Run sync
syncCredentialsToNotion().catch(console.error);
