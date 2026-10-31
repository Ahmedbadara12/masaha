import { defineConfig } from '@playwright/test';
export default defineConfig({
  webServer: {
    command: 'npm start -- --host 127.0.0.1',
    url: 'http://127.0.0.1:4200',
    reuseExistingServer: true,
  },
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:4200', headless: true, channel: 'msedge' },
  workers: 1,
  reporter: 'list',
});
