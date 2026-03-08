import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  // The URL that Storybook is being served on
  url: 'http://localhost:6006',
  
  // A boolean that configures whether to exit the process with an error code if any tests fail
  exitOnFailure: true,
  
  // The maximum time (in milliseconds) to wait for the page to load before running tests
  getDelay: 1000,
  
  // A boolean that configures whether to run tests in parallel
  lazy: false,
  
  // The maximum time (in milliseconds) to wait for a story to render before taking a screenshot
  waitTimeout: 10000,
  
  // A function that configures Storybook's rendering behavior
  postRender: async (page, context) => {
    // Wait for any animations to complete
    await page.waitForTimeout(500);
    
    // Remove any dynamic content that might cause snapshot differences
    await page.evaluate(() => {
      // Remove time-based elements
      const timeElements = document.querySelectorAll('[data-time], [data-timestamp]');
      timeElements.forEach(el => el.remove());
      
      // Remove loading indicators
      const loadingElements = document.querySelectorAll('[data-loading], .loading');
      loadingElements.forEach(el => el.remove());
    });
  },
  
  // Configuration for visual regression testing
  stories: {
    // A regex that matches the stories to test
    pattern: '.*',
    
    // A boolean that configures whether to exit the process with an error code if any tests fail
    exitOnFailure: true,
    
    // A boolean that configures whether to skip stories that have no visual changes
    onlyChanged: false,
  },
};

export default config;
