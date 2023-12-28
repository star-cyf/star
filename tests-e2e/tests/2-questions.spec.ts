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
    await page.goto("/");
    await page.locator('a[href="/questions"]').click();
    questionsPage = new QuestionsPage(page);
  });
  test.afterAll(async () => {
    await page.close();
  });

  let questionId: string;

  // -------- Create ----------
  // [1] Create a new Question

  // test("Can create a new Question", async () => {
  //   questionId = await questionsPage.createAQuestion(dummyData.question);
  // });
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
test.describe.serial("Create, Edit, Delete, Sort: 3 Questions", () => {
  let page: Page;
  let questionsPage: QuestionsPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/");
    await page.locator('a[href="/questions"]').click();
    questionsPage = new QuestionsPage(page);
  });
  test.afterAll(async () => {
    await page.close();
  });

  // -------- Create ----------
  // [1] Create 3 new Questions

  const questionNum = 3;
  let obj: QuestionObjType;
  let editedObj: QuestionObjType;
  let reversedObj: QuestionObjType;

  test("Can create 3 new Questions & can sort by createdTime", async () => {
    ({ obj, reversedObj } = await questionsPage.createMultiQuestion(
      dummyData.question,
      questionNum
    ));
    await questionsPage.checkIfOrderByCreatedTime(reversedObj);
  });

  // -------- Edit ----------
  // [2] Edit the newly Created Question

  test("Can Edit the 3 Created Questions & can sort by updatedTime", async () => {
    editedObj = await questionsPage.editMultiQuestion(obj);
  });

  // -------- Delete ----------
  // [3] Delete the newly Created and Edited Question

  test("Can Delete the 3 Edited Questions", async () => {
    await questionsPage.deleteMultiQuestion(editedObj!);
  });
});

/**========================================================================
 * *                            SEARCH
 *   checking the search feature is working
 *========================================================================**/
test.describe.serial("Create, Delete, Search: 5 Questions", () => {
  let page: Page;
  let questionsPage: QuestionsPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/");
    await page.locator('a[href="/questions"]').click();
    questionsPage = new QuestionsPage(page);
  });
  test.afterAll(async () => {
    await page.close();
  });

  // -------- Create ----------
  // [1] Create 3 new Questions

  const questionNum = 5;
  let obj: QuestionObjType;

  test("Can create 5 new Questions & can sort by createdTime", async () => {
    obj = await questionsPage.createMultiQuestionWithSearch(questionNum);
    await questionsPage.checkWithSearch(obj);
  });

  // -------- Delete ----------
  // [3] Delete the newly Created and Edited Questions

  test("Can Delete the 5 Edited Questions", async () => {
    await questionsPage.deleteMultiQuestion(obj);
  });
});
