import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('Button component renders correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Components/Button' }).click();
    await page.waitForSelector('[data-story-id="default--default"]');
    
    // Take a screenshot of the default button
    await expect(page.locator('[data-story-id="default--default"]')).toHaveScreenshot('button-default.png');
  });

  test('Button variants render correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Components/Button' }).click();
    
    // Test different variants
    const variants = ['solid', 'outline', 'ghost'];
    
    for (const variant of variants) {
      await page.locator(`[data-story-id="default--${variant}"]`).scrollIntoViewIfNeeded();
      await expect(page.locator(`[data-story-id="default--${variant}"]`)).toHaveScreenshot(`button-${variant}.png`);
    }
  });

  test('Button sizes render correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Components/Button' }).click();
    
    // Test different sizes
    const sizes = ['small', 'large'];
    
    for (const size of sizes) {
      await page.locator(`[data-story-id="default--${size}"]`).scrollIntoViewIfNeeded();
      await expect(page.locator(`[data-story-id="default--${size}"]`)).toHaveScreenshot(`button-${size}.png`);
    }
  });

  test('Button states render correctly', async ({ page }) => {
    await page.getByRole('link', { name: 'Components/Button' }).click();
    
    // Test different states
    const states = ['disabled', 'loading'];
    
    for (const state of states) {
      await page.locator(`[data-story-id="default--${state}"]`).scrollIntoViewIfNeeded();
      await expect(page.locator(`[data-story-id="default--${state}"]`)).toHaveScreenshot(`button-${state}.png`);
    }
  });
});

test.describe('Component Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('Button has proper accessibility attributes', async ({ page }) => {
    await page.getByRole('link', { name: 'Components/Button' }).click();
    
    // Check for proper ARIA attributes
    const button = page.locator('[data-story-id="default--default"] button').first();
    
    await expect(button).toHaveAttribute('role', 'button');
    await expect(button).toBeVisible();
    
    // Test keyboard navigation
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('Disabled button is properly inaccessible', async ({ page }) => {
    await page.getByRole('link', { name: 'Components/Button' }).click();
    
    const disabledButton = page.locator('[data-story-id="default--disabled"] button').first();
    
    await expect(disabledButton).toHaveAttribute('disabled');
    await expect(disabledButton).toHaveAttribute('aria-disabled', 'true');
  });
});

test.describe('Performance Tests', () => {
  test('Page load performance', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:6006');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('Component render performance', async ({ page }) => {
    await page.goto('http://localhost:6006');
    await page.getByRole('link', { name: 'Components/Button' }).click();
    
    const startTime = Date.now();
    await page.waitForSelector('[data-story-id="default--default"]');
    const renderTime = Date.now() - startTime;
    
    // Components should render within 1 second
    expect(renderTime).toBeLessThan(1000);
  });
});
