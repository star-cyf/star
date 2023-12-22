import { Locator, Page } from "@playwright/test";

export const scrollDown = async (page: Page, locator: Locator) => {
  while (!(await locator.isVisible())) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // await page.mouse.wheel(0, 10000);
  }
};
