#!/usr/bin/env node

const https = require('https');

const PAGE_ID_RAW = '2dc94775d1b680a2b793dc16564d292a';
const formatPageId = (id) => {
  if (id.includes('-')) return id;
  return `${id.slice(0,8)}-${id.slice(8,12)}-${id.slice(12,16)}-${id.slice(16,20)}-${id.slice(20,32)}`;
};
const PAGE_ID_FORMATTED = formatPageId(PAGE_ID_RAW);

// Try multiple potential auth sources
const NOTION_API_KEY = process.env.NOTION_API_KEY || process.env.NOTION_TOKEN || process.env.MCP_NOTION_TOKEN;

function testAccess() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: `/v1/pages/${PAGE_ID_FORMATTED}`,
      method: 'GET',
      headers: {
        'Authorization': NOTION_API_KEY ? `Bearer ${NOTION_API_KEY}` : 'Bearer test',
        'Notion-Version': '2022-06-28',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

testAccess()
  .then(result => {
    console.log(`Status Code: ${result.statusCode}`);
    try {
      const parsed = JSON.parse(result.body);
      if (result.statusCode === 200) {
        console.log('✓ Successfully accessed Notion page!');
        console.log(`Page Title: ${JSON.stringify(parsed.properties?.title || parsed.properties?.['Name'] || 'Untitled')}`);
      } else {
        console.log('Response:', JSON.stringify(parsed, null, 2));
      }
    } catch (e) {
      console.log('Response body:', result.body.substring(0, 500));
    }
  })
  .catch(err => {
    console.error('Error:', err.message);
  });
