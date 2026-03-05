const fs = require('fs');
const path = require('path');

// Read JSON token files
const colors = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/colors.json'), 'utf8'));
const typography = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/typography.json'), 'utf8'));
const spacing = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/spacing.json'), 'utf8'));
const radii = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/radii.json'), 'utf8'));
const motion = JSON.parse(fs.readFileSync(path.join(__dirname, '../tokens/motion.json'), 'utf8'));

// Helper to resolve token references
function resolveTokens(obj, primitives = null) {
  if (typeof obj === 'string' && obj.startsWith('primitive.')) {
    const parts = obj.split('.');
    let value = primitives || colors.primitive;
    for (const part of parts) {
      value = value[part];
    }
    return value;
  }
  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [key, val] of Object.entries(obj)) {
      result[key] = resolveTokens(val, primitives || colors.primitive);
    }
    return result;
  }
  return obj;
}

// Generate TypeScript files
function generateColorsTS() {
  const resolvedSemantic = {
    brand: {
      primary: colors.colors.primitive.indigo[500],
      secondary: colors.colors.primitive.violet[500],
      accent: colors.colors.primitive.cyan[400],
    },
    status: {
      success: colors.colors.primitive.emerald[500],
      warning: colors.colors.primitive.amber[500],
      error: colors.colors.primitive.rose[500],
      info: colors.colors.primitive.indigo[400],
    },
  };
  
  const ts = `// Auto-generated from colors.json - DO NOT EDIT MANUALLY
export const primitive = ${JSON.stringify(colors.colors.primitive, null, 2)} as const;

export const semantic = ${JSON.stringify(resolvedSemantic, null, 2)} as const;
`;

  fs.writeFileSync(path.join(__dirname, '../src/tokens/colors.ts'), ts);
  console.log('✅ Generated colors.ts');
}

function generateTypographyTS() {
  const ts = `// Auto-generated from typography.json - DO NOT EDIT MANUALLY
export const fontFamily = ${JSON.stringify(typography.typography.fontFamily, null, 2)} as const;

export const fontSize = ${JSON.stringify(typography.typography.fontSize, null, 2)} as const;

export const lineHeight = ${JSON.stringify(typography.typography.lineHeight, null, 2)} as const;

export const letterSpacing = ${JSON.stringify(typography.typography.letterSpacing, null, 2)} as const;

export const fontWeight = ${JSON.stringify(typography.typography.fontWeight, null, 2)} as const;
`;

  fs.writeFileSync(path.join(__dirname, '../src/tokens/typography.ts'), ts);
  console.log('✅ Generated typography.ts');
}

function generateSpacingTS() {
  const ts = `// Auto-generated from spacing.json - DO NOT EDIT MANUALLY
export const spacing = ${JSON.stringify(spacing.spacing, null, 2)} as const;
`;

  fs.writeFileSync(path.join(__dirname, '../src/tokens/spacing.ts'), ts);
  console.log('✅ Generated spacing.ts');
}

function generateRadiiTS() {
  const ts = `// Auto-generated from radii.json - DO NOT EDIT MANUALLY
export const radii = ${JSON.stringify(radii.radii, null, 2)} as const;
`;

  fs.writeFileSync(path.join(__dirname, '../src/tokens/radii.ts'), ts);
  console.log('✅ Generated radii.ts');
}

function generateMotionTS() {
  const ts = `// Auto-generated from motion.json - DO NOT EDIT MANUALLY
export const duration = ${JSON.stringify(motion.motion.duration, null, 2)} as const;

export const easing = ${JSON.stringify(motion.motion.easing, null, 2)} as const;

export const spring = ${JSON.stringify(motion.motion.spring, null, 2)} as const;
`;

  fs.writeFileSync(path.join(__dirname, '../src/tokens/motion.ts'), ts);
  console.log('✅ Generated motion.ts');
}

// Generate Tailwind config
function generateTailwindConfig() {
  const config = {
    content: ['.', './app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        colors: {
          ...colors.primitive,
          ...resolveTokens(colors.semantic, colors.primitive)
        },
        fontFamily: typography.fontFamily,
        fontSize: typography.fontSize,
        spacing: spacing.spacing,
        borderRadius: radii.radii,
        transitionDuration: motion.motion.duration,
        transitionTimingFunction: motion.motion.easing
      }
    }
  };

  const configTS = `// Auto-generated from JSON tokens - DO NOT EDIT MANUALLY
import type { Config } from 'tailwindcss';

const config: Config = ${JSON.stringify(config, null, 2)};

export default config;
`;

  fs.writeFileSync(path.join(__dirname, '../tailwind.config.ts'), configTS);
  console.log('✅ Generated tailwind.config.ts');
}

// Main execution
try {
  generateColorsTS();
  generateTypographyTS();
  generateSpacingTS();
  generateRadiiTS();
  generateMotionTS();
  generateTailwindConfig();
  console.log('🎉 All token files generated successfully!');
} catch (error) {
  console.error('❌ Error generating tokens:', error);
  process.exit(1);
}
