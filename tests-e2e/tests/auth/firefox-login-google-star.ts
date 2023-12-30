import { test as setup } from "@playwright/test";

// Ggt the Google User Credentials
const userEmail = process.env.GOOGLE_EMAIL as string;
const userPassword = process.env.GOOGLE_PASSWORD as string;

setup("login", async ({ page }) => {
  // Navigate to the STAR Application
  await page.goto(`http://localhost:3000`);

  // Click the Login button
  await page.locator("text=Login").click({ delay: 300 });

  // Wait for the Google Sign In popup to load completely before clicking it
  await page.waitForTimeout(4000);

  // Click the Continue As User button
  await page
    .frameLocator("#credential_picker_container > iframe")
    .locator("#continue")
    .click({ delay: 300 });

  const popupPage = await page.waitForEvent("popup");
  await popupPage.fill('input[type="email"]', userEmail);
  await popupPage.locator("#identifierNext >> button").click({ delay: 300 });
  await popupPage.fill('#password >> input[type="password"]', userPassword);
  await popupPage.locator("button >> nth=1").click({ delay: 300 });

  // Wait for the redirect to /profile after successfully logging in
  await page.waitForURL(`http://localhost:3000/profile`);

  // Save the Cookies & LocalStorage in storageState
  await page
    .context()
    .storageState({ path: "./tests/auth/storage-state.json" });
});
