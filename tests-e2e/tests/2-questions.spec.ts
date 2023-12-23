import { test } from "@playwright/test";
import { dummyData, editedDummyData } from "./utils/dummyData";
import { QuestionsPage } from "./pages/questions";

// test.use({
//   headless: false,
//   launchOptions: {
//     slowMo: 1000,
//   },
// });

test.describe.serial("Create, Edit, Delete: Question", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.locator('a[href="/questions"]').click();
  });

  let questionId: string;

  // -------- Create ----------
  // [1] Create a new Question

  test("Can create a new Question", async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    questionId = await questionsPage.createAQuestion(dummyData.question);
  });

  // -------- Edit ----------
  // [2] Edit the newly Created Question

  test("Can Edit the Created Question", async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.editAQuestion(questionId, editedDummyData.question);
  });

  // -------- Delete ----------
  // [3] Delete the newly Created and Edited Question

  test("Can Delete the Edited Question", async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.deleteAQuestion(questionId, editedDummyData.question);
  });
});
