import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";
import { validStorageState } from "./tests/auth/validStorageState";

// See https://playwright.dev/docs/test-configuration
export default defineConfig({
  // path to the global setup files
  // if the state is ok, don't login(undefined) , if not ok, go to run login-google-star file
  // globalSetup: validStorageState()
  //   ? undefined
  //   : "./src/utils/chrome-login-google-star",

  // Look for test files in the "tests" directory, relative to this configuration file
  testDir: "./tests",

  // The output directory for files created during test execution
  outputDir: "./test-results",

  // Whether to preserve test output in the testConfig.outputDir. Defaults to 'always'
  // preserveOutput: "failures-only",

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  //  Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: [["html", { outputFolder: "./test-reports" }]],

  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions
  use: {
    //  Base URL to use in actions like `await page.goto('/')`
    // baseURL: "http://localhost:3000",

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: "on-first-retry",

    // storageState: "./src/utils/storage-state.json",
  },

  // Configure projects for major browsers
  projects: [
    // Either Chrome or Firefox will work for successful login.
    {
      name: "setup - Chrome Login (Google & STAR)",
      testDir: "./tests/auth",
      testMatch: "chrome-login-google-star.ts",
      use: {
        ...devices["Desktop Chrome"],
        headless: false, // Chrome must disable headless.
      },
    },
    //
    // {
    //   name: "setup - Firefox Login (Google & STAR)",
    //   testDir: "./tests/auth",
    //   testMatch: "firefox-login-google-star.ts",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     // headless: false, // Firefox can be run without headless.
    //   },
    // },
    {
      name: "teardown - Delete All Questions",
      testDir: "./tests/utils",
      testMatch: "teardown.ts",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "./tests/auth/storage-state.json",
      },
    },
    {
      name: "Basic Testing",
      dependencies: validStorageState()
        ? undefined
        : ["setup - Chrome Login (Google & STAR)"],
      testDir: "./tests/",
      // testMatch: "2-questions.spec.ts",
      teardown: "teardown - Delete All Questions",
      fullyParallel: false,
      use: {
        ...devices["Desktop Chrome"],
        // Persist state between test runs
        // Defines which browser context storage state gets shared between runs
        // This allows you to persist things like cookies, local storage, session storage etc. between test runs
        headless: false,
        baseURL: "http://localhost:3000",
        // launchOptions: {
        //   slowMo: 2000,
        // },
        storageState: "./tests/auth/storage-state.json",
      },
    },
    // {
    //   name: "Playground - Create Multiple Questions (without any expact)",
    //   dependencies: validStorageState()
    //     ? undefined
    //     : ["setup - Chrome Login (Google & STAR)"],
    //   testMatch: "playground-create-questions.ts",
    //   testDir: "./tests/utils",
    //   use: {
    //     ...devices["Desktop Chrome"],
    //     storageState: "./tests/auth/storage-state.json",
    //   },
    // },
  ],
});
