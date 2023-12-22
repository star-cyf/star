import { test as setup } from "@playwright/test";

// Get the user credentials from the .env
const userEmail = process.env.GOOGLE_EMAIL as string;
const userPassword = process.env.GOOGLE_PASSWORD as string;

console.log("userEmail:", userEmail);
console.log("userPassword:", userPassword);

setup("login", async ({ page }) => {
  // Open login page on tested site
  await page.goto(`http://localhost:3000`);
  await page.locator("text=Login").click({ delay: 300 });

  // Need to wait for the small window to load completely before we can click it.
  await page.waitForTimeout(4000);

  // Click the Continue User button
  await page
    .frameLocator("#credential_picker_container > iframe")
    .locator("#continue")
    .click({ delay: 300 });

  const popupPage = await page.waitForEvent("popup");
  await popupPage.fill('input[type="email"]', userEmail);
  await popupPage.locator("#identifierNext >> button").click({ delay: 300 });
  await popupPage.fill('#password >> input[type="password"]', userPassword);
  await popupPage.locator("button >> nth=1").click({ delay: 300 });

  // Wait for redirect back to the site after authentication and store the cookies
  await page.waitForURL(`http://localhost:3000/profile`);

  // Save signed in state
  await page
    .context()
    .storageState({ path: "./tests/auth/storage-state.json" });
  // await browser.close();
});
