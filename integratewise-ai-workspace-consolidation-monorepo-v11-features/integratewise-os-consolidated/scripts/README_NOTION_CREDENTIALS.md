# Notion Credentials Database Setup

This guide explains how to set up and manage a Notion database for storing API keys, SSH keys, and other credentials.

## 🔐 Overview

The Notion Credentials Database provides a centralized, organized way to store and manage:
- API Keys
- SSH Keys (private and public)
- OAuth Tokens
- Access Tokens
- Secret Keys
- Passwords
- Database Connection Strings
- And other sensitive credentials

## 🚀 Setup Instructions

### Step 1: Get Notion API Key

1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name it "Credentials Manager" or similar
4. Select the workspace
5. Copy the "Internal Integration Token"

### Step 2: Create a Parent Page

1. In Notion, create a new page (or use an existing one)
2. Copy the page ID from the URL
   - Example: `https://www.notion.so/Your-Workspace/Your-Page-abc123def456...`
   - The ID is the part after the last dash: `abc123def456...`

### Step 3: Set Environment Variables

```bash
export NOTION_API_KEY="secret_your_api_key_here"
export NOTION_PARENT_PAGE_ID="abc123def456..."
```

Or create a `.env` file:
```env
NOTION_API_KEY=secret_your_api_key_here
NOTION_PARENT_PAGE_ID=abc123def456...
```

### Step 4: Run Setup Script

```bash
npx tsx scripts/setup-notion-credentials-db.ts
```

The script will:
- ✅ Create the credentials database with all required fields
- ✅ Set up the schema (properties, types, options)
- ✅ Create a sample entry to show the structure
- ✅ Provide the database URL

## 📊 Database Schema

The database includes the following properties:

### Core Fields
- **Service Name** (Title) - Name of the service/app
- **Key Type** (Select) - API Key, SSH Key, OAuth Token, etc.
- **Service Provider** (Select) - GitHub, AWS, Stripe, etc.

### Credential Fields
- **API Key** (Text) - For API keys
- **SSH Key** (Text) - For SSH private keys
- **SSH Public Key** (Text) - For SSH public keys
- **Secret/Token** (Text) - For OAuth tokens, secrets

### Metadata Fields
- **Environment** (Select) - Development, Staging, Production, etc.
- **Status** (Select) - Active, Inactive, Revoked, Expired
- **Description** (Text) - What the credential is for
- **Usage/Purpose** (Text) - How it's used
- **Tags** (Multi-select) - Critical, Production, Read-Only, etc.
- **Owner/Team** (Text) - Who owns/manages this credential

### Management Fields
- **Created Date** (Date) - When credential was created
- **Expiry Date** (Date) - When credential expires (optional)
- **Last Used** (Date) - Last time credential was used
- **Rotation Schedule** (Select) - Monthly, Quarterly, Annually, etc.
- **URL/Endpoint** (URL) - Related service URL
- **Notes** (Text) - Additional notes

## 📝 Usage Examples

### Using the Manager Script

```typescript
import { addCredential, getActiveCredentials } from './scripts/notion-credentials-manager';

// Add a new credential
await addCredential({
  serviceName: 'GitHub API',
  keyType: 'API Key',
  apiKey: 'ghp_xxxxxxxxxxxx',
  serviceProvider: 'GitHub',
  environment: 'Production',
  status: 'Active',
  description: 'Personal access token for CI/CD',
  usage: 'Used in GitHub Actions workflows',
  tags: ['Production', 'Team'],
  owner: 'DevOps Team',
  rotationSchedule: 'Quarterly',
});

// Get all active credentials
const active = await getActiveCredentials();
console.log(active);
```

### Command Line Usage

```bash
# Set environment variables
export NOTION_CREDENTIALS_DB_ID="your_database_id"

# Use in your scripts
npx tsx -e "
import { getAllCredentials } from './scripts/notion-credentials-manager';
const creds = await getAllCredentials();
console.log(creds);
"
```

## 🔒 Security Best Practices

1. **Access Control**
   - Only share the database with authorized team members
   - Use Notion's page-level permissions
   - Consider creating separate databases per environment

2. **Key Management**
   - Mark revoked keys with "Revoked" status immediately
   - Set expiry dates and review regularly
   - Follow rotation schedules

3. **Data Protection**
   - Consider encrypting highly sensitive values before storing
   - Don't commit credentials database ID to public repos
   - Use environment variables for API keys

4. **Monitoring**
   - Regularly review "Last Used" dates
   - Check for expired credentials
   - Audit inactive credentials

## 🔄 Integration with Your App

### Example: Retrieve Credentials for Use

```typescript
import { getCredentialsByProvider, getCredentialsByEnvironment } from './scripts/notion-credentials-manager';

// Get GitHub credentials for production
const githubCreds = await getCredentialsByProvider('GitHub');
const prodCreds = githubCreds.filter(c => 
  c.environment === 'Production' && c.status === 'Active'
);

// Use the credential
const apiKey = prodCreds[0]?.apiKey;
```

### Example: Update Status After Use

```typescript
import { updateCredentialStatus } from './scripts/notion-credentials-manager';

// Mark credential as used
await updateCredentialStatus(pageId, 'Active');
```

## 📋 Database Views

Create filtered views in Notion for:
- **Active Credentials** - Filter by Status = Active
- **Production Keys** - Filter by Environment = Production
- **Expiring Soon** - Filter by Expiry Date in next 30 days
- **By Service** - Group by Service Provider
- **Revoked Keys** - Filter by Status = Revoked

## 🛠️ Maintenance

### Regular Tasks
- ✅ Review expired credentials monthly
- ✅ Update rotation schedules as needed
- ✅ Mark unused credentials as Inactive
- ✅ Remove revoked credentials or keep for audit

### Scripts Available
- `setup-notion-credentials-db.ts` - Initial database setup
- `notion-credentials-manager.ts` - CRUD operations helper

## 🐛 Troubleshooting

### "Unauthorized" Error
- Check that your NOTION_API_KEY is correct
- Verify the integration has access to the page

### "Object Not Found" Error
- Verify NOTION_PARENT_PAGE_ID is correct
- Ensure the page exists and is accessible

### "Database Not Found" Error
- Verify NOTION_CREDENTIALS_DB_ID is set
- Check that the database exists in Notion

## 📚 Additional Resources

- [Notion API Documentation](https://developers.notion.com/)
- [Notion API Reference](https://developers.notion.com/reference)
- [Notion Integrations Guide](https://developers.notion.com/docs/getting-started)

---

**Note:** This database stores sensitive information. Always follow security best practices and limit access appropriately.
