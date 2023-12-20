// Credentials in the format: username@gmail.com
import dotenv from "dotenv";
dotenv.config();
const userLogin = process.env.GOOGLE_EMAIL;
const userPw = process.env.GOOGLE_PASSWORD;
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
  await page.fill('input[type="email"]', userLogin!);
  await page.locator("#identifierNext >> button").click({ delay: 300 });
  await page.fill('#password >> input[type="password"]', userPw!);
  await page.locator("button >> nth=1").click({ delay: 300 });
  await page.waitForURL(`https://myaccount.google.com/?pli=1`);

  // After being redirected,
  // it takes a longer time to load because a lot of cookies need to be stored.
  await page.waitForTimeout(5000);

  // Open log in page on tested site
  await page.goto(`http://localhost:3000`);
  await page.locator("text=Login").click({ delay: 300 });

  // Need to wait for the small window to load completely before can click it.
  await page.waitForTimeout(4000);

  await page
    .frameLocator("#credential_picker_container > iframe")
    .locator("#continue-as")
    .click({ delay: 300 });

  // Wait for redirect back to tested site after authentication
  await page.waitForURL(`http://localhost:3000/profile`);

  // Save signed in state
  await page
    .context()
    .storageState({ path: "./tests/e2e/utils/storage-state.json" });
  await browser.close();
}

export default storeGoogleStarCookies;
