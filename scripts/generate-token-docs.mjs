#!/usr/bin/env node

/**
 * Token Documentation Generator
 * 
 * Auto-generates markdown documentation from JSON tokens
 * Creates comprehensive token reference for developers
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load token files
const colors = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/colors.json'), 'utf8'));
const typography = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/typography.json'), 'utf8'));
const spacing = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/spacing.json'), 'utf8'));
const radii = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/radii.json'), 'utf8'));
const motion = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/motion.json'), 'utf8'));

function generateTokenDocs() {
  console.log('📚 Generating token documentation...');
  
  let content = `# Design Tokens Documentation

> Auto-generated on ${new Date().toISOString()}

## Overview

This document contains all design tokens used in the Advanced Design System 2026.

## 🎨 Colors

### Primitive Colors
`;

  // Generate color documentation
  if (colors.colors?.primitive) {
    for (const [colorName, shades] of Object.entries(colors.colors.primitive)) {
      content += `\n#### ${colorName.charAt(0).toUpperCase() + colorName.slice(1)}\n\n`;
      content += `| Shade | Value | Usage |\n`;
      content += `|-------|-------|-------|\n`;
      
      for (const [shade, value] of Object.entries(shades)) {
        content += `| ${shade} | \`${value}\` | Base color |\n`;
      }
    }
  }

  content += `\n### Semantic Colors\n\n`;
  content += `Semantic colors map to primitive colors and provide contextual meaning.\n\n`;
  content += `| Token | Value | Purpose |\n`;
  content += `|-------|-------|---------|\n`;
  
  if (colors.colors?.semantic) {
    function traverseSemantic(obj, prefix = '') {
      for (const [key, value] of Object.entries(obj)) {
        const tokenName = prefix ? `${prefix}.${key}` : key;
        
        if (typeof value === 'object' && value !== null) {
          traverseSemantic(value, tokenName);
        } else {
          content += `| \`${tokenName}\` | \`${value}\` | Semantic color |\n`;
        }
      }
    }
    
    traverseSemantic(colors.colors.semantic);
  }

  content += `\n## 📝 Typography\n\n`;
  
  // Generate typography documentation
  if (typography.typography) {
    for (const [category, values] of Object.entries(typography.typography)) {
      content += `### ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;
      content += `| Token | Value |\n`;
      content += `|-------|-------|\n`;
      
      for (const [key, value] of Object.entries(values)) {
        content += `| \`${key}\` | \`${value}\` |\n`;
      }
      content += `\n`;
    }
  }

  content += `## 📏 Spacing\n\n`;
  content += `| Token | Value | Usage |\n`;
  content += `|-------|-------|-------|\n`;
  
  if (spacing.spacing) {
    for (const [key, value] of Object.entries(spacing.spacing)) {
      content += `| \`${key}\` | \`${value}px\` | Spacing token |\n`;
    }
  }

  content += `\n## 🔄 Radii\n\n`;
  content += `| Token | Value | Usage |\n`;
  content += `|-------|-------|-------|\n`;
  
  if (radii.radii) {
    for (const [key, value] of Object.entries(radii.radii)) {
      content += `| \`${key}\` | \`${value}px\` | Border radius |\n`;
    }
  }

  content += `\n## 🎬 Motion\n\n`;
  
  if (motion.motion) {
    for (const [category, values] of Object.entries(motion.motion)) {
      content += `### ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;
      content += `| Token | Value |\n`;
      content += `|-------|-------|\n`;
      
      for (const [key, value] of Object.entries(values)) {
        content += `| \`${key}\` | \`${JSON.stringify(value)}\` |\n`;
      }
      content += `\n`;
    }
  }

  content += `\n## 🚨 Deprecated Tokens\n\n`;
  
  try {
    const deprecated = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/deprecated.json'), 'utf8'));
    
    if (deprecated.deprecated) {
      content += `The following tokens are deprecated and should not be used in new code.\n\n`;
      content += `| Token | Reason | Replacement | Remove In |\n`;
      content += `|-------|--------|-------------|-----------|\n`;
      
      function traverseDeprecated(obj, category = '') {
        for (const [tokenName, info] of Object.entries(obj)) {
          if (typeof info === 'object' && info.reason) {
            content += `| \`${category}.${tokenName}\` | ${info.reason} | \`${info.replacement}\` | ${info.removeIn} |\n`;
          } else if (typeof info === 'object') {
            traverseDeprecated(info, category ? `${category}.${tokenName}` : tokenName);
          }
        }
      }
      
      traverseDeprecated(deprecated.deprecated);
    }
  } catch (error) {
    content += `No deprecated tokens defined.\n`;
  }

  content += `\n## 📖 Usage Guidelines\n\n`;
  content += `1. **Always use semantic tokens** over primitive tokens in components\n`;
  content += `2. **Never hardcode values** - always reference tokens\n`;
  content += `3. **Check deprecation warnings** before using tokens\n`;
  content += `4. **Run token validation** before committing changes\n\n`;
  
  content += `---\n`;
  content += `*This documentation is automatically generated. Do not edit manually.*\n`;

  // Write documentation
  const docsDir = path.join(__dirname, '../docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir);
  }
  
  fs.writeFileSync(path.join(docsDir, 'tokens.md'), content);
  console.log('✅ Token documentation generated at docs/tokens.md');
}

generateTokenDocs();
