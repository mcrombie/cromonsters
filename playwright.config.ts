import { defineConfig } from '@playwright/test';
const production = process.env.CROMON_PRODUCTION === '1';
const port = production ? 4173 : 5173;
const origin = 'http://127.0.0.1:' + port;
export default defineConfig({
  testDir: './e2e',
  timeout: 120000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { outputFolder: 'artifacts/browser-report', open: 'never' }]],
  outputDir: 'artifacts/browser-results',
  use: {
    baseURL: origin,
    headless: true,
    channel: 'chrome',
    viewport: { width: 1440, height: 1100 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: production ? 'npm run preview -- --port 4173' : 'npm run dev -- --port 5173',
    url: origin,
    reuseExistingServer: true,
    timeout: 30000,
  },
});
