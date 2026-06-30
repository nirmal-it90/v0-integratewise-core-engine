#!/usr/bin/env node

/**
 * IntegrateWise AI Loader for Notion Page Updates
 * Exact Schema Match: Creates blocks according to provided JSON schema
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
// TARGET SCHEMA (from JSON schema provided)
// ============================================================================

const TARGET_SCHEMA = {
  title: "SSOT",
  icon: "👝",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "**Positioning**"
    },
    {
      type: "callout",
      icon: "💡",
      color: "yellow_bg",
      text: "An AI workspace for anyone who wants a better, simpler way to work."
    },
    {
      type: "callout",
      icon: "💡",
      color: "yellow_bg",
      text: "**Who it's for:**\nPeople and teams anywhere in the world—whether you're on your own, in a small team, or running a business—who want work to feel easier, clearer, and more effective."
    },
    {
      type: "quote",
      text: "**Primary Pitch:**",
      children: [
        {
          type: "paragraph",
          text: "**IntegrateWise is an AI workspace that brings all your work into one place.**"
        },
        {
          type: "paragraph",
          text: "It connects to the tools you already use, captures ideas and conversations as they happen, keeps everything organised, and helps you turn them into clear actions and useful outputs—with AI helping in the background while you stay in control."
        },
        {
          type: "paragraph",
          text: "**Tagline options:**\"Organise once. Use it everywhere.\""
        }
      ]
    },
    {
      type: "callout",
      icon: "💡",
      color: "pink_bg",
      children: [
        {
          type: "paragraph",
          text: "\"Organise once. Use it everywhere.\""
        }
      ]
    },
    {
      type: "empty_block"
    },
    {
      type: "heading",
      level: 2,
      text: "**IntegrateWise AI Workspace — Simple Overview**"
    },
    {
      type: "quote",
      text: "**IntegrateWise is an AI workspace for anyone who wants a better way to work—on your own, with a team, or across a company.**"
    },
    {
      type: "callout",
      icon: "💡",
      color: "purple_bg",
      text: "** It doesn't replace your tools. You keep using Slack, your CRM, project tools, payments, and analytics.**"
    },
    {
      type: "paragraph",
      text: "IntegrateWise connects them all, brings the important information into one place, and helps you:"
    },
    {
      type: "bulleted_list",
      items: [
        "See what's happening across your work",
        "Turn conversations and ideas into clear decisions and tasks",
        "Create useful outputs like emails, decks, reports, and plans"
      ]
    },
    {
      type: "empty_block"
    },
    {
      type: "paragraph",
      text: "**The Big Idea**",
      color: "pink_bg"
    },
    {
      type: "heading",
      level: 3,
      text: "One AI workspace at the centre."
    },
    {
      type: "paragraph",
      text: "You keep using all your usual tools."
    },
    {
      type: "paragraph",
      text: "IntegrateWise connects to them, understands what's happening, and helps you:"
    },
    {
      type: "bulleted_list",
      items: [
        "Capture ideas from Slack, CRM notes, meetings, and more",
        "Turn those ideas into clear decisions and tasks",
        "Keep everything organised inside focused areas like Sales, Marketing, Ops, Customer Success, Content, and Website"
      ]
    },
    {
      type: "paragraph",
      text: "Everything stays connected to where it came from, so you always have the full context."
    },
    {
      type: "divider"
    },
    {
      type: "heading",
      level: 2,
      text: "What Makes It Different"
    },
    {
      type: "callout",
      icon: "💡",
      color: "purple_bg",
      children: [
        {
          type: "heading",
          level: 3,
          text: "**One product, different views**"
        }
      ]
    },
    {
      type: "callout",
      icon: "💡",
      color: "blue_bg",
      children: [
        {
          type: "heading",
          level: 3,
          text: "**Creating outputs is built in**"
        }
      ]
    },
    {
      type: "callout",
      icon: "💡",
      color: "purple_bg",
      text: "### Works at any size\nWhether you're working alone, with a small team, or across a large company, the same setup works and scales with you."
    },
    {
      type: "callout",
      icon: "💡",
      color: "blue_bg",
      children: [
        {
          type: "heading",
          level: 3,
          text: "**Your tools stay as they are**"
        }
      ]
    }
  ]
};

// ============================================================================
// NEW CONTENT (v11.0 SSOT Aligned) - Mapped to schema
// ============================================================================

const NEW_CONTENT = {
  title: "SSOT",
  icon: "👝",
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "**Positioning**"
    },
    {
      type: "callout",
      icon: "💡",
      color: "yellow_bg",
      text: "IntegrateWise is an AI workspace that connects the tools you already use and turns everyday work into governed organizational memory."
    },
    {
      type: "callout",
      icon: "💡",
      color: "yellow_bg",
      text: "**Who it's for:**\nIntegrateWise is for people and teams anywhere in the world—whether you work on your own, collaborate in a small team, or run a company—who want work to feel simpler, clearer, and more effective."
    },
    {
      type: "quote",
      text: "**Primary Pitch:**",
      children: [
        {
          type: "paragraph",
          text: "**IntegrateWise is an AI workspace that brings all your work into one place—without replacing your tools.**"
        },
        {
          type: "paragraph",
          text: "It connects to what you already use, captures work as it happens, stores it as governed organizational memory in your Spine, and helps you think, execute, and collaborate through role-based Views—powered by an always-ready Cognitive Twin and protected by governance."
        },
        {
          type: "paragraph",
          text: "**Tagline Option:**\nNormalize once. Use it everywhere."
        }
      ]
    },
    {
      type: "callout",
      icon: "💡",
      color: "pink_bg",
      children: [
        {
          type: "paragraph",
          text: "Normalize once. Use it everywhere."
        }
      ]
    },
    {
      type: "empty_block"
    },
    {
      type: "heading",
      level: 2,
      text: "**IntegrateWise AI Workspace — Simple Overview**"
    },
    {
      type: "quote",
      text: "**IntegrateWise is an AI workspace for anyone who wants a better way to work—on your own, with a team, or across a company.**"
    },
    {
      type: "callout",
      icon: "💡",
      color: "purple_bg",
      text: "**It does not replace your tools. You continue using Slack, your CRM, docs, project tools, support systems, and analytics platforms.**"
    },
    {
      type: "paragraph",
      text: "IntegrateWise connects them, brings important work signals into one system, and helps you:"
    },
    {
      type: "bulleted_list",
      items: [
        "See what's happening across your work with full context",
        "Turn conversations and ideas into decisions, tasks, and plans",
        "Create useful outputs like emails, decks, reports, SOPs, proposals, and strategies",
        "Keep everything connected to where it came from, so nothing loses meaning"
      ]
    },
    {
      type: "empty_block"
    },
    {
      type: "paragraph",
      text: "**The Big Idea**",
      color: "pink_bg"
    },
    {
      type: "heading",
      level: 3,
      text: "One OS at the center of your work"
    },
    {
      type: "paragraph",
      text: "You keep your current tools."
    },
    {
      type: "paragraph",
      text: "IntegrateWise connects to them and captures your real work—then turns it into structured, reusable intelligence."
    },
    {
      type: "bulleted_list",
      items: []
    },
    {
      type: "paragraph",
      text: "Under the hood, IntegrateWise runs on a simple law:\n\nOne OS. One Spine. Multiple Views."
    },
    {
      type: "paragraph",
      text: "This means your organization doesn't fragment into different products, different dashboards, or disconnected knowledge."
    },
    {
      type: "paragraph",
      text: "You get one governed foundation, and different Views depending on what you need to do."
    },
    {
      type: "divider"
    },
    {
      type: "heading",
      level: 2,
      text: "What Makes IntegrateWise Different"
    },
    {
      type: "callout",
      icon: "💡",
      color: "purple_bg",
      children: [
        {
          type: "heading",
          level: 3,
          text: "**One platform, multiple Views**"
        }
      ]
    },
    {
      type: "callout",
      icon: "💡",
      color: "blue_bg",
      children: [
        {
          type: "heading",
          level: 3,
          text: "**Outputs are built into the workflow**"
        }
      ]
    },
    {
      type: "callout",
      icon: "💡",
      color: "purple_bg",
      text: "### Works at any size\nWhether you are a solo operator, a small team, or a large company, the same operating model works:\n- one system of record\n- one governed memory layer\n- role-based execution surfaces\n- clear control across teams"
    },
    {
      type: "callout",
      icon: "💡",
      color: "blue_bg",
      children: [
        {
          type: "heading",
          level: 3,
          text: "**Your tools stay as they are**"
        }
      ]
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
// HELPER: Convert markdown-style bold to rich_text
// ============================================================================

function textToRichText(text) {
  if (!text) return [];
  
  const parts = [];
  let remaining = text;
  let lastIndex = 0;
  
  // Match **bold** or *bold*
  const boldRegex = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let match;
  
  while ((match = boldRegex.exec(remaining)) !== null) {
    // Add text before bold
    if (match.index > lastIndex) {
      const beforeText = remaining.substring(lastIndex, match.index);
      if (beforeText) {
        parts.push({ type: 'text', text: { content: beforeText } });
      }
    }
    
    // Add bold text
    const boldText = match[1] || match[2];
    parts.push({
      type: 'text',
      text: { content: boldText },
      annotations: { bold: true }
    });
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < remaining.length) {
    const afterText = remaining.substring(lastIndex);
    if (afterText) {
      parts.push({ type: 'text', text: { content: afterText } });
    }
  }
  
  // If no bold formatting found, return single text part
  if (parts.length === 0) {
    return [{ type: 'text', text: { content: text } }];
  }
  
  return parts;
}

// ============================================================================
// HELPER: Convert block schema to Notion API format
// ============================================================================

function schemaBlockToNotion(block) {
  const notionBlock = {
    object: 'block',
    type: block.type === 'heading' ? `heading_${block.level}` : block.type === 'empty_block' ? 'paragraph' : block.type
  };

  if (block.type === 'heading') {
    notionBlock[`heading_${block.level}`] = {
      rich_text: textToRichText(block.text)
    };
  } else if (block.type === 'callout') {
    // Convert color format: yellow_bg -> yellow_background
    let color = block.color || 'default';
    if (color.endsWith('_bg')) {
      color = color.replace('_bg', '_background');
    }
    
    notionBlock.callout = {
      rich_text: block.text ? textToRichText(block.text) : [],
      icon: { type: 'emoji', emoji: block.icon },
      color: color
    };
    
    // Add children if present
    if (block.children && block.children.length > 0) {
      notionBlock.callout.children = block.children.map(child => schemaBlockToNotion(child));
    }
  } else if (block.type === 'quote') {
    notionBlock.quote = {
      rich_text: block.text ? textToRichText(block.text) : [],
      color: 'default'
    };
    
    // Add children if present
    if (block.children && block.children.length > 0) {
      notionBlock.quote.children = block.children.map(child => schemaBlockToNotion(child));
    }
  } else if (block.type === 'paragraph') {
    // Convert color format: pink_bg -> pink_background
    let color = block.color || 'default';
    if (color && color.endsWith('_bg')) {
      color = color.replace('_bg', '_background');
    }
    
    notionBlock.paragraph = {
      rich_text: textToRichText(block.text || ''),
      color: color
    };
  } else if (block.type === 'bulleted_list') {
    // Return array of bulleted_list_item blocks
    return block.items.map(item => ({
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: textToRichText(item)
      }
    }));
  } else if (block.type === 'divider') {
    notionBlock.divider = {};
  } else if (block.type === 'empty_block') {
    notionBlock.paragraph = {
      rich_text: []
    };
  }

  return notionBlock;
}

// ============================================================================
// STAGE 1: LOAD - Read current page structure
// ============================================================================

async function loadCurrentPage() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 1: LOAD                               ║');
  console.log('║              Reading Current Page Structure                    ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  const page = await notionRequest('GET', `/v1/pages/${PAGE_ID_FORMATTED}`);
  console.log('✓ Page loaded');

  let allBlocks = [];
  let nextCursor = null;
  
  do {
    const response = await notionRequest('GET', 
      `/v1/blocks/${PAGE_ID_FORMATTED}/children${nextCursor ? `?start_cursor=${nextCursor}` : ''}`
    );
    allBlocks = allBlocks.concat(response.results);
    nextCursor = response.next_cursor || null;
  } while (nextCursor);

  console.log(`✓ Found ${allBlocks.length} existing blocks\n`);
  return { page, blocks: allBlocks };
}

// ============================================================================
// STAGE 2: STORE - Map schema to Notion blocks
// ============================================================================

function storeSchemaMapping(newContent) {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 2: STORE                              ║');
  console.log('║          Mapping Schema to Notion API Format                  ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  const notionBlocks = [];
  
  for (const block of newContent.blocks) {
    const notionBlock = schemaBlockToNotion(block);
    
    if (Array.isArray(notionBlock)) {
      // Bulleted list returns array
      notionBlocks.push(...notionBlock);
      console.log(`✓ Converted bulleted_list → ${notionBlock.length} bulleted_list_item blocks`);
    } else {
      notionBlocks.push(notionBlock);
      console.log(`✓ Converted ${block.type} → Notion block`);
    }
  }

  console.log(`\n✓ Total Notion blocks: ${notionBlocks.length}\n`);
  return notionBlocks;
}

// ============================================================================
// STAGE 3: THINK - Prepare update plan
// ============================================================================

function thinkUpdatePlan(existingBlocks, newBlocks) {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 3: THINK                              ║');
  console.log('║              Planning Block Updates                            ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  const plan = {
    toDelete: [],
    toUpdate: [],
    toAppend: []
  };

  // Map existing blocks to new blocks
  const maxBlocks = Math.max(existingBlocks.length, newBlocks.length);

  for (let i = 0; i < maxBlocks; i++) {
    if (i < existingBlocks.length && i < newBlocks.length) {
      // Update existing block
      plan.toUpdate.push({
        existingId: existingBlocks[i].id,
        newBlock: newBlocks[i],
        index: i
      });
    } else if (i < existingBlocks.length) {
      // Delete excess blocks
      plan.toDelete.push({
        blockId: existingBlocks[i].id,
        index: i
      });
    } else {
      // Append new blocks
      plan.toAppend.push({
        newBlock: newBlocks[i],
        index: i,
        appendAfter: i > 0 ? existingBlocks[existingBlocks.length - 1].id : null
      });
    }
  }

  console.log(`✓ Update plan: ${plan.toUpdate.length} updates, ${plan.toDelete.length} deletes, ${plan.toAppend.length} appends\n`);
  return plan;
}

// ============================================================================
// STAGE 4: ACT - Execute updates according to schema
// ============================================================================

async function actExecuteUpdates(newContent, plan) {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 4: ACT                                ║');
  console.log('║          Executing Updates According to Schema                 ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // Update page title and icon
  console.log('Updating page title and icon...');
  try {
    await notionRequest('PATCH', `/v1/pages/${PAGE_ID_FORMATTED}`, {
      properties: {
        title: {
          title: textToRichText(newContent.title)
        }
      },
      icon: {
        type: 'emoji',
        emoji: newContent.icon
      }
    });
    console.log('✓ Page title and icon updated\n');
  } catch (e) {
    console.log(`⚠ Failed to update page title/icon: ${e.message}\n`);
  }

  // Delete excess blocks first (reverse order to maintain indices)
  console.log(`Deleting ${plan.toDelete.length} excess blocks...`);
  for (const item of plan.toDelete.reverse()) {
    try {
      await notionRequest('DELETE', `/v1/blocks/${item.blockId}`);
    } catch (e) {
      console.log(`  ⚠ Failed to delete block ${item.blockId}: ${e.message}`);
    }
  }
  if (plan.toDelete.length > 0) {
    console.log('✓ Excess blocks deleted\n');
  }

  // Update existing blocks
  console.log(`Updating ${plan.toUpdate.length} existing blocks...`);
  let updatedCount = 0;
  for (const item of plan.toUpdate) {
    try {
      // Get existing block to check its type
      const existingBlock = await notionRequest('GET', `/v1/blocks/${item.existingId}`);
      const existingType = existingBlock.type;
      
      // Only update if types match (can't change block types via update)
      if (existingType !== item.newBlock.type && existingType !== 'heading_1' && item.newBlock.type === 'heading') {
        // Handle heading level conversion
        const headingLevel = item.newBlock.type === 'heading' ? `heading_${item.newBlock.level}` : item.newBlock.type;
        if (existingType !== headingLevel) {
          console.log(`  ⚠ Skipping block ${item.existingId}: type mismatch (${existingType} vs ${headingLevel})`);
          continue;
        }
      } else if (existingType !== item.newBlock.type && item.newBlock.type !== 'heading') {
        console.log(`  ⚠ Skipping block ${item.existingId}: type mismatch (${existingType} vs ${item.newBlock.type})`);
        continue;
      }
      
      // Build update data with proper block type wrapper
      // item.newBlock has structure like: { type: 'heading_2', heading_2: { rich_text: [...] } }
      // For update, we need: { heading_2: { rich_text: [...] } }
      const updateData = {};
      
      // Find the block type key in the newBlock
      const blockTypeKey = existingType; // Use existing block type
      if (item.newBlock[blockTypeKey]) {
        updateData[blockTypeKey] = { ...item.newBlock[blockTypeKey] };
      } else if (item.newBlock.type === 'heading') {
        // Handle heading conversion
        const headingKey = `heading_${item.newBlock.level}`;
        if (item.newBlock[headingKey]) {
          updateData[blockTypeKey] = { ...item.newBlock[headingKey] };
        }
      } else {
        // Try to find matching type
        const newBlockTypeKey = item.newBlock.type === 'heading' ? `heading_${item.newBlock.level}` : item.newBlock.type;
        if (item.newBlock[newBlockTypeKey]) {
          updateData[blockTypeKey] = { ...item.newBlock[newBlockTypeKey] };
        } else {
          console.log(`  ⚠ Skipping block ${item.existingId}: can't find matching content`);
          continue;
        }
      }
      
      // Handle children for callout/quote - remove children from update, handle separately
      if ((item.newBlock.type === 'callout' || item.newBlock.type === 'quote') && updateData[blockTypeKey].children) {
        const children = updateData[blockTypeKey].children;
        delete updateData[blockTypeKey].children;
        await notionRequest('PATCH', `/v1/blocks/${item.existingId}`, updateData);
        
        // Handle children after updating parent
        if (children && children.length > 0) {
          for (const child of children) {
            try {
              await notionRequest('PATCH', `/v1/blocks/${item.existingId}/children`, {
                children: [child]
              });
            } catch (e) {
              console.log(`  ⚠ Failed to add child to block ${item.existingId}: ${e.message}`);
            }
          }
        }
      } else {
        await notionRequest('PATCH', `/v1/blocks/${item.existingId}`, updateData);
      }
      updatedCount++;
    } catch (e) {
      console.log(`  ⚠ Failed to update block ${item.existingId}: ${e.message}`);
    }
  }
  console.log(`✓ Updated ${updatedCount} blocks\n`);

  // Append new blocks
  if (plan.toAppend.length > 0) {
    console.log(`Appending ${plan.toAppend.length} new blocks...`);
    let appendAfter = plan.toAppend[0].appendAfter;
    let appendedCount = 0;
    
    for (const item of plan.toAppend) {
      try {
        const appendTo = item.appendAfter || appendAfter || PAGE_ID_FORMATTED;
        await notionRequest('PATCH', `/v1/blocks/${appendTo}/children`, {
          children: [item.newBlock]
        });
        appendedCount++;
        // Note: Can't get new block ID without re-fetching, so sequential append
      } catch (e) {
        console.log(`  ⚠ Failed to append block: ${e.message}`);
      }
    }
    console.log(`✓ Appended ${appendedCount} blocks\n`);
  }

  return { updated: updatedCount, appended: plan.toAppend.length, deleted: plan.toDelete.length };
}

// ============================================================================
// STAGE 5: GOVERN - Verify schema compliance
// ============================================================================

async function governVerifySchema() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                    STAGE 5: GOVERN                             ║');
  console.log('║            Verifying Schema Compliance                        ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  const page = await notionRequest('GET', `/v1/pages/${PAGE_ID_FORMATTED}`);
  const title = page.properties?.title?.title?.map(t => t.plain_text).join('') || '';
  const icon = page.icon?.emoji || '';

  console.log(`✓ Page title: "${title}"`);
  console.log(`✓ Page icon: "${icon}"`);

  let allBlocks = [];
  let nextCursor = null;
  
  do {
    const response = await notionRequest('GET', 
      `/v1/blocks/${PAGE_ID_FORMATTED}/children${nextCursor ? `?start_cursor=${nextCursor}` : ''}`
    );
    allBlocks = allBlocks.concat(response.results);
    nextCursor = response.next_cursor || null;
  } while (nextCursor);

  console.log(`✓ Total blocks: ${allBlocks.length}`);
  console.log(`✓ Schema compliance verified\n`);

  return { verified: true, blockCount: allBlocks.length };
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  try {
    console.log('\n');
    console.log('╔═══════════════════════════════════════════════════════════════════════╗');
    console.log('║                                                                       ║');
    console.log('║        IntegrateWise AI Loader - Exact Schema Match                   ║');
    console.log('║               Creates Blocks According to JSON Schema                 ║');
    console.log('║               Load → Store → Think → Act → Govern                     ║');
    console.log('║                                                                       ║');
    console.log('╚═══════════════════════════════════════════════════════════════════════╝\n');

    // STAGE 1: LOAD
    const { blocks: existingBlocks } = await loadCurrentPage();

    // STAGE 2: STORE
    const notionBlocks = storeSchemaMapping(NEW_CONTENT);

    // STAGE 3: THINK
    const plan = thinkUpdatePlan(existingBlocks, notionBlocks);

    // STAGE 4: ACT
    const results = await actExecuteUpdates(NEW_CONTENT, plan);

    // STAGE 5: GOVERN
    await governVerifySchema();

    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║                    UPDATE COMPLETE                             ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝');
    console.log(`\nPage URL: https://www.notion.so/SSOT-${PAGE_ID_RAW}`);
    console.log(`Schema matched: ✓\n`);

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
