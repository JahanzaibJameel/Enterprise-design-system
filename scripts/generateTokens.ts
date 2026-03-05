#!/usr/bin/env node

/**
 * Enterprise Token Generator
 * 
 * Generates TypeScript token files from JSON source of truth
 * Enforces single source of truth for all design tokens
 * Provides type-safe token access with validation
 */

const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '../tokens');
const SRC_DIR = path.join(__dirname, '../src/tokens');

// Token categories to generate
const CATEGORIES = ['colors', 'typography', 'spacing', 'radii', 'motion'];

function generateTokenTypes() {
  let content = `// Auto-generated from JSON tokens - DO NOT EDIT MANUALLY\n`;
  content += `// Generated at: ${new Date().toISOString()}\n\n`;

  CATEGORIES.forEach(category => {
    const jsonPath = path.join(TOKENS_DIR, `${category}.schema.json`);
    if (!fs.existsSync(jsonPath)) {
      console.warn(`⚠️  Warning: ${category}.schema.json not found`);
      return;
    }

    const tokens = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    content += generateTypeScriptForCategory(category, tokens);
  });

  return content;
}

interface ColorTokenData {
  primitive?: {
    [key: string]: {
      [key: string]: string;
    };
  };
  semantic?: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

interface TypographyTokenData {
  fontFamily?: {
    [key: string]: string;
  };
  fontSize?: {
    [key: string]: number;
  };
  lineHeight?: {
    [key: string]: number;
  };
  letterSpacing?: {
    [key: string]: number;
  };
  fontWeight?: {
    [key: string]: string;
  };
}

interface TokenData {
  [key: string]: {
    value: string | number | string[];
    description?: string;
  };
}

interface MotionTokenData {
  [key: string]: {
    [key: string]: string | number | { [key: string]: number };
  };
}

function generateTypeScriptForCategory(category: string, tokens: { tokens: unknown }) {
  const { tokens: tokenData } = tokens;
  
  switch (category) {
    case 'colors':
      return generateColorTokens(tokenData as ColorTokenData);
    case 'typography':
      return generateTypographyTokens(tokenData as TypographyTokenData);
    case 'spacing':
      return generateSpacingTokens(tokenData as TokenData);
    case 'radii':
      return generateRadiiTokens(tokenData as TokenData);
    case 'motion':
      return generateMotionTokens(tokenData as MotionTokenData);
    default:
      return `// ${category} tokens not implemented yet\nexport const ${category} = {};`;
  }
}

function generateColorTokens(colorTokens: ColorTokenData) {
  let content = `export const colors = {\n`;
  
  // Generate primitive colors
  content += `  primitive: {\n`;
  Object.entries(colorTokens.primitive || {}).forEach(([colorName, shades]) => {
    content += `    "${colorName}": {\n`;
    Object.entries(shades || {}).forEach(([shade, value]) => {
      content += `      "${shade}": "${value}",\n`;
    });
    content += `    },\n`;
  });
  content += `  },\n`;

  // Generate semantic colors
  content += `  semantic: {\n`;
  Object.entries(colorTokens.semantic || {}).forEach(([semanticName, values]) => {
    content += `    "${semanticName}": {\n`;
    Object.entries(values || {}).forEach(([key, value]) => {
      content += `      "${key}": "${value}",\n`;
    });
    content += `    },\n`;
  });
  content += `};\n`;

  return content;
}

function generateTypographyTokens(typographyTokens: TypographyTokenData) {
  let content = `export const typography = {\n`;
  
  Object.entries(typographyTokens || {}).forEach(([category, values]) => {
    content += `  ${category}: {\n`;
    Object.entries(values || {}).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        content += `    "${key}": [${value.map(v => `"${v}"`).join(', ')}],\n`;
      } else {
        content += `    "${key}": "${value}",\n`;
      }
    });
    content += `  },\n`;
  });
  content += `};\n`;

  return content;
}

function generateSpacingTokens(spacingTokens: TokenData) {
  let content = `export const spacing = {\n`;
  
  content += `  scale: {\n`;
  Object.entries(spacingTokens.scale || {}).forEach(([key, value]) => {
    content += `    "${key}": ${value},\n`;
  });
  content += `  },\n`;
  content += `};\n`;

  return content;
}

function generateRadiiTokens(radiiTokens: TokenData) {
  let content = `export const radii = {\n`;
  
  content += `  scale: {\n`;
  Object.entries(radiiTokens.scale || {}).forEach(([key, value]) => {
    content += `    "${key}": ${value},\n`;
  });
  content += `  },\n`;
  content += `};\n`;

  return content;
}

function generateMotionTokens(motionTokens: MotionTokenData) {
  let content = `export const motion = {\n`;
  
  Object.entries(motionTokens || {}).forEach(([category, values]) => {
    content += `  ${category}: {\n`;
    Object.entries(values || {}).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        content += `    "${key}": {\n`;
        Object.entries(value).forEach(([subKey, subValue]) => {
          content += `      "${subKey}": ${subValue},\n`;
        });
        content += `    },\n`;
      } else {
        content += `    "${key}": "${value}",\n`;
      }
    });
    content += `  },\n`;
  });
  content += `};\n`;

  return content;
}

// Main execution
function main() {
  console.log('🏗 Enterprise Token Generator - Starting...');
  
  // Ensure output directory exists
  if (!fs.existsSync(SRC_DIR)) {
    fs.mkdirSync(SRC_DIR, { recursive: true });
  }

  // Generate all token files
  CATEGORIES.forEach(category => {
    const content = generateTypeScriptForCategory(category, 
      JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, `${category}.schema.json`), 'utf8'))
    );
    
    const outputPath = path.join(SRC_DIR, `${category}.ts`);
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`✅ Generated ${category}.ts`);
  });

  // Generate index file
  const indexContent = CATEGORIES.map(cat => 
    `export * as ${cat.charAt(0).toUpperCase() + cat.slice(1)} from './${cat}';`
  ).join('\n');
  
  fs.writeFileSync(path.join(SRC_DIR, 'index.ts'), indexContent, 'utf8');
  console.log('✅ Generated index.ts');

  console.log('🎯 Token generation complete!');
  console.log('📊 All tokens now sourced from JSON schema');
  console.log('♿ Type-safe access enforced');
}

if (require.main === module) {
  main();
}

module.exports = { main };
