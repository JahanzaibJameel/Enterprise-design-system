const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    rules: {
      // Enterprise: Block hardcoded hex colors
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/^#[0-9A-Fa-f]{3,6}$/]',
          message: '❌ Hardcoded hex colors are forbidden. Use theme.colors.* instead.'
        },
        {
          selector: 'Literal[value=/^rgba?\\([0-9,\\s\\.]+\\)$/]',
          message: '❌ Hardcoded rgba/rgb colors are forbidden. Use theme.colors.* instead.'
        }
      ],
      
      // Enterprise: Enforce strict typing
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      
      // Enterprise: Performance rules
      'react-hooks/exhaustive-deps': 'error',
      'react/jsx-no-useless-fragment': 'error'
    }
  }
]);
