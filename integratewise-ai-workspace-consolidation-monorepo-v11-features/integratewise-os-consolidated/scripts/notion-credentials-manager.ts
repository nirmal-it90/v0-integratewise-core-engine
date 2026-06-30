/**
 * Notion Credentials Manager
 * 
 * Helper utilities for managing credentials in Notion database
 */

import { Client } from '@notionhq/client';

// Lazy initialization to allow setting env vars before import
function getNotionClient() {
  const NOTION_TOKEN = process.env.NOTION_API_KEY || '';
  if (!NOTION_TOKEN) {
    throw new Error('NOTION_API_KEY environment variable is required');
  }
  return new Client({ auth: NOTION_TOKEN });
}

function getCredentialsDbId() {
  const CREDENTIALS_DB_ID = process.env.NOTION_CREDENTIALS_DB_ID || '';
  if (!CREDENTIALS_DB_ID) {
    throw new Error('NOTION_CREDENTIALS_DB_ID environment variable is required');
  }
  return CREDENTIALS_DB_ID;
}

export interface Credential {
  serviceName: string;
  keyType: 'API Key' | 'SSH Key' | 'OAuth Token' | 'Access Token' | 'Secret Key' | 'Password' | 'Database Connection' | 'Other';
  apiKey?: string;
  sshKey?: string;
  sshPublicKey?: string;
  secretToken?: string;
  serviceProvider: string;
  environment: 'Development' | 'Staging' | 'Production' | 'Local' | 'All';
  status: 'Active' | 'Inactive' | 'Revoked' | 'Expired';
  description?: string;
  usage?: string;
  tags?: string[];
  owner?: string;
  notes?: string;
  rotationSchedule?: string;
  url?: string;
  expiryDate?: string;
}

/**
 * Add a new credential to the database
 */
export async function addCredential(credential: Credential) {
  const notion = getNotionClient();
  const CREDENTIALS_DB_ID = getCredentialsDbId();

  const properties: any = {
    'Service Name': {
      title: [
        {
          text: {
            content: credential.serviceName,
          },
        },
      ],
    },
    'Key Type': {
      select: {
        name: credential.keyType,
      },
    },
    'Service Provider': {
      select: {
        name: credential.serviceProvider,
      },
    },
    'Environment': {
      select: {
        name: credential.environment,
      },
    },
    'Status': {
      select: {
        name: credential.status,
      },
    },
    'Created Date': {
      date: {
        start: new Date().toISOString().split('T')[0],
      },
    },
  };

  // Add optional fields
  if (credential.apiKey) {
    properties['API Key'] = {
      rich_text: [{ text: { content: credential.apiKey } }],
    };
  }

  if (credential.sshKey) {
    properties['SSH Key'] = {
      rich_text: [{ text: { content: credential.sshKey } }],
    };
  }

  if (credential.sshPublicKey) {
    properties['SSH Public Key'] = {
      rich_text: [{ text: { content: credential.sshPublicKey } }],
    };
  }

  if (credential.secretToken) {
    properties['Secret/Token'] = {
      rich_text: [{ text: { content: credential.secretToken } }],
    };
  }

  if (credential.description) {
    properties['Description'] = {
      rich_text: [{ text: { content: credential.description } }],
    };
  }

  if (credential.usage) {
    properties['Usage/Purpose'] = {
      rich_text: [{ text: { content: credential.usage } }],
    };
  }

  if (credential.tags && credential.tags.length > 0) {
    properties['Tags'] = {
      multi_select: credential.tags.map(tag => ({ name: tag })),
    };
  }

  if (credential.owner) {
    properties['Owner/Team'] = {
      rich_text: [{ text: { content: credential.owner } }],
    };
  }

  if (credential.notes) {
    properties['Notes'] = {
      rich_text: [{ text: { content: credential.notes } }],
    };
  }

  if (credential.rotationSchedule) {
    properties['Rotation Schedule'] = {
      select: {
        name: credential.rotationSchedule,
      },
    };
  }

  if (credential.url) {
    properties['URL/Endpoint'] = {
      url: credential.url,
    };
  }

  if (credential.expiryDate) {
    properties['Expiry Date'] = {
      date: {
        start: credential.expiryDate,
      },
    };
  }

  return await notion.pages.create({
    parent: {
      database_id: CREDENTIALS_DB_ID,
    },
    properties,
  });
}

/**
 * Get all credentials
 */
export async function getAllCredentials() {
  const notion = getNotionClient();
  const CREDENTIALS_DB_ID = getCredentialsDbId();

  const response = await notion.databases.query({
    database_id: CREDENTIALS_DB_ID,
  });

  return response.results.map(page => {
    const props = (page as any).properties;
    return {
      id: page.id,
      serviceName: extractTitle(props['Service Name']),
      keyType: props['Key Type']?.select?.name,
      apiKey: extractRichText(props['API Key']),
      sshKey: extractRichText(props['SSH Key']),
      serviceProvider: props['Service Provider']?.select?.name,
      environment: props['Environment']?.select?.name,
      status: props['Status']?.select?.name,
      description: extractRichText(props['Description']),
      tags: props['Tags']?.multi_select?.map((t: any) => t.name) || [],
    };
  });
}

/**
 * Get credentials by service provider
 */
export async function getCredentialsByProvider(provider: string) {
  const all = await getAllCredentials();
  return all.filter(c => c.serviceProvider === provider);
}

/**
 * Get credentials by environment
 */
export async function getCredentialsByEnvironment(environment: string) {
  const all = await getAllCredentials();
  return all.filter(c => c.environment === environment);
}

/**
 * Get active credentials only
 */
export async function getActiveCredentials() {
  const all = await getAllCredentials();
  return all.filter(c => c.status === 'Active');
}

/**
 * Update credential status
 */
export async function updateCredentialStatus(pageId: string, status: 'Active' | 'Inactive' | 'Revoked' | 'Expired') {
  const notion = getNotionClient();
  return await notion.pages.update({
    page_id: pageId,
    properties: {
      'Status': {
        select: {
          name: status,
        },
      },
      'Last Used': {
        date: {
          start: new Date().toISOString().split('T')[0],
        },
      },
    },
  });
}

// Helper functions
function extractTitle(prop: any): string {
  if (!prop?.title) return '';
  return prop.title.map((t: any) => t.plain_text).join('');
}

function extractRichText(prop: any): string {
  if (!prop?.rich_text) return '';
  return prop.rich_text.map((rt: any) => rt.plain_text).join('');
}
