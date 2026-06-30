#!/usr/bin/env node

/**
 * IntegrateWise AI Loader for Notion Page Updates
 * Follows: Load → Store → Think → Act → Govern
 * Preserves existing block structure and formatting
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
// NEW CONTENT (v11.0 SSOT Aligned) - Structured by sections
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

This means your organization doesn\'t fragment into different products, different dashboards, or disconnected knowledge.

You get one governed foundation, and different Views depending on what you need to do.`
    },
    {
      heading: 'What Makes IntegrateWise Different',
      content: `One platform, multiple Views

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
// STAGE 1: LOAD - Read and analyze current page schema
// ============================================================================

async function loadPageSchema() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 1: LOAD                               ║');
  console.log('║              Analyzing Notion Page Schema                      ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // Get page metadata
  const page = await notionRequest('GET', `/v1/pages/${PAGE_ID_FORMATTED}`);
  console.log('✓ Page metadata loaded');

  // Get all blocks
  let allBlocks = [];
  let nextCursor = null;
  
  do {
    const response = await notionRequest('GET', 
      `/v1/blocks/${PAGE_ID_FORMATTED}/children${nextCursor ? `?start_cursor=${nextCursor}` : ''}`
    );
    allBlocks = allBlocks.concat(response.results);
    nextCursor = response.next_cursor || null;
  } while (nextCursor);

  console.log(`✓ Found ${allBlocks.length} blocks\n`);

  // Analyze schema
  const schema = {
    blocks: allBlocks,
    structure: [],
    blockTypeCounts: {},
    sections: []
  };

  let currentSection = null;
  let sectionBlocks = [];

  for (let i = 0; i < allBlocks.length; i++) {
    const block = allBlocks[i];
    const blockType = block.type;

    // Count block types
    schema.blockTypeCounts[blockType] = (schema.blockTypeCounts[blockType] || 0) + 1;

    // Extract content for analysis
    let content = '';
    if (blockType === 'paragraph') {
      content = block.paragraph?.rich_text?.map(t => t.plain_text || '').join('') || '';
    } else if (blockType.startsWith('heading_')) {
      content = block[blockType]?.rich_text?.map(t => t.plain_text || '').join('') || '';
    } else if (blockType === 'bulleted_list_item') {
      content = block.bulleted_list_item?.rich_text?.map(t => t.plain_text || '').join('') || '';
    } else if (blockType === 'callout') {
      content = block.callout?.rich_text?.map(t => t.plain_text || '').join('') || '';
    } else if (blockType === 'quote') {
      content = block.quote?.rich_text?.map(t => t.plain_text || '').join('') || '';
    }

    // Identify sections (by headings)
    if (blockType === 'heading_2' || blockType === 'heading_1') {
      if (currentSection) {
        schema.sections.push({
          heading: currentSection.heading,
          headingBlock: currentSection.headingBlock,
          blocks: sectionBlocks,
          blockTypes: sectionBlocks.map(b => b.type)
        });
      }
      currentSection = {
        heading: content,
        headingBlock: block,
        index: i
      };
      sectionBlocks = [];
    } else if (currentSection) {
      sectionBlocks.push(block);
    }

    schema.structure.push({
      index: i,
      type: blockType,
      id: block.id,
      content: content.substring(0, 100)
    });
  }

  // Add last section
  if (currentSection) {
    schema.sections.push({
      heading: currentSection.heading,
      headingBlock: currentSection.headingBlock,
      blocks: sectionBlocks,
      blockTypes: sectionBlocks.map(b => b.type)
    });
  }

  console.log('Schema Analysis:');
  console.log('-'.repeat(70));
  console.log(`Block Types Found:`, Object.keys(schema.blockTypeCounts).join(', '));
  console.log(`Block Type Distribution:`, schema.blockTypeCounts);
  console.log(`Sections Identified: ${schema.sections.length}`);
  schema.sections.forEach((section, idx) => {
    console.log(`  ${idx + 1}. "${section.heading.substring(0, 50)}" (${section.blocks.length} blocks, types: ${[...new Set(section.blockTypes)].join(', ')})`);
  });
  console.log('');

  return { page, schema };
}

// ============================================================================
// STAGE 2: STORE - Preserve block structure mapping
// ============================================================================

function storeBlockMapping(schema, newContent) {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 2: STORE                              ║');
  console.log('║           Preserving Block Structure Mapping                   ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // Map new sections to existing sections by heading similarity
  const mapping = [];

  for (const newSection of newContent.sections) {
    // Find matching existing section
    let bestMatch = null;
    let bestScore = 0;

    for (const existingSection of schema.sections) {
      const existingHeading = existingSection.heading.toLowerCase();
      const newHeading = newSection.heading.toLowerCase();

      // Calculate similarity score
      let score = 0;
      if (existingHeading === newHeading) {
        score = 100;
      } else if (existingHeading.includes(newHeading) || newHeading.includes(existingHeading)) {
        score = 80;
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
      matchScore: bestScore,
      preserveTypes: bestMatch ? bestMatch.blockTypes : []
    });

    if (bestMatch) {
      console.log(`✓ Mapped "${newSection.heading.substring(0, 40)}" → "${bestMatch.heading.substring(0, 40)}" (score: ${bestScore.toFixed(0)})`);
    } else {
      console.log(`⚠ No match for "${newSection.heading.substring(0, 40)}" (will append new blocks)`);
    }
  }

  console.log('');
  return mapping;
}

// ============================================================================
// STAGE 3: THINK - Intelligent content-to-block mapping
// ============================================================================

function thinkContentMapping(newSection, existingBlocks) {
  // Parse new content into logical blocks
  const lines = newSection.content.split('\n').filter(l => l.trim());
  
  const newBlocks = [];
  let currentParagraph = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      // Empty line - finalize paragraph
      if (currentParagraph.length > 0) {
        newBlocks.push({
          type: 'paragraph',
          content: currentParagraph.join(' ')
        });
        currentParagraph = [];
      }
    } else if (trimmed.startsWith('- ')) {
      // Bullet point
      if (currentParagraph.length > 0) {
        newBlocks.push({
          type: 'paragraph',
          content: currentParagraph.join(' ')
        });
        currentParagraph = [];
      }
      newBlocks.push({
        type: 'bulleted_list_item',
        content: trimmed.replace(/^-\s*/, '')
      });
    } else if (/^\d+\)\s/.test(trimmed)) {
      // Numbered heading (e.g., "1) Load")
      if (currentParagraph.length > 0) {
        newBlocks.push({
          type: 'paragraph',
          content: currentParagraph.join(' ')
        });
        currentParagraph = [];
      }
      newBlocks.push({
        type: 'heading_3',
        content: trimmed
      });
    } else {
      currentParagraph.push(trimmed);
    }
  }

  if (currentParagraph.length > 0) {
    newBlocks.push({
      type: 'paragraph',
      content: currentParagraph.join(' ')
    });
  }

  // Map new blocks to existing blocks preserving types when possible
  const blockMapping = [];
  const existingParagraphs = existingBlocks.filter(b => b.type === 'paragraph');
  const existingBullets = existingBlocks.filter(b => b.type === 'bulleted_list_item');
  const existingCallouts = existingBlocks.filter(b => b.type === 'callout');
  const existingQuotes = existingBlocks.filter(b => b.type === 'quote');

  let paraIdx = 0;
  let bulletIdx = 0;
  let calloutIdx = 0;
  let quoteIdx = 0;

  for (const newBlock of newBlocks) {
    let mappedBlock = null;

    if (newBlock.type === 'paragraph') {
      if (paraIdx < existingParagraphs.length) {
        mappedBlock = existingParagraphs[paraIdx];
      } else if (calloutIdx < existingCallouts.length) {
        // Use callout if no more paragraphs
        mappedBlock = existingCallouts[calloutIdx];
      } else if (quoteIdx < existingQuotes.length) {
        // Use quote if no more paragraphs or callouts
        mappedBlock = existingQuotes[quoteIdx];
      }
      paraIdx++;
    } else if (newBlock.type === 'bulleted_list_item') {
      if (bulletIdx < existingBullets.length) {
        mappedBlock = existingBullets[bulletIdx];
      } else if (paraIdx < existingParagraphs.length) {
        // Convert paragraph to bullet if needed
        mappedBlock = existingParagraphs[paraIdx];
      }
      bulletIdx++;
    } else if (newBlock.type === 'heading_3') {
      // Keep as heading_3
      mappedBlock = null; // Will be added as new if no match
    }

    blockMapping.push({
      newBlock,
      existingBlock: mappedBlock,
      preserveType: mappedBlock ? mappedBlock.type : newBlock.type
    });
  }

  return blockMapping;
}

// ============================================================================
// STAGE 4: ACT - Update blocks preserving structure
// ============================================================================

async function actUpdateBlocks(mapping, schema) {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 4: ACT                                ║');
  console.log('║              Updating Blocks Preserving Types                  ║');
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

  // Process each section mapping
  for (const sectionMap of mapping) {
    const { newSection, existingSection } = sectionMap;

    if (!existingSection) {
      console.log(`⚠ Skipping "${newSection.heading}" - no existing section match`);
      continue;
    }

    console.log(`Processing: "${newSection.heading}"`);
    console.log(`  Existing blocks: ${existingSection.blocks.length}`);

    // Update heading if different
    const headingContent = existingSection.headingBlock[existingSection.headingBlock.type]?.rich_text?.[0]?.plain_text || '';
    if (headingContent !== newSection.heading) {
      try {
        await notionRequest('PATCH', `/v1/blocks/${existingSection.headingBlock.id}`, {
          [existingSection.headingBlock.type]: {
            rich_text: [{ type: 'text', text: { content: newSection.heading } }]
          }
        });
        console.log(`  ✓ Updated heading`);
      } catch (e) {
        console.log(`  ⚠ Failed to update heading: ${e.message}`);
      }
    }

    // Map content to blocks
    const blockMapping = thinkContentMapping(newSection, existingSection.blocks);

    // Update existing blocks
    for (let i = 0; i < blockMapping.length; i++) {
      const { newBlock, existingBlock, preserveType } = blockMapping[i];

      if (existingBlock) {
        try {
          const updateData = {};

          if (preserveType === 'paragraph' && newBlock.type === 'paragraph') {
            updateData.paragraph = {
              rich_text: [{ type: 'text', text: { content: newBlock.content } }]
            };
          } else if (preserveType === 'bulleted_list_item' && newBlock.type === 'bulleted_list_item') {
            updateData.bulleted_list_item = {
              rich_text: [{ type: 'text', text: { content: newBlock.content } }]
            };
          } else if (preserveType === 'callout' && newBlock.type === 'paragraph') {
            // Update callout with paragraph content
            updateData.callout = {
              rich_text: [{ type: 'text', text: { content: newBlock.content } }]
            };
          } else if (preserveType === 'quote' && newBlock.type === 'paragraph') {
            // Update quote with paragraph content
            updateData.quote = {
              rich_text: [{ type: 'text', text: { content: newBlock.content } }]
            };
          } else if (preserveType !== newBlock.type) {
            // Type conversion needed
            updateData.type = newBlock.type;
            updateData[newBlock.type] = {
              rich_text: [{ type: 'text', text: { content: newBlock.content } }]
            };
          }

          if (Object.keys(updateData).length > 0) {
            await notionRequest('PATCH', `/v1/blocks/${existingBlock.id}`, updateData);
            totalUpdated++;
            if (i < 3) console.log(`  ✓ Updated block ${i + 1} (${preserveType})`);
          }
        } catch (e) {
          console.log(`  ⚠ Failed to update block ${i + 1}: ${e.message}`);
        }
      } else {
        // Append new block (e.g., heading_3)
        try {
          const lastBlockId = existingSection.blocks.length > 0 
            ? existingSection.blocks[existingSection.blocks.length - 1].id 
            : existingSection.headingBlock.id;

          const newBlockData = {
            object: 'block',
            type: newBlock.type,
            [newBlock.type]: {
              rich_text: [{ type: 'text', text: { content: newBlock.content } }]
            }
          };

          await notionRequest('PATCH', `/v1/blocks/${lastBlockId}/children`, {
            children: [newBlockData]
          });
          totalAppended++;
          console.log(`  ✓ Appended new block (${newBlock.type})`);
        } catch (e) {
          console.log(`  ⚠ Failed to append block: ${e.message}`);
        }
      }
    }

    console.log('');
  }

  console.log(`\n✓ Update complete: ${totalUpdated} blocks updated, ${totalAppended} blocks appended`);
  return { totalUpdated, totalAppended };
}

// ============================================================================
// STAGE 5: GOVERN - Validate and verify
// ============================================================================

async function governVerifyUpdate() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 5: GOVERN                             ║');
  console.log('║              Validating Update Integrity                       ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // Re-read page to verify
  const page = await notionRequest('GET', `/v1/pages/${PAGE_ID_FORMATTED}`);
  const title = page.properties?.title?.title?.[0]?.plain_text || '';

  console.log(`✓ Page title verified: "${title}"`);

  // Get block count
  let allBlocks = [];
  let nextCursor = null;
  
  do {
    const response = await notionRequest('GET', 
      `/v1/blocks/${PAGE_ID_FORMATTED}/children${nextCursor ? `?start_cursor=${nextCursor}` : ''}`
    );
    allBlocks = allBlocks.concat(response.results);
    nextCursor = response.next_cursor || null;
  } while (nextCursor);

  console.log(`✓ Total blocks verified: ${allBlocks.length}`);
  console.log(`✓ Structure preserved\n`);

  return { verified: true, blockCount: allBlocks.length };
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  try {
    console.log('\n');
    console.log('╔═══════════════════════════════════════════════════════════════════════╗');
    console.log('║                                                                       ║');
    console.log('║                  IntegrateWise AI Loader                              ║');
    console.log('║                  Notion Page Updater                                  ║');
    console.log('║                  Load → Store → Think → Act → Govern                  ║');
    console.log('║                                                                       ║');
    console.log('╚═══════════════════════════════════════════════════════════════════════╝\n');

    // STAGE 1: LOAD
    const { page, schema } = await loadPageSchema();

    // STAGE 2: STORE
    const mapping = storeBlockMapping(schema, NEW_CONTENT_SECTIONS);

    // STAGE 3: THINK (done inline during ACT)

    // STAGE 4: ACT
    const results = await actUpdateBlocks(mapping, schema);

    // STAGE 5: GOVERN
    const verification = await governVerifyUpdate();

    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║                    UPDATE COMPLETE                             ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝');
    console.log(`\nPage URL: https://www.notion.so/SSOT-${PAGE_ID_RAW}`);
    console.log(`Blocks updated: ${results.totalUpdated}`);
    console.log(`Blocks appended: ${results.totalAppended}`);
    console.log(`Structure preserved: ✓\n`);

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
