import { test } from "@playwright/test";

test("Delete All Questions", async ({ page }) => {
  await page.goto("/");
  await page.locator('a[href="/questions"]').click();
  let deleteButton = page.locator('svg[data-testid="DeleteOutlineIcon"]');
  while ((await deleteButton.all()).length) {
    for (let i = 0; i < (await deleteButton.all()).length; i++) {
      await deleteButton.first().click();
    }
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    deleteButton = page.locator('svg[data-testid="DeleteOutlineIcon"]');
  }
});
