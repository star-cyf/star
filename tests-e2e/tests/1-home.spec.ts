import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home";

// test.use({
//   headless: false,
//   launchOptions: {
//     slowMo: 1000,
//   },
// });

test.describe("Lonin with coookies", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("Has title", async ({ page }) => {
    await expect(page).toHaveTitle(/STAR/);
  });
  test("Can click Home Button ", async ({ page }) => {
    await new HomePage(page).clickHomeButton();
  });
  test("Can click About Button ", async ({ page }) => {
    await new HomePage(page).clickAboutButton();
  });
  test("Can click Profile Button ", async ({ page }) => {
    await new HomePage(page).clickProfileButton();
  });
  test("Can click Questions Button ", async ({ page }) => {
    await new HomePage(page).clickQuestionsButton();
  });
  test("Can click Users Button ", async ({ page }) => {
    await new HomePage(page).clickUsersButton();
  });
  test("Can click Logout Button ", async ({ page }) => {
    await new HomePage(page).clickLogoutButton();
  });
});

test.describe("Lonin without coookies", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("Has title", async ({ page }) => {
    await expect(page).toHaveTitle(/STAR/);
  });
  test("Can click Home Button ", async ({ page }) => {
    await new HomePage(page).clickHomeButton();
  });
  test("Can click About Button ", async ({ page }) => {
    await new HomePage(page).clickAboutButton();
  });
  test("Can't click Profile Button ", async ({ page }) => {
    await expect(new HomePage(page).profileButton).not.toBeVisible();
  });
  test("Can't click Questions Button ", async ({ page }) => {
    await expect(new HomePage(page).questionsButton).not.toBeVisible();
  });
  test("Can't click Users Button ", async ({ page }) => {
    await expect(new HomePage(page).usersButton).not.toBeVisible();
  });
  test("Can't click Logout Button ", async ({ page }) => {
    await expect(new HomePage(page).logoutButton).not.toBeVisible();
  });
});
