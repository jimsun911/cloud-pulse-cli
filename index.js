#!/usr/bin/env node

/**
 * Cloud-Pulse-CLI
 * Basic latency test script for multi-cloud endpoints.
 */

const http = require('http');
const https = require('https');

const targets = [
  { name: 'Cloudflare DNS', url: 'https://1.1.1.1' },
  { name: 'Google DNS', url: 'https://8.8.8.8' }
];

console.log('🚀 Starting Cloud-Pulse-CLI monitoring...\n');

targets.forEach((target) => {
  const startTime = Date.now();
  const req = https.get(target.url, (res) => {
    const duration = Date.now() - startTime;
    console.log(`[PASS] ${target.name} (${target.url}) - Response Time: ${duration}ms | Status: ${res.statusCode}`);
  });

  req.on('error', (err) => {
    console.error(`[FAIL] ${target.name} (${target.url}) - Error: ${err.message}`);
  });
});
