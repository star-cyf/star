import { type Page, test, expect } from "@playwright/test";
import { QuestionObjType, dummyData, editedDummyData } from "./utils/dummyData";
import { QuestionsPage } from "./pages/questions";

// test.use({
//   launchOptions: {
//     slowMo: 400,
//   },
// });

/**========================================================================
 * *                                CRUD
 *   check the feature of creating,
 *   reading, updating, deleteing of questions is working
 *========================================================================**/
/**-------------------------------------------------------
 * Same Page Model: Generate a window and run all tests.
 *-------------------------------------------------------**/
test.describe.serial("Create, Edit, Delete: Question", () => {
  let page: Page;
  let questionsPage: QuestionsPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.locator('a[href="/questions"]').click();
    questionsPage = new QuestionsPage(page);
  });

  let questionId: string;
  let obj: QuestionObjType;

  // -------- Create ----------
  // [1] Create a new Question

  test("Can create a new Question", async () => {
    questionId = await questionsPage.createAQuestion(dummyData.question);
  });

  // -------- Edit ----------
  // [2] Edit the newly Created Question

  test("Can Edit the Created Question", async () => {
    await questionsPage.editAQuestion(questionId, editedDummyData.question);
  });

  // -------- Delete ----------
  // [3] Delete the newly Created and Edited Question

  test("Can Delete the Edited Question", async () => {
    await questionsPage.deleteAQuestion(questionId, editedDummyData.question);
  });
});
/**========================================================================
 * Different Windows Model: Generate multiple windows and run each test separately.
 *========================================================================**/
// test.describe.serial("Create, Edit, Delete: Question", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("http://localhost:3000");
//     await page.locator('a[href="/questions"]').click();
//   });

//   let questionId: string;

//   // -------- Create ----------
//   // [1] Create a new Question

//   test("Can create a new Question", async ({ page }) => {
//     const questionsPage = new QuestionsPage(page);
//     questionId = await questionsPage.createAQuestion(dummyData.question);
//   });

//   // -------- Edit ----------
//   // [2] Edit the newly Created Question

//   test("Can Edit the Created Question", async ({ page }) => {
//     const questionsPage = new QuestionsPage(page);
//     await questionsPage.editAQuestion(questionId, editedDummyData.question);
//   });

//   // -------- Delete ----------
//   // [3] Delete the newly Created and Edited Question

//   test("Can Delete the Edited Question", async ({ page }) => {
//     const questionsPage = new QuestionsPage(page);
//     await questionsPage.deleteAQuestion(questionId, editedDummyData.question);
//   });
// });

/**========================================================================
 * *                            SORT + CRUD
 *   checking the 'createdTime' and 'updatingTime' of sort feature is working
 *========================================================================**/
test.describe.serial
  .only("Create: 3 Questions (each 1 Question every minute)", () => {
  let page: Page;
  let questionsPage: QuestionsPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.locator('a[href="/questions"]').click();
    questionsPage = new QuestionsPage(page);
  });

  // -------- Create ----------
  // [1] Create 3 new Questions

  const questionNum = 3;
  let obj: QuestionObjType;
  let editedObj: QuestionObjType | undefined;

  test("Can create 3 new Question", async () => {
    obj = await questionsPage.createMultiQuestion(
      dummyData.question,
      questionNum
    );
  });

  // -------- Edit ----------
  // [2] Edit the newly Created Question

  test("Can Edit the Created Question", async () => {
    editedObj = await questionsPage.editMultiQuestion(obj);
  });

  // // -------- Delete ----------
  // // [3] Delete the newly Created and Edited Question

  test("Can Delete the Edited Question", async () => {
    await questionsPage.deleteMultiQuestion(editedObj!);
  });
});
