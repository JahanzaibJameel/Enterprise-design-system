# Contributing to Enterprise Design System

Thank you for your interest in contributing to our Enterprise Design System! This guide will help you get started.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm or yarn
- Git
- Expo CLI (for React Native development)

### Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/Enterprise-design-system.git
   cd Enterprise-design-system
   ```

2. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start Development**
   ```bash
   # For web development
   npm run storybook
   
   # For React Native development
   npm start
   ```

## 📁 Project Structure

```
Enterprise-design-system/
├── src/                    # Source code
│   ├── components/           # React components
│   │   ├── __tests__/      # Component tests
│   │   └── *.stories.tsx   # Storybook stories
│   ├── theme/              # Theme and styling
│   └── tokens/             # Design tokens
├── scripts/                # Build and utility scripts
├── .github/               # GitHub workflows and configs
├── docs/                  # Documentation
└── tests/                 # E2E and integration tests
```

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# E2E tests (Playwright)
npm run test:e2e

# Visual regression tests
npm run test:visual
```

### Writing Tests

- **Unit Tests**: Located in `src/components/__tests__/`
- **Integration Tests**: Located in `tests/integration/`
- **E2E Tests**: Located in `tests/e2e/`

#### Example Component Test

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button label="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });
});
```

## 🎨 Design System Guidelines

### Components

1. **Use Design Tokens**: Always import from `src/tokens/`
2. **Follow Naming Conventions**: PascalCase for components, camelCase for props
3. **Include Stories**: Every component must have a `.stories.tsx` file
4. **Add Tests**: Maintain test coverage above 80%

### Design Tokens

Design tokens are defined in `src/tokens/`:

- **Colors**: `src/tokens/colors.ts`
- **Typography**: `src/tokens/typography.ts`
- **Spacing**: `src/tokens/spacing.ts`
- **Shadows**: `src/tokens/shadows.ts`

### Theme Usage

```typescript
import { useTheme } from '../theme/ThemeContext';

const MyComponent = () => {
  const { colors, spacing } = useTheme();
  
  return (
    <View style={{ 
      backgroundColor: colors.primary,
      padding: spacing.md 
    }}>
      {/* Content */}
    </View>
  );
};
```

## 📝 Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow the coding standards
- Write tests for new functionality
- Update documentation
- Ensure all tests pass

### 3. Run Quality Checks

```bash
# Lint code
npm run lint

# Type checking
npx tsc --noEmit

# Run all tests
npm run test
npm run test:e2e
npm run test:visual

# Build project
npm run build
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new component feature"
```

#### Commit Message Convention

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code formatting (no functional changes)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### 5. Submit Pull Request

1. Push to your fork
2. Create pull request to `main` branch
3. Fill out the PR template
4. Wait for review

## 🔧 Development Tools

### Storybook

View and develop components in isolation:

```bash
npm run storybook
```

Visit `http://localhost:6006` to see all components.

### Bundle Analysis

Analyze bundle size and dependencies:

```bash
npm run bundle-analyzer
npm run bundle-monitor
```

### Performance Testing

Run performance audits:

```bash
npm run performance-test
npm run lighthouse
```

## 📏 Code Standards

### TypeScript

- Use strict TypeScript mode
- Provide proper type annotations
- Avoid `any` types
- Use interfaces for object shapes

### ESLint Rules

We use ESLint with the following rules:
- No unused variables
- Proper import ordering
- Consistent naming conventions
- No console.log in production code

### Formatting

- Use 2 spaces for indentation
- Use single quotes for strings
- Include trailing commas in objects/arrays

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment**: OS, Node.js version, browser
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happened
5. **Error Messages**: Any console errors

## 💡 Feature Requests

For feature requests:

1. **Use Case**: Describe the problem you're solving
2. **Proposed Solution**: How you envision it working
3. **Alternatives**: Other approaches you considered
4. **Additional Context**: Any relevant information

## 🤝 Code Review Process

### Reviewers

- At least one maintainer must review
- All automated checks must pass
- No merge conflicts

### Review Criteria

- **Functionality**: Does it work as expected?
- **Code Quality**: Is it well-written and maintainable?
- **Tests**: Are tests comprehensive?
- **Documentation**: Is documentation updated?
- **Performance**: Does it impact performance negatively?

## 📚 Documentation

### Component Documentation

Each component should have:

1. **JSDoc Comments**: Describe props and usage
2. **Storybook Stories**: Show all variants and states
3. **Examples**: Usage examples in documentation

### API Documentation

API documentation is auto-generated from JSDoc comments and available in the Storybook.

## 🚀 Release Process

Releases are automated through GitHub Actions:

1. **Version Bump**: Based on conventional commits
2. **Changelog**: Auto-generated from commit messages
3. **Publish**: Published to npm
4. **GitHub Release**: Created with changelog

## 🏆 Recognition

Contributors are recognized in:

- README.md contributors section
- Release notes
- Annual contributor highlights

## 📞 Getting Help

- **Discord**: [Join our community](https://discord.gg/your-server)
- **GitHub Issues**: [Open an issue](https://github.com/your-org/Enterprise-design-system/issues)
- **Documentation**: [View full docs](https://your-org.github.io/Enterprise-design-system)

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to the Enterprise Design System! 🎉
