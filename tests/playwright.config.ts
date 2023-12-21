import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";
import { checkState } from "./src/utils/check";
// import { refreshStorageState } from "./src/utils/getStorageState";

// See https://playwright.dev/docs/test-configuration
export default defineConfig({
  // path to the global setup files
  // if the state is ok, don't login(undefined) , if not ok, go to run login-google-star file
  globalSetup: checkState() ? undefined : "./src/utils/login-google-star",

  testDir: "./src",
  // Look for test files in the "tests" directory, relative to this configuration file

  // The output directory for files created during test execution
  outputDir: "./src/results",

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  //  Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: [["html", { outputFolder: "./src/reports" }]],

  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions
  use: {
    //  Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: "http://localhost:3000",

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    storageState: "./src/utils/storage-state.json",
  },

  // Configure projects for major browsers
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
