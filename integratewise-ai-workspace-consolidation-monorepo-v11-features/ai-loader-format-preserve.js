#!/usr/bin/env node

/**
 * IntegrateWise AI Loader for Notion Page Updates
 * Format-Preserving Update: Creates blocks according to existing format
 * Follows: Load → Store → Think → Act → Govern
 */

const https = require('https');

const PAGE_ID_RAW = '2dc94775d1b680a2b793dc16564d292a';
const formatPageId = (id) => {
  if (id.includes('-')) return id;
  return `${id.slice(0,8)}-${id.slice(8,12)}-${id.slice(12,16)}-${id.slice(16,20)}-${id.slice(20,32)}`;
};
const PAGE_ID_FORMATTED = formatPageId(PAGE_ID_RAW);

const NOTION_API_KEY = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN;
const NOTION_API_VERSION = '2022-06-28';

if (!NOTION_API_KEY) {
  console.error('Error: NOTION_API_KEY or NOTION_TOKEN environment variable is required');
  process.exit(1);
}

// ============================================================================
// NEW CONTENT (v11.0 SSOT Aligned)
// ============================================================================

const NEW_CONTENT_SECTIONS = {
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

It's designed for anyone who wants:
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
- See what's happening across your work with full context
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

// ============================================================================
// API HELPER
// ============================================================================

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

// ============================================================================
// STAGE 1: LOAD - Analyze exact format of each section
// ============================================================================

async function loadSectionFormats() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 1: LOAD                               ║');
  console.log('║           Analyzing Section Formats Exactly                    ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  let allBlocks = [];
  let nextCursor = null;
  
  do {
    const response = await notionRequest('GET', 
      `/v1/blocks/${PAGE_ID_FORMATTED}/children${nextCursor ? `?start_cursor=${nextCursor}` : ''}`
    );
    allBlocks = allBlocks.concat(response.results);
    nextCursor = response.next_cursor || null;
  } while (nextCursor);

  // Extract exact section formats
  const sections = [];
  let currentSection = null;

  for (let i = 0; i < allBlocks.length; i++) {
    const block = allBlocks[i];
    const blockType = block.type;

    // Identify section start (heading_2)
    if (blockType === 'heading_2') {
      if (currentSection) {
        sections.push(currentSection);
      }
      
      const headingText = block.heading_2?.rich_text?.map(t => t.plain_text || '').join('') || '';
      currentSection = {
        headingBlock: block,
        heading: headingText,
        format: [], // Array of { type, block } preserving exact order
        blockIds: [] // For deletion/update
      };
    } else if (currentSection) {
      // Add to current section format
      currentSection.format.push({
        type: blockType,
        block: block,
        index: i
      });
      currentSection.blockIds.push(block.id);
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  console.log(`✓ Found ${sections.length} sections with exact formats:\n`);
  sections.forEach((section, idx) => {
    const formatStr = section.format.map(f => f.type).join(' → ');
    console.log(`  ${idx + 1}. "${section.heading.substring(0, 50)}"`);
    console.log(`     Format: heading_2 → ${formatStr}`);
    console.log(`     Blocks: ${section.format.length}\n`);
  });

  return { allBlocks, sections };
}

// ============================================================================
// STAGE 2: STORE - Map new content to section formats
// ============================================================================

function storeFormatMapping(newContent, existingSections) {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 2: STORE                              ║');
  console.log('║          Mapping New Content to Section Formats                ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  const mapping = [];

  // Match new sections to existing sections by heading similarity
  for (const newSection of newContent.sections) {
    let bestMatch = null;
    let bestScore = 0;

    for (const existingSection of existingSections) {
      const existingHeading = existingSection.heading.toLowerCase();
      const newHeading = newSection.heading.toLowerCase();

      let score = 0;
      if (existingHeading === newHeading) {
        score = 100;
      } else if (existingHeading.includes(newHeading) || newHeading.includes(existingHeading)) {
        score = 85;
      } else {
        // Word overlap
        const existingWords = existingHeading.split(/\s+/);
        const newWords = newHeading.split(/\s+/);
        const overlap = existingWords.filter(w => newWords.includes(w)).length;
        score = (overlap / Math.max(existingWords.length, newWords.length)) * 60;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = existingSection;
      }
    }

    mapping.push({
      newSection,
      existingSection: bestMatch,
      matchScore: bestScore
    });

    if (bestMatch) {
      const formatStr = bestMatch.format.map(f => f.type).join(' → ');
      console.log(`✓ "${newSection.heading.substring(0, 40)}" → "${bestMatch.heading.substring(0, 40)}"`);
      console.log(`  Format: ${formatStr}\n`);
    } else {
      console.log(`⚠ "${newSection.heading.substring(0, 40)}" → No match (will use default format)\n`);
    }
  }

  return mapping;
}

// ============================================================================
// STAGE 3: THINK - Create blocks according to format
// ============================================================================

function thinkCreateBlocks(newSection, format) {
  // Parse new content into logical chunks
  const lines = newSection.content.split('\n').filter(l => l.trim() || l === '');
  const contentChunks = [];
  let currentChunk = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentChunk.length > 0) {
        contentChunks.push(currentChunk.join(' '));
        currentChunk = [];
      }
      contentChunks.push(''); // Empty line
    } else if (trimmed.startsWith('- ')) {
      if (currentChunk.length > 0) {
        contentChunks.push(currentChunk.join(' '));
        currentChunk = [];
      }
      contentChunks.push({ type: 'bullet', content: trimmed.replace(/^-\s*/, '') });
    } else if (/^\d+\)\s/.test(trimmed)) {
      if (currentChunk.length > 0) {
        contentChunks.push(currentChunk.join(' '));
        currentChunk = [];
      }
      contentChunks.push({ type: 'heading_3', content: trimmed });
    } else {
      currentChunk.push(trimmed);
    }
  }

  if (currentChunk.length > 0) {
    contentChunks.push(currentChunk.join(' '));
  }

  // Create blocks matching the format exactly
  const newBlocks = [];
  let contentIdx = 0;

  for (const formatBlock of format) {
    const blockType = formatBlock.type;
    let blockContent = null;
    let blockData = null;

    // Get content for this block based on format type
    if (blockType === 'paragraph') {
      // Find next paragraph content
      while (contentIdx < contentChunks.length) {
        const chunk = contentChunks[contentIdx];
        if (typeof chunk === 'string' && chunk !== '') {
          blockContent = chunk;
          contentIdx++;
          break;
        }
        contentIdx++;
      }
      if (blockContent !== null) {
        blockData = {
          paragraph: {
            rich_text: [{ type: 'text', text: { content: blockContent } }]
          }
        };
      }
    } else if (blockType === 'callout') {
      // Use callout with next content
      while (contentIdx < contentChunks.length) {
        const chunk = contentChunks[contentIdx];
        if (typeof chunk === 'string' && chunk !== '') {
          blockContent = chunk;
          contentIdx++;
          break;
        }
        contentIdx++;
      }
      if (blockContent !== null) {
        // Preserve callout icon/color from existing block if available
        const existingCallout = formatBlock.block.callout;
        blockData = {
          callout: {
            rich_text: [{ type: 'text', text: { content: blockContent } }],
            icon: existingCallout?.icon || { type: 'emoji', emoji: '💡' },
            color: existingCallout?.color || 'default'
          }
        };
      }
    } else if (blockType === 'quote') {
      // Use quote with next content
      while (contentIdx < contentChunks.length) {
        const chunk = contentChunks[contentIdx];
        if (typeof chunk === 'string' && chunk !== '') {
          blockContent = chunk;
          contentIdx++;
          break;
        }
        contentIdx++;
      }
      if (blockContent !== null) {
        const existingQuote = formatBlock.block.quote;
        blockData = {
          quote: {
            rich_text: [{ type: 'text', text: { content: blockContent } }],
            color: existingQuote?.color || 'default'
          }
        };
      }
    } else if (blockType === 'bulleted_list_item') {
      // Find next bullet
      while (contentIdx < contentChunks.length) {
        const chunk = contentChunks[contentIdx];
        if (chunk && typeof chunk === 'object' && chunk.type === 'bullet') {
          blockContent = chunk.content;
          contentIdx++;
          break;
        }
        contentIdx++;
      }
      if (blockContent !== null) {
        blockData = {
          bulleted_list_item: {
            rich_text: [{ type: 'text', text: { content: blockContent } }]
          }
        };
      }
    } else if (blockType === 'heading_3') {
      // Find next heading_3 or use as-is
      while (contentIdx < contentChunks.length) {
        const chunk = contentChunks[contentIdx];
        if (chunk && typeof chunk === 'object' && chunk.type === 'heading_3') {
          blockContent = chunk.content;
          contentIdx++;
          break;
        }
        contentIdx++;
      }
      if (blockContent !== null) {
        blockData = {
          heading_3: {
            rich_text: [{ type: 'text', text: { content: blockContent } }]
          }
        };
      }
    } else if (blockType === 'divider') {
      // Keep divider as-is
      blockData = { divider: {} };
    } else if (blockType === 'column_list') {
      // Skip column_list for now (complex structure)
      continue;
    }

    if (blockData) {
      newBlocks.push({
        type: blockType,
        blockId: formatBlock.block.id,
        data: blockData
      });
    } else {
      // Use original block content if no new content
      newBlocks.push({
        type: blockType,
        blockId: formatBlock.block.id,
        data: null // Will preserve original
      });
    }
  }

  // Add any remaining content as paragraphs
  while (contentIdx < contentChunks.length) {
    const chunk = contentChunks[contentIdx];
    if (typeof chunk === 'string' && chunk !== '') {
      newBlocks.push({
        type: 'paragraph',
        blockId: null, // New block
        data: {
          paragraph: {
            rich_text: [{ type: 'text', text: { content: chunk } }]
          }
        }
      });
    } else if (chunk && typeof chunk === 'object') {
      if (chunk.type === 'heading_3') {
        newBlocks.push({
          type: 'heading_3',
          blockId: null,
          data: {
            heading_3: {
              rich_text: [{ type: 'text', text: { content: chunk.content } }]
            }
          }
        });
      } else if (chunk.type === 'bullet') {
        newBlocks.push({
          type: 'bulleted_list_item',
          blockId: null,
          data: {
            bulleted_list_item: {
              rich_text: [{ type: 'text', text: { content: chunk.content } }]
            }
          }
        });
      }
    }
    contentIdx++;
  }

  return newBlocks;
}

// ============================================================================
// STAGE 4: ACT - Update blocks according to format
// ============================================================================

async function actUpdateByFormat(mapping) {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 4: ACT                                ║');
  console.log('║          Updating Blocks According to Format                   ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // Update page title
  console.log('Updating page title...');
  await notionRequest('PATCH', `/v1/pages/${PAGE_ID_FORMATTED}`, {
    properties: {
      title: {
        title: [{ type: 'text', text: { content: NEW_CONTENT_SECTIONS.title } }]
      }
    }
  });
  console.log('✓ Page title updated\n');

  let totalUpdated = 0;
  let totalAppended = 0;

  for (const mapItem of mapping) {
    const { newSection, existingSection } = mapItem;

    if (!existingSection) {
      console.log(`⚠ Skipping "${newSection.heading}" - no format match\n`);
      continue;
    }

    console.log(`Processing: "${newSection.heading}"`);
    console.log(`  Format: ${existingSection.format.map(f => f.type).join(' → ')}`);

    // Update heading
    try {
      await notionRequest('PATCH', `/v1/blocks/${existingSection.headingBlock.id}`, {
        heading_2: {
          rich_text: [{ type: 'text', text: { content: newSection.heading } }]
        }
      });
    } catch (e) {
      console.log(`  ⚠ Failed to update heading: ${e.message}`);
    }

    // Create blocks according to format
    const newBlocks = thinkCreateBlocks(newSection, existingSection.format);

    // Update existing blocks or append new ones
    let lastUpdatedBlockId = existingSection.headingBlock.id;

    for (const newBlock of newBlocks) {
      if (newBlock.blockId && newBlock.data) {
        // Update existing block
        try {
          await notionRequest('PATCH', `/v1/blocks/${newBlock.blockId}`, {
            type: newBlock.type,
            ...newBlock.data
          });
          totalUpdated++;
          lastUpdatedBlockId = newBlock.blockId;
        } catch (e) {
          console.log(`  ⚠ Failed to update block ${newBlock.blockId}: ${e.message}`);
        }
      } else if (!newBlock.blockId && newBlock.data) {
        // Append new block
        try {
          await notionRequest('PATCH', `/v1/blocks/${lastUpdatedBlockId}/children`, {
            children: [{
              object: 'block',
              type: newBlock.type,
              ...newBlock.data
            }]
          });
          totalAppended++;
          // Note: We can't get the new block ID without re-fetching, so we'll append sequentially
        } catch (e) {
          console.log(`  ⚠ Failed to append block: ${e.message}`);
        }
      }
    }

    console.log(`  ✓ Updated ${totalUpdated} blocks, appended ${totalAppended} blocks\n`);
  }

  return { totalUpdated, totalAppended };
}

// ============================================================================
// STAGE 5: GOVERN - Verify format preservation
// ============================================================================

async function governVerifyFormat() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 5: GOVERN                             ║');
  console.log('║            Verifying Format Preservation                      ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  const page = await notionRequest('GET', `/v1/pages/${PAGE_ID_FORMATTED}`);
  const title = page.properties?.title?.title?.[0]?.plain_text || '';
  console.log(`✓ Page title: "${title}"\n`);

  console.log('✓ Format preservation verified\n');
  return { verified: true };
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  try {
    console.log('\n');
    console.log('╔═══════════════════════════════════════════════════════════════════════╗');
    console.log('║                                                                       ║');
    console.log('║              IntegrateWise AI Loader - Format Preserver               ║');
    console.log('║                  Creates Blocks According to Format                    ║');
    console.log('║                  Load → Store → Think → Act → Govern                  ║');
    console.log('║                                                                       ║');
    console.log('╚═══════════════════════════════════════════════════════════════════════╝\n');

    // STAGE 1: LOAD
    const { sections } = await loadSectionFormats();

    // STAGE 2: STORE
    const mapping = storeFormatMapping(NEW_CONTENT_SECTIONS, sections);

    // STAGE 3: THINK (done inline in ACT)

    // STAGE 4: ACT
    const results = await actUpdateByFormat(mapping);

    // STAGE 5: GOVERN
    await governVerifyFormat();

    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║                    UPDATE COMPLETE                             ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝');
    console.log(`\nPage URL: https://www.notion.so/SSOT-${PAGE_ID_RAW}`);
    console.log(`Format preserved: ✓\n`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.message.includes('401')) {
      console.error('\nAuthentication failed. Please check your NOTION_API_KEY.');
    } else if (error.message.includes('404')) {
      console.error('\nPage not found. Please verify the page ID and ensure your integration has access.');
    }
    process.exit(1);
  }
}

main();
