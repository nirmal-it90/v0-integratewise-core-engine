/**
 * Setup Notion Credentials Database
 * 
 * Creates a Notion database for storing API keys, SSH keys, and credentials
 * Run with: npx tsx scripts/setup-notion-credentials-db.ts
 */

import { Client } from '@notionhq/client';

// Configuration
const NOTION_TOKEN = process.env.NOTION_API_KEY || '';
const PARENT_PAGE_ID = process.env.NOTION_PARENT_PAGE_ID || '';

if (!NOTION_TOKEN) {
  console.error('❌ NOTION_API_KEY environment variable is required');
  console.log('\n💡 Get your Notion API key from: https://www.notion.so/my-integrations');
  process.exit(1);
}

if (!PARENT_PAGE_ID) {
  console.error('❌ NOTION_PARENT_PAGE_ID environment variable is required');
  console.log('\n💡 Create a page in Notion and copy its ID from the URL');
  console.log('   Example: https://www.notion.so/Your-Workspace/Your-Page-abc123def456...');
  console.log('   Page ID is the part after the last dash');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

/**
 * Create Credentials Database in Notion
 */
async function createCredentialsDatabase() {
  console.log('🚀 Creating Notion Credentials Database...\n');

  try {
    // Create database with schema
    const database = await notion.databases.create({
      parent: {
        type: 'page_id',
        page_id: PARENT_PAGE_ID,
      },
      title: [
        {
          type: 'text',
          text: {
            content: '🔐 Credentials & Keys',
          },
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
        // Service/Name - Title property
        'Service Name': {
          title: {},
        },

        // Key Type - Select property
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

        // API Key - Text property (for API keys)
        'API Key': {
          rich_text: {},
        },

        // SSH Key - Text property (for SSH keys)
        'SSH Key': {
          rich_text: {},
        },

        // SSH Public Key - Text property
        'SSH Public Key': {
          rich_text: {},
        },

        // Secret/Token - Text property (for OAuth tokens, secrets)
        'Secret/Token': {
          rich_text: {},
        },

        // Service Provider - Select property
        'Service Provider': {
          select: {
            options: [
              { name: 'GitHub', color: 'default' },
              { name: 'Bitbucket', color: 'blue' },
              { name: 'AWS', color: 'orange' },
              { name: 'Azure', color: 'blue' },
              { name: 'GCP', color: 'green' },
              { name: 'Stripe', color: 'purple' },
              { name: 'Supabase', color: 'green' },
              { name: 'Neon', color: 'blue' },
              { name: 'Vercel', color: 'default' },
              { name: 'Cloudflare', color: 'orange' },
              { name: 'Notion', color: 'default' },
              { name: 'Slack', color: 'purple' },
              { name: 'Discord', color: 'gray' },
              { name: 'HubSpot', color: 'orange' },
              { name: 'OpenAI', color: 'green' },
              { name: 'Anthropic', color: 'purple' },
              { name: 'Other', color: 'gray' },
            ],
          },
        },

        // Environment - Select property
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

        // Status - Select property
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

        // Description - Rich text property
        'Description': {
          rich_text: {},
        },

        // Usage/Purpose - Text property
        'Usage/Purpose': {
          rich_text: {},
        },

        // Created Date - Date property
        'Created Date': {
          date: {},
        },

        // Expiry Date - Date property (optional)
        'Expiry Date': {
          date: {},
        },

        // Last Updated - Last edited time (automatically tracked)
        'Last Used': {
          date: {},
        },

        // Tags - Multi-select property
        'Tags': {
          multi_select: {
            options: [
              { name: 'Critical', color: 'red' },
              { name: 'Production', color: 'orange' },
              { name: 'Read-Only', color: 'blue' },
              { name: 'Write Access', color: 'purple' },
              { name: 'Admin', color: 'red' },
              { name: 'Personal', color: 'gray' },
              { name: 'Team', color: 'blue' },
              { name: 'External', color: 'yellow' },
            ],
          },
        },

        // Owner - Text property
        'Owner/Team': {
          rich_text: {},
        },

        // Notes - Rich text property
        'Notes': {
          rich_text: {},
        },

        // Rotation Schedule - Text property
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

        // URL/Endpoint - URL property
        'URL/Endpoint': {
          url: {},
        },
      },
    });

    console.log('✅ Credentials Database created successfully!\n');
    console.log('📊 Database Details:');
    console.log(`   ID: ${database.id}`);
    console.log(`   URL: https://www.notion.so/${database.id.replace(/-/g, '')}\n`);

    // Create a sample entry
    console.log('📝 Creating sample entry...');
    
    await notion.pages.create({
      parent: {
        database_id: database.id,
      },
      properties: {
        'Service Name': {
          title: [
            {
              text: {
                content: 'Example: GitHub API Token',
              },
            },
          ],
        },
        'Key Type': {
          select: {
            name: 'API Key',
          },
        },
        'API Key': {
          rich_text: [
            {
              text: {
                content: 'ghp_example_token_here (replace with actual key)',
              },
            },
          ],
        },
        'Service Provider': {
          select: {
            name: 'GitHub',
          },
        },
        'Environment': {
          select: {
            name: 'Development',
          },
        },
        'Status': {
          select: {
            name: 'Active',
          },
        },
        'Description': {
          rich_text: [
            {
              text: {
                content: 'GitHub Personal Access Token for repository access',
              },
            },
          ],
        },
        'Usage/Purpose': {
          rich_text: [
            {
              text: {
                content: 'Used for CI/CD pipelines and automated deployments',
              },
            },
          ],
        },
        'Created Date': {
          date: {
            start: new Date().toISOString().split('T')[0],
          },
        },
        'Tags': {
          multi_select: [
            {
              name: 'Team',
            },
            {
              name: 'Read-Only',
            },
          ],
        },
        'Owner/Team': {
          rich_text: [
            {
              text: {
                content: 'Development Team',
              },
            },
          ],
        },
        'Rotation Schedule': {
          select: {
            name: 'Quarterly',
          },
        },
      },
    });

    console.log('✅ Sample entry created!\n');

    console.log('🎉 Setup Complete!\n');
    console.log('📋 Next Steps:');
    console.log('   1. Open the database in Notion');
    console.log('   2. Replace the sample entry with your actual credentials');
    console.log('   3. Add additional entries as needed');
    console.log('   4. Share with appropriate team members\n');
    console.log('🔒 Security Tips:');
    console.log('   - Only share the database with authorized team members');
    console.log('   - Use Notion\'s page-level permissions');
    console.log('   - Consider encrypting sensitive values');
    console.log('   - Regularly rotate keys and update the database');
    console.log('   - Mark revoked keys with "Revoked" status\n');

  } catch (error: any) {
    console.error('❌ Error creating database:', error.message);
    
    if (error.code === 'unauthorized') {
      console.log('\n💡 Make sure your Notion API key is valid and has access to the page');
    } else if (error.code === 'object_not_found') {
      console.log('\n💡 Make sure the NOTION_PARENT_PAGE_ID is correct and the page exists');
    }
    
    process.exit(1);
  }
}

// Run the setup
createCredentialsDatabase();
