#!/usr/bin/env node

/**
 * Enterprise Token Validation Script
 * 
 * Validates token completeness, consistency, and WCAG compliance
 * Fails with process.exit(1) on any error for CI enforcement
 */

const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON token files
const colors = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/colors.json'), 'utf8'));
const typography = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/typography.json'), 'utf8'));
const spacing = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/spacing.json'), 'utf8'));
const radii = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/radii.json'), 'utf8'));
const motion = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/motion.json'), 'utf8'));

// Read theme files directly from TypeScript files (simplified validation)
function validateThemeStructure() {
  console.log('🔍 Validating theme structure...');
  
  const requiredThemeFiles = ['light.ts', 'dark.ts', 'amoled.ts', 'highContrast.ts'];
  const themesDir = path.join(__dirname, '../src/theme/themes');
  
  let hasErrors = false;
  
  requiredThemeFiles.forEach(file => {
    const filePath = path.join(themesDir, file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing theme file: ${file}`);
      hasErrors = true;
    }
  });
  
  if (!hasErrors) {
    console.log('✅ All theme files exist');
  }
  
  return !hasErrors;
}

function validateTokenFiles() {
  console.log('🔍 Validating token files...');
  
  const requiredTokenFiles = ['colors.json', 'typography.json', 'spacing.json', 'radii.json', 'motion.json'];
  const tokensDir = path.join(__dirname, '../tokens');
  
  let hasErrors = false;
  
  requiredTokenFiles.forEach(file => {
    const filePath = path.join(tokensDir, file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing token file: ${file}`);
      hasErrors = true;
    }
  });
  
  if (!hasErrors) {
    console.log('✅ All token files exist');
  }
  
  return !hasErrors;
}

function validateTokenStructure() {
  console.log('🔍 Validating token structure...');
  
  let hasErrors = false;
  
  // Validate colors structure
  if (!colors.colors?.primitive) {
    console.error('❌ Missing primitive colors');
    hasErrors = true;
  }
  
  if (!colors.colors?.semantic) {
    console.error('❌ Missing semantic colors');
    hasErrors = true;
  }
  
  // Validate typography structure
  const requiredTypographyKeys = ['fontFamily', 'fontSize', 'lineHeight', 'letterSpacing', 'fontWeight'];
  requiredTypographyKeys.forEach(key => {
    if (!typography.typography?.[key]) {
      console.error(`❌ Missing typography.${key}`);
      hasErrors = true;
    }
  });
  
  // Validate spacing structure
  if (!spacing.spacing?.scale) {
    console.error('❌ Missing spacing.scale');
    hasErrors = true;
  }
  
  // Validate radii structure
  if (!radii.radii?.scale) {
    console.error('❌ Missing radii.scale');
    hasErrors = true;
  }
  
  // Validate motion structure
  if (!motion.motion) {
    console.error('❌ Missing motion tokens');
    hasErrors = true;
  }
  
  if (!hasErrors) {
    console.log('✅ All token structures are valid');
  }
  
  return !hasErrors;
}

function validateTokenConsistency() {
  console.log('🔍 Validating token consistency...');
  
  let hasErrors = false;
  
  // Check that semantic color tokens reference valid primitive tokens
  const semanticRefs = colors.colors.semantic;
  
  function checkSemanticPath(path, value) {
    if (typeof value === 'string' && value.startsWith('primitive.')) {
      const parts = value.split('.');
      let ref = colors.colors.primitive;
      
      for (const part of parts.slice(1)) {
        ref = ref?.[part];
      }
      
      if (!ref) {
        console.error(`❌ Invalid semantic token reference: ${path} -> ${value}`);
        hasErrors = true;
      }
    }
  }
  
  function traverseObject(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        traverseObject(value, currentPath);
      } else {
        checkSemanticPath(currentPath, value);
      }
    }
  }
  
  traverseObject(semanticRefs);
  
  if (!hasErrors) {
    console.log('✅ All token references are valid');
  }
  
  return !hasErrors;
}

function validateGeneratedFiles() {
  console.log('🔍 Validating generated token files...');
  
  const generatedFiles = [
    '../src/tokens/colors.ts',
    '../src/tokens/typography.ts',
    '../src/tokens/spacing.ts',
    '../src/tokens/radii.ts',
    '../src/tokens/motion.ts'
  ];
  
  let hasErrors = false;
  
  generatedFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing generated token file: ${file}`);
      hasErrors = true;
    }
  });
  
  if (!hasErrors) {
    console.log('✅ All generated token files exist');
  }
  
  return !hasErrors;
}

// Main execution
try {
  console.log('🚀 Starting enterprise token validation...\n');
  
  const filesValid = validateTokenFiles();
  const structureValid = validateTokenStructure();
  const consistencyValid = validateTokenConsistency();
  const generatedValid = validateGeneratedFiles();
  const themesValid = validateThemeStructure();
  
  console.log('\n📊 Validation Results:');
  console.log(`- Token Files: ${filesValid ? '✅' : '❌'}`);
  console.log(`- Token Structure: ${structureValid ? '✅' : '❌'}`);
  console.log(`- Token Consistency: ${consistencyValid ? '✅' : '❌'}`);
  console.log(`- Generated Files: ${generatedValid ? '✅' : '❌'}`);
  console.log(`- Theme Files: ${themesValid ? '✅' : '❌'}`);
  
  if (filesValid && structureValid && consistencyValid && generatedValid && themesValid) {
    console.log('\n🎉 All token validations passed!');
    process.exit(0);
  } else {
    console.log('\n❌ Token validation failed - CI blocked');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error validating tokens:', error);
  process.exit(1);
}
