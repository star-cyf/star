// playwright-extra is a drop-in replacement for playwright,
// it augments the installed playwright with plugin functionality
import { chromium } from "playwright-extra";
import { test as setup } from "@playwright/test";

// Load the Stealth plugin and use defaults (hide playwright usage)
import StealthPlugin from "puppeteer-extra-plugin-stealth";

// Add the Stealth plugin to playwright
chromium.use(StealthPlugin());

// Get the Google User Credentials
const userEmail = process.env.GOOGLE_EMAIL as string;
const userPassword = process.env.GOOGLE_PASSWORD as string;

setup("login", async () => {
  // Google may be using anti-headless measures,
  // so headless requests are being flagged as bots
  // https://stackoverflow.com/a/75489051
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`https://accounts.google.com/`);
  await page.fill('input[type="email"]', userEmail);
  await page.locator("#identifierNext >> button").click({ delay: 300 });
  await page.fill('#password >> input[type="password"]', userPassword);
  await page.locator("button >> nth=1").click({ delay: 300 });
  await page.waitForURL(`https://myaccount.google.com/?pli=1`);

  // After being redirected,
  // it takes a longer time to load because a lot of cookies need to be stored
  await page.waitForTimeout(5000);

  // Navigate to the STAR Application
  await page.goto(`http://localhost:3000`);

  // Click the Login button
  await page.locator("text=Login").click({ delay: 300 });

  // Wait for the Google Sign In popup to load completely before clicking it
  await page.waitForTimeout(4000);

  // Click the Continue As User button
  await page
    .frameLocator("#credential_picker_container > iframe")
    .locator("#continue-as")
    .click({ delay: 300 });

  // Wait for the redirect to /profile after successfully logging in
  await page.waitForURL(`http://localhost:3000/profile`);

  // Save the Cookies & LocalStorage etc in storageState
  await page
    .context()
    .storageState({ path: "./tests/auth/storage-state.json" });
  await browser.close();
});
