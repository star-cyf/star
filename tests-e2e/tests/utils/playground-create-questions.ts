import { test as play } from "@playwright/test";
import { dummyData } from "./dummy-data";

// Created this creating playground to test the teardown function
// and make it easier to create Questions.
const num = 15;

for (let i = 0; i < num; i++) {
  play(`Creating: ${i} questions`, async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.locator('a[href="/questions"]').click();

    // click the button Add a Question
    await page.locator("text=Add a question").click();

    // fill the dummyData.question in the textarea of #question
    await page.locator("#question").fill(dummyData.question);

    // click the button Add Question
    await page.locator("text=Add question").click();
  });
}
