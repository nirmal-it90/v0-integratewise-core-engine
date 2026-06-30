#!/usr/bin/env node

const https = require('https');

// Notion page ID from URL: https://www.notion.so/SSOT-2dc94775d1b680a2b793dc16564d292a
const PAGE_ID_RAW = '2dc94775d1b680a2b793dc16564d292a';
// Convert to UUID format for API (8-4-4-4-12)
const formatPageId = (id) => {
  if (id.includes('-')) return id; // Already formatted
  return `${id.slice(0,8)}-${id.slice(8,12)}-${id.slice(12,16)}-${id.slice(16,20)}-${id.slice(20,32)}`;
};
const PAGE_ID_FORMATTED = formatPageId(PAGE_ID_RAW);

const NOTION_API_KEY = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN;

if (!NOTION_API_KEY) {
  console.error('Error: NOTION_API_KEY or NOTION_TOKEN environment variable is required');
  console.error('Please set it with: export NOTION_API_KEY="your_token_here"');
  process.exit(1);
}

const NOTION_API_VERSION = '2022-06-28';

// New content structure
const NEW_CONTENT = {
  title: 'Positioning (v11.0 — SSOT Aligned)',
  sections: [
    {
      heading: 'What IntegrateWise Is',
      content: `IntegrateWise is an AI workspace that connects the tools you already use and turns everyday work into governed organizational memory.

Instead of switching between Slack, docs, CRMs, and project tools, IntegrateWise brings your work into one place, keeps it structured, and helps you turn conversations and ideas into clear outcomes—while you remain in control.

IntegrateWise is built as one operating system with a single governed Spine behind everything, and multiple role-based Views to match how you work.`
    },
    {
      heading: 'Who It\'s For',
      content: `IntegrateWise is for people and teams anywhere in the world—whether you work on your own, collaborate in a small team, or run a company—who want work to feel simpler, clearer, and more effective.

It\'s designed for anyone who wants:
- Less tool switching
- More clarity and continuity
- Faster execution with fewer mistakes
- Work that stays organized and reusable over time`
    },
    {
      heading: 'Primary Pitch',
      content: `IntegrateWise is an AI workspace that brings all your work into one place—without replacing your tools.

It connects to what you already use, captures work as it happens, stores it as governed organizational memory in your Spine, and helps you think, execute, and collaborate through role-based Views—powered by an always-ready Cognitive Twin and protected by governance.`
    },
    {
      heading: 'Tagline Option',
      content: `Normalize once. Use it everywhere.`
    },
    {
      heading: 'IntegrateWise AI Workspace — Simple Overview',
      content: `IntegrateWise is an AI workspace for anyone who wants a better way to work—on your own, with a team, or across a company.

It does not replace your tools. You continue using Slack, your CRM, docs, project tools, support systems, and analytics platforms.

IntegrateWise connects them, brings important work signals into one system, and helps you:
- See what\'s happening across your work with full context
- Turn conversations and ideas into decisions, tasks, and plans
- Create useful outputs like emails, decks, reports, SOPs, proposals, and strategies
- Keep everything connected to where it came from, so nothing loses meaning`
    },
    {
      heading: 'The Big Idea',
      content: `One OS at the center of your work

You keep your current tools.

IntegrateWise connects to them and captures your real work—then turns it into structured, reusable intelligence.

Under the hood, IntegrateWise runs on a simple law:

One OS. One Spine. Multiple Views.

This means your organization doesn't fragment into different products, different dashboards, or disconnected knowledge.

You get one governed foundation, and different Views depending on what you need to do.`
    },
    {
      heading: 'What Makes IntegrateWise Different',
      content: `One platform, multiple Views

Sales, Marketing, Customer Success, Product, Operations, and Owner workflows are not separate tools.

They are different Views of the same Spine—designed for different roles, permissions, and outcomes.

Outputs are built into the workflow

You don't start from scratch.

IntegrateWise helps you produce high-quality outputs directly from real work and real context—like updates, emails, decks, reports, customer plans, playbooks, and internal documentation.

Works at any size

Whether you are a solo operator, a small team, or a large company, the same operating model works:
- one system of record
- one governed memory layer
- role-based execution surfaces
- clear control across teams

Your tools stay as they are

IntegrateWise is not asking you to stop using Slack, your CRM, or your doc system.

It connects to them, normalizes the work, and makes it usable everywhere with a consistent structure and governance.`
    },
    {
      heading: 'Canonical Operating Sequence (v11.0 AI OS)',
      content: `This is the canonical operating sequence of IntegrateWise:

1) Load

IntegrateWise captures work from your tools and files—like Slack conversations, CRM records, documents, and meeting notes.

This ensures real work becomes structured and usable without friction.

2) Store

Everything is stored in your Spine, the governed system of record.

The Spine preserves:
- structure
- relationships
- provenance (where it came from)
- audit trails

3) Think

You think and plan inside your IQ Hub, which acts as working memory connected to Spine entities.

This is where conversations, notes, and AI reasoning become durable, searchable, and anchored to real work.

4) Act

Your Cognitive Twin prepares context, drafts actions, and proposes next steps based on Spine + IQ Hub intelligence.

Execution becomes faster, cleaner, and easier to standardize.

5) Govern

Governance is enforced through Governor Slack and AI-Relay, ensuring actions and communication are safe, auditable, and policy-checked.

This is how IntegrateWise enables AI at scale without losing control.`
    },
    {
      heading: 'What We Promise (v11.0)',
      content: `Your tools, connected

IntegrateWise works with the tools you already use—communication, docs, CRM, project tracking, support, finance, and analytics.

It connects them into one operating system so your work stays linked, searchable, and reusable.

Your AI, your formats

IntegrateWise supports flexibility in how intelligence is produced.

You keep the formats your team already trusts, while IntegrateWise ensures every output stays connected to the Spine and the work behind it.

Fast and dependable

IntegrateWise is designed to be reliable and consistent.

Responses are fast, workflows follow predictable rules, and the system has safe fallbacks so execution does not break when inputs are imperfect.

You stay in control

You always know what happened and why.

Actions can be policy-checked, approval-gated when required, and audit logged through Governor Slack and AI-Relay—so you can scale work confidently across teams.`
    }
  ]
};

// Helper function to make Notion API requests
function notionRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': NOTION_API_VERSION,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`Notion API error: ${res.statusCode} - ${JSON.stringify(parsed)}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Helper to convert text to Notion blocks
function textToBlocks(text) {
  const blocks = [];
  const lines = text.split('\n');
  let currentParagraph = [];

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Empty line - finalize current paragraph
    if (!trimmed) {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ').trim();
        if (paragraphText) {
          blocks.push({
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{
                type: 'text',
                text: { content: paragraphText }
              }]
            }
          });
        }
        currentParagraph = [];
      }
      continue;
    }

    // Bullet point
    if (trimmed.startsWith('- ')) {
      // Finalize any pending paragraph
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ').trim();
        if (paragraphText) {
          blocks.push({
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{
                type: 'text',
                text: { content: paragraphText }
              }]
            }
          });
        }
        currentParagraph = [];
      }
      // Add bullet point
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{
            type: 'text',
            text: { content: trimmed.replace(/^-\s*/, '') }
          }]
        }
      });
    } else if (/^\d+\)\s/.test(trimmed)) {
      // Numbered item (e.g., "1) Load")
      // Finalize any pending paragraph
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ').trim();
        if (paragraphText) {
          blocks.push({
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{
                type: 'text',
                text: { content: paragraphText }
              }]
            }
          });
        }
        currentParagraph = [];
      }
      // Add as heading_3 for numbered sections
      blocks.push({
        object: 'block',
        type: 'heading_3',
        heading_3: {
          rich_text: [{
            type: 'text',
            text: { content: trimmed }
          }]
        }
      });
    } else {
      // Regular text line - add to current paragraph
      currentParagraph.push(trimmed);
    }
  }

  // Finalize any remaining paragraph
  if (currentParagraph.length > 0) {
    const paragraphText = currentParagraph.join(' ').trim();
    if (paragraphText) {
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: paragraphText }
          }]
        }
      });
    }
  }

  return blocks;
}

// Main function
async function main() {
  try {
    console.log(`Updating Notion page: ${PAGE_ID_FORMATTED}`);
    
    // Step 1: Read current page to get structure
    console.log('Reading current page structure...');
    const page = await notionRequest('GET', `/v1/pages/${PAGE_ID_FORMATTED}`);
    console.log(`Page title: ${JSON.stringify(page.properties?.title || page.properties?.['Name'] || 'Untitled')}`);

    // Step 2: Get all blocks from the page
    console.log('Fetching current blocks...');
    let allBlocks = [];
    let nextCursor = null;
    
    do {
      const response = await notionRequest('GET', 
        `/v1/blocks/${PAGE_ID_FORMATTED}/children${nextCursor ? `?start_cursor=${nextCursor}` : ''}`
      );
      allBlocks = allBlocks.concat(response.results);
      nextCursor = response.next_cursor || null;
    } while (nextCursor);

    console.log(`Found ${allBlocks.length} existing blocks`);

    // Step 3: Update page title
    console.log('Updating page title...');
    await notionRequest('PATCH', `/v1/pages/${PAGE_ID_FORMATTED}`, {
      properties: {
        title: {
          title: [{ type: 'text', text: { content: NEW_CONTENT.title } }]
        }
      }
    });

    // Step 4: Delete all existing blocks (to replace with new content)
    console.log('Removing old blocks...');
    for (const block of allBlocks) {
      if (block.id) {
        try {
          await notionRequest('DELETE', `/v1/blocks/${block.id}`);
        } catch (e) {
          console.warn(`Failed to delete block ${block.id}: ${e.message}`);
        }
      }
    }

    // Step 5: Add new content blocks
    console.log('Adding new content...');
    const newBlocks = [];

    // Add main heading
    newBlocks.push({
      object: 'block',
      type: 'heading_1',
      heading_1: {
        rich_text: [{ type: 'text', text: { content: NEW_CONTENT.title } }]
      }
    });

    // Add each section
    for (const section of NEW_CONTENT.sections) {
      // Add section heading
      newBlocks.push({
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: section.heading } }]
        }
      });

      // Add section content as blocks
      const sectionBlocks = textToBlocks(section.content);
      newBlocks.push(...sectionBlocks);
    }

    // Insert blocks in batches (Notion API limit is ~100 blocks per request)
    const batchSize = 100;
    for (let i = 0; i < newBlocks.length; i += batchSize) {
      const batch = newBlocks.slice(i, i + batchSize);
      console.log(`Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(newBlocks.length / batchSize)} (${batch.length} blocks)...`);
      
      await notionRequest('PATCH', `/v1/blocks/${PAGE_ID_FORMATTED}/children`, {
        children: batch
      });
    }

    console.log('✓ Successfully updated Notion page!');
    console.log(`Page URL: https://www.notion.so/SSOT-${PAGE_ID_RAW}`);

  } catch (error) {
    console.error('Error updating Notion page:', error.message);
    if (error.message.includes('401')) {
      console.error('\nAuthentication failed. Please check your NOTION_API_KEY.');
    } else if (error.message.includes('404')) {
      console.error('\nPage not found. Please verify the page ID and ensure your integration has access to the page.');
    }
    process.exit(1);
  }
}

main();
