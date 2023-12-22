// Get the user credentials from the .env
const userEmail = process.env.GOOGLE_EMAIL as string;
const userPassword = process.env.GOOGLE_PASSWORD as string;

// playwright-extra is a drop-in replacement for playwright,
// it augments the installed playwright with plugin functionality
import { chromium } from "playwright-extra";

// Load the stealth plugin and use defaults (all tricks to hide playwright usage)
import StealthPlugin from "puppeteer-extra-plugin-stealth";

// Add the plugin to playwright (any number of plugins can be added)
chromium.use(StealthPlugin());

async function storeGoogleStarCookies(): Promise<void> {
  // Google may be using anti-headless measures,
  // so headless requests are being flagged as bots.
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
  // it takes a longer time to load because a lot of cookies need to be stored.
  await page.waitForTimeout(5000);

  // Open login page on tested site
  await page.goto(`http://localhost:3000`);
  await page.locator("text=Login").click({ delay: 300 });

  // Need to wait for the small window to load completely before we can click it.
  await page.waitForTimeout(4000);

  // Click the Continue As User button
  await page
    .frameLocator("#credential_picker_container > iframe")
    .locator("#continue-as")
    .click({ delay: 300 });

  // Wait for redirect back to the site after authentication
  await page.waitForURL(`http://localhost:3000/profile`);

  // Save signed in state
  await page
    .context()
    .storageState({ path: "./tests/auth/storage-state.json" });
  await browser.close();
}

export default storeGoogleStarCookies;
