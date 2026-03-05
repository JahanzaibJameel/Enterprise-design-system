// Auto-generated from JSON tokens - DO NOT EDIT MANUALLY
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['.', './app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...require('./tokens/colors.json').colors.primitive,
        ...require('./tokens/colors.json').colors.semantic
      },
      fontFamily: require('./tokens/typography.json').typography.fontFamily,
      fontSize: require('./tokens/typography.json').typography.fontSize,
      spacing: require('./tokens/spacing.json').spacing,
      borderRadius: require('./tokens/radii.json').radii,
      transitionDuration: require('./tokens/motion.json').motion.duration,
      transitionTimingFunction: require('./tokens/motion.json').motion.easing
    }
  }
};

export default config;
