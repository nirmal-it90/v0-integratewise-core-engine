#!/usr/bin/env node

const https = require('https');

// Notion page ID from URL
const PAGE_ID_RAW = '2dc94775d1b680a2b793dc16564d292a';
const formatPageId = (id) => {
  if (id.includes('-')) return id;
  return `${id.slice(0,8)}-${id.slice(8,12)}-${id.slice(12,16)}-${id.slice(16,20)}-${id.slice(20,32)}`;
};
const PAGE_ID_FORMATTED = formatPageId(PAGE_ID_RAW);

const NOTION_API_KEY = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN;

if (!NOTION_API_KEY) {
  console.error('Error: NOTION_API_KEY or NOTION_TOKEN environment variable is required');
  process.exit(1);
}

const NOTION_API_VERSION = '2022-06-28';

// New content structure (mapped to sections)
const NEW_CONTENT_SECTIONS = [
  'What IntegrateWise Is',
  'Who It\'s For',
  'Primary Pitch',
  'Tagline Option',
  'IntegrateWise AI Workspace — Simple Overview',
  'The Big Idea',
  'What Makes IntegrateWise Different',
  'Canonical Operating Sequence (v11.0 AI OS)',
  'What We Promise (v11.0)'
];

const NEW_CONTENT = {
  'What IntegrateWise Is': `IntegrateWise is an AI workspace that connects the tools you already use and turns everyday work into governed organizational memory.

Instead of switching between Slack, docs, CRMs, and project tools, IntegrateWise brings your work into one place, keeps it structured, and helps you turn conversations and ideas into clear outcomes—while you remain in control.

IntegrateWise is built as one operating system with a single governed Spine behind everything, and multiple role-based Views to match how you work.`,

  'Who It\'s For': `IntegrateWise is for people and teams anywhere in the world—whether you work on your own, collaborate in a small team, or run a company—who want work to feel simpler, clearer, and more effective.

It\'s designed for anyone who wants:
- Less tool switching
- More clarity and continuity
- Faster execution with fewer mistakes
- Work that stays organized and reusable over time`,

  'Primary Pitch': `IntegrateWise is an AI workspace that brings all your work into one place—without replacing your tools.

It connects to what you already use, captures work as it happens, stores it as governed organizational memory in your Spine, and helps you think, execute, and collaborate through role-based Views—powered by an always-ready Cognitive Twin and protected by governance.`,

  'Tagline Option': `Normalize once. Use it everywhere.`,

  'IntegrateWise AI Workspace — Simple Overview': `IntegrateWise is an AI workspace for anyone who wants a better way to work—on your own, with a team, or across a company.

It does not replace your tools. You continue using Slack, your CRM, docs, project tools, support systems, and analytics platforms.

IntegrateWise connects them, brings important work signals into one system, and helps you:
- See what\'s happening across your work with full context
- Turn conversations and ideas into decisions, tasks, and plans
- Create useful outputs like emails, decks, reports, SOPs, proposals, and strategies
- Keep everything connected to where it came from, so nothing loses meaning`,

  'The Big Idea': `One OS at the center of your work

You keep your current tools.

IntegrateWise connects to them and captures your real work—then turns it into structured, reusable intelligence.

Under the hood, IntegrateWise runs on a simple law:

One OS. One Spine. Multiple Views.

This means your organization doesn\'t fragment into different products, different dashboards, or disconnected knowledge.

You get one governed foundation, and different Views depending on what you need to do.`,

  'What Makes IntegrateWise Different': `One platform, multiple Views

Sales, Marketing, Customer Success, Product, Operations, and Owner workflows are not separate tools.

They are different Views of the same Spine—designed for different roles, permissions, and outcomes.

Outputs are built into the workflow

You don\'t start from scratch.

IntegrateWise helps you produce high-quality outputs directly from real work and real context—like updates, emails, decks, reports, customer plans, playbooks, and internal documentation.

Works at any size

Whether you are a solo operator, a small team, or a large company, the same operating model works:
- one system of record
- one governed memory layer
- role-based execution surfaces
- clear control across teams

Your tools stay as they are

IntegrateWise is not asking you to stop using Slack, your CRM, or your doc system.

It connects to them, normalizes the work, and makes it usable everywhere with a consistent structure and governance.`,

  'Canonical Operating Sequence (v11.0 AI OS)': `This is the canonical operating sequence of IntegrateWise:

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

This is how IntegrateWise enables AI at scale without losing control.`,

  'What We Promise (v11.0)': `Your tools, connected

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

// Helper to convert text to Notion rich_text array
function textToRichText(text) {
  if (!text || !text.trim()) {
    return [];
  }
  // Split by lines and create rich text array
  // For APA formatting, preserve line breaks as separate paragraphs
  const lines = text.split('\n').filter(line => line.trim() || line === '');
  
  if (lines.length === 0) {
    return [{
      type: 'text',
      text: { content: text || '' }
    }];
  }

  // For now, combine lines into single rich text with line breaks
  // Will be split into separate blocks later
  return [{
    type: 'text',
    text: { content: text }
  }];
}

// Helper to split content into paragraphs (for APA formatting)
function splitIntoParagraphs(text) {
  const paragraphs = [];
  const lines = text.split('\n');
  let currentParagraph = [];

  for (const line of lines) {
    const trimmed = line.trim();
    
    if (!trimmed) {
      if (currentParagraph.length > 0) {
        paragraphs.push(currentParagraph.join(' '));
        currentParagraph = [];
      }
      // Empty line = paragraph break in APA
      paragraphs.push(''); // Will be handled as empty block
    } else {
      currentParagraph.push(trimmed);
    }
  }

  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph.join(' '));
  }

  return paragraphs.filter(p => p !== '' || paragraphs.length === 1);
}

// Helper to convert text content to Notion blocks
function contentToBlocks(content, preserveFormatting = false) {
  const blocks = [];
  const paragraphs = splitIntoParagraphs(content);

  for (const para of paragraphs) {
    if (!para.trim()) {
      // Empty paragraph - skip or add as empty block if needed
      continue;
    }

    // Check if it's a bullet point
    if (para.trim().startsWith('- ')) {
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{
            type: 'text',
            text: { content: para.trim().replace(/^-\s*/, '') }
          }]
        }
      });
    } 
    // Check if it's a numbered item (e.g., "1) Load")
    else if (/^\d+\)\s/.test(para.trim())) {
      blocks.push({
        object: 'block',
        type: 'heading_3',
        heading_3: {
          rich_text: [{
            type: 'text',
            text: { content: para.trim() }
          }]
        }
      });
    }
    // Regular paragraph
    else {
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: para.trim() }
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
    console.log(`Reading page structure: ${PAGE_ID_FORMATTED}`);
    
    // Step 1: Read current page
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
          title: [{ type: 'text', text: { content: 'Positioning (v11.0 — SSOT Aligned)' } }]
        }
      }
    });

    // Step 4: Map existing blocks to new content
    // Strategy: Identify headings and update subsequent blocks with new content
    let currentSection = null;
    let blockIndex = 0;
    let blocksToUpdate = [];
    let blocksToAppend = [];

    // First pass: identify sections and prepare updates
    for (let i = 0; i < allBlocks.length; i++) {
      const block = allBlocks[i];
      const blockType = block.type;

      // Check if this is a heading (potential section start)
      if (blockType === 'heading_1' || blockType === 'heading_2' || blockType === 'heading_3') {
        const headingText = block[blockType]?.rich_text?.[0]?.plain_text || '';
        
        // Try to match with new content sections
        const matchedSection = NEW_CONTENT_SECTIONS.find(section => 
          headingText.includes(section) || section.includes(headingText) || 
          headingText.toLowerCase().includes(section.toLowerCase())
        );

        if (matchedSection) {
          currentSection = matchedSection;
          console.log(`Found section: ${matchedSection}`);
        }
      }

      // If we have a current section, prepare to update this block
      if (currentSection && block.type === 'paragraph') {
        blocksToUpdate.push({ block, section: currentSection, index: i });
      }
    }

    // Step 5: Update existing blocks with new content
    // For now, let's do a simpler approach: update blocks sequentially based on sections
    console.log('Updating blocks with new content...');

    // Group blocks by section (simple heuristic: blocks between headings)
    let sectionBlocks = [];
    let currentSectionName = null;
    let sectionStartIndex = 0;

    for (let i = 0; i < allBlocks.length; i++) {
      const block = allBlocks[i];
      const blockType = block.type;
      
      if (blockType === 'heading_1' || blockType === 'heading_2' || blockType === 'heading_3') {
        // Process previous section if exists
        if (currentSectionName && sectionBlocks.length > 0) {
          const newContent = NEW_CONTENT[currentSectionName];
          if (newContent) {
            const newBlocks = contentToBlocks(newContent);
            // Update existing blocks
            for (let j = 0; j < Math.min(sectionBlocks.length, newBlocks.length); j++) {
              const existingBlock = sectionBlocks[j];
              const newBlockData = newBlocks[j];
              
              if (existingBlock.type === 'paragraph' && newBlockData.type === 'paragraph') {
                try {
                  await notionRequest('PATCH', `/v1/blocks/${existingBlock.id}`, {
                    paragraph: newBlockData.paragraph
                  });
                  console.log(`Updated block ${existingBlock.id}`);
                } catch (e) {
                  console.warn(`Failed to update block ${existingBlock.id}: ${e.message}`);
                }
              } else if (existingBlock.type === 'paragraph' && newBlockData.type === 'bulleted_list_item') {
                // Convert paragraph to bulleted list
                try {
                  await notionRequest('PATCH', `/v1/blocks/${existingBlock.id}`, {
                    type: 'bulleted_list_item',
                    bulleted_list_item: newBlockData.bulleted_list_item
                  });
                  console.log(`Converted block ${existingBlock.id} to bulleted list`);
                } catch (e) {
                  console.warn(`Failed to convert block ${existingBlock.id}: ${e.message}`);
                }
              }
            }
            
            // Append remaining new blocks if there are more new blocks than old
            if (newBlocks.length > sectionBlocks.length) {
              const remainingBlocks = newBlocks.slice(sectionBlocks.length);
              const lastBlockId = sectionBlocks[sectionBlocks.length - 1].id;
              try {
                await notionRequest('PATCH', `/v1/blocks/${lastBlockId}/children`, {
                  children: remainingBlocks
                });
                console.log(`Appended ${remainingBlocks.length} new blocks after section ${currentSectionName}`);
              } catch (e) {
                console.warn(`Failed to append blocks: ${e.message}`);
              }
            }
          }
        }
        
        // Start new section
        const headingText = block[blockType]?.rich_text?.[0]?.plain_text || '';
        currentSectionName = NEW_CONTENT_SECTIONS.find(section => 
          headingText.includes(section) || section.includes(headingText) || 
          headingText.toLowerCase().includes(section.toLowerCase()) || 
          section.toLowerCase().includes(headingText.toLowerCase())
        );
        sectionBlocks = [];
        sectionStartIndex = i;
      } else {
        // Add block to current section
        sectionBlocks.push(block);
      }
    }

    // Process last section
    if (currentSectionName && sectionBlocks.length > 0) {
      const newContent = NEW_CONTENT[currentSectionName];
      if (newContent) {
        const newBlocks = contentToBlocks(newContent);
        for (let j = 0; j < Math.min(sectionBlocks.length, newBlocks.length); j++) {
          const existingBlock = sectionBlocks[j];
          const newBlockData = newBlocks[j];
          
          if (existingBlock.type === 'paragraph' && newBlockData.type === 'paragraph') {
            try {
              await notionRequest('PATCH', `/v1/blocks/${existingBlock.id}`, {
                paragraph: newBlockData.paragraph
              });
              console.log(`Updated block ${existingBlock.id}`);
            } catch (e) {
              console.warn(`Failed to update block ${existingBlock.id}: ${e.message}`);
            }
          }
        }
      }
    }

    console.log('✓ Successfully updated Notion page while preserving structure!');
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
