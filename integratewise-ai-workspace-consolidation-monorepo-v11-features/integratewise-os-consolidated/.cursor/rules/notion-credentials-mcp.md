# Notion Credentials Management via MCP

## Overview

This project uses Notion to store and manage credentials (API keys, SSH keys, tokens, etc.) via MCP (Model Context Protocol) tools.

## Available MCP Notion Tools

When working with credentials, use these MCP tools:

- `mcp_Notion_notion-create-database` - Create credentials database
- `mcp_Notion_notion-create-pages` - Add credential entries
- `mcp_Notion_notion-search` - Search for credentials
- `mcp_Notion_notion-fetch` - Get credential details
- `mcp_Notion_notion-update-page` - Update credential entries

## Credential Database Schema

### Required Properties:
- **Service Name** (Title) - Name of service/app
- **Key Type** (Select) - API Key, SSH Key, OAuth Token, etc.
- **Service Provider** (Select) - GitHub, Bitbucket, Cloudflare, Supabase, etc.
- **Environment** (Select) - Development, Staging, Production, Local, All
- **Status** (Select) - Active, Inactive, Revoked, Expired

### Credential Storage:
- **API Key** (Rich Text) - For API keys
- **SSH Key** (Rich Text) - For SSH private keys (keep secure)
- **SSH Public Key** (Rich Text) - For SSH public keys
- **Secret/Token** (Rich Text) - For OAuth tokens, secrets

### Metadata:
- **Description** (Rich Text) - What the credential is for
- **Usage/Purpose** (Rich Text) - How it's used
- **Tags** (Multi-select) - Critical, Production, Team, etc.
- **Owner/Team** (Rich Text) - Who manages it
- **Notes** (Rich Text) - Additional information
- **Rotation Schedule** (Select) - Monthly, Quarterly, Annually, On Demand
- **URL/Endpoint** (URL) - Related service URL
- **Created Date** (Date)
- **Expiry Date** (Date)
- **Last Used** (Date)

## Common Operations

### Add Credential
Use `mcp_Notion_notion-create-pages` with parent database_id and credential properties.

### Search Credentials
Use `mcp_Notion_notion-search` with query like "GitHub API Key" or "Production credentials".

### Update Credential
Use `mcp_Notion_notion-update-page` with page_id and updated properties.

## Security Notes

- Never expose private SSH keys or secret keys in code
- Use Notion's access controls to limit database visibility
- Mark revoked credentials immediately
- Follow rotation schedules
- Store sensitive values securely in Notion (consider encryption for highly sensitive data)
