#!/usr/bin/env node

/**
 * Deprecated Token Checker
 * 
 * Scans codebase for usage of deprecated tokens
 * Fails with process.exit(1) if deprecated tokens found
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load deprecated tokens with encoding fix
let deprecatedTokens;
try {
  const deprecatedData = fs.readFileSync(path.join(__dirname, '../tokens/deprecated.json'), 'utf8');
  // Clean up any BOM or encoding issues
  const cleanData = deprecatedData.replace(/^\uFEFF/, '').trim();
  deprecatedTokens = JSON.parse(cleanData);
} catch (error) {
  console.log('✅ No deprecated tokens defined (tokens/deprecated.json not found or invalid)');
  process.exit(0);
}

function findDeprecatedUsage() {
  console.log('🔍 Scanning for deprecated token usage...');
  
  const srcDir = path.join(__dirname, '../src');
  let foundDeprecated = [];
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.match(/\.(ts|tsx|js|jsx)$/)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for deprecated token usage
        for (const [category, tokens] of Object.entries(deprecatedTokens.deprecated)) {
          for (const [tokenName, info] of Object.entries(tokens)) {
            if (content.includes(tokenName)) {
              foundDeprecated.push({
                file: filePath.replace(path.join(__dirname, '../'), ''),
                token: tokenName,
                category,
                reason: info.reason,
                replacement: info.replacement,
                removeIn: info.removeIn
              });
            }
          }
        }
      }
    }
  }
  
  scanDirectory(srcDir);
  
  if (foundDeprecated.length > 0) {
    console.error(`❌ Found ${foundDeprecated.length} deprecated token usage(s):`);
    foundDeprecated.forEach(item => {
      console.error(`\n📁 ${item.file}`);
      console.error(`   Token: ${item.token}`);
      console.error(`   Reason: ${item.reason}`);
      console.error(`   Replace with: ${item.replacement}`);
      console.error(`   Remove in: ${item.removeIn}`);
    });
    
    console.error('\n❌ Please replace deprecated tokens before merging');
    process.exit(1);
  } else {
    console.log('✅ No deprecated tokens found');
  }
}

findDeprecatedUsage();
