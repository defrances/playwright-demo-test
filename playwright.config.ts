import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 40000,
  globalTimeout: 60000,
  expect: {
    timeout: 2000
  },
  retries: 1,
  reporter: 'html',
  outputDir: 'videos',

  use: {
    baseURL: 'https://www.lansweeper.com',
    trace: 'on-first-retry',
    actionTimeout: 60000,
    navigationTimeout: 30000,
    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 },
    },
    viewport: { width: 1920, height: 1080 },
  },

  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome']
      },
    },
    {
      name: 'chromium',
      testMatch: ['bulkEditWithMock.spec.ts', 'bulkEditWithOriginalData.spec.ts'],
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
        video: {
          mode: 'on',
          size: { width: 1920, height: 1080 }
        }
      }
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      }
    },
    {
      name: 'myOwnConfiguration',
      testMatch: ['bulkEditWithMock.spec.ts', 'bulkEditWithOriginalData.spec.ts'],
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
        video: {
          mode: 'on',
          size: { width: 1920, height: 1080 }
        }
      }
    }
  ]
});
