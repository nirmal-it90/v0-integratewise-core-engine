#!/usr/bin/env node

const https = require('https');

const PAGE_ID_RAW = '2dc94775d1b680a2b793dc16564d292a';
const formatPageId = (id) => {
  if (id.includes('-')) return id;
  return `${id.slice(0,8)}-${id.slice(8,12)}-${id.slice(12,16)}-${id.slice(16,20)}-${id.slice(20,32)}`;
};
const PAGE_ID_FORMATTED = formatPageId(PAGE_ID_RAW);

const NOTION_API_KEY = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN;

const NOTION_API_VERSION = '2022-06-28';

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

async function main() {
  try {
    console.log('Reading page structure...\n');
    
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

    console.log(`Total blocks found: ${allBlocks.length}\n`);
    console.log('Block structure:');
    console.log('='.repeat(80));
    
    allBlocks.forEach((block, index) => {
      const blockType = block.type;
      let content = '';
      
      if (blockType === 'paragraph') {
        content = block.paragraph?.rich_text?.map(t => t.plain_text || '').join('') || '(empty)';
      } else if (blockType === 'heading_1') {
        content = block.heading_1?.rich_text?.map(t => t.plain_text || '').join('') || '';
      } else if (blockType === 'heading_2') {
        content = block.heading_2?.rich_text?.map(t => t.plain_text || '').join('') || '';
      } else if (blockType === 'heading_3') {
        content = block.heading_3?.rich_text?.map(t => t.plain_text || '').join('') || '';
      } else if (blockType === 'bulleted_list_item') {
        content = block.bulleted_list_item?.rich_text?.map(t => t.plain_text || '').join('') || '';
      } else if (blockType === 'numbered_list_item') {
        content = block.numbered_list_item?.rich_text?.map(t => t.plain_text || '').join('') || '';
      } else {
        content = `[${blockType}]`;
      }
      
      const preview = content.substring(0, 60).replace(/\n/g, ' ');
      console.log(`${index + 1}. [${blockType}] ${preview}${content.length > 60 ? '...' : ''}`);
      console.log(`   ID: ${block.id}`);
    });

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
