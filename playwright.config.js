const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL || 'https://qatestacademy.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    { name: 'chromium', use: { browserName: 'chromium' }, dependencies: ['setup'] },
    { name: 'firefox', use: { browserName: 'firefox' }, dependencies: ['setup'] },
    { name: 'webkit', use: { browserName: 'webkit' }, dependencies: ['setup'] },
  ],
  outputDir: 'test-results/',
});
